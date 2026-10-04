import Constants, { ExecutionEnvironment } from "expo-constants";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import { Platform } from "react-native";
import { ERROR_MESSAGES } from "~/lib/constants";
import { AuthResponse } from "~/lib/types/auth";
import { logger } from "../logger";
import { supabase } from "./supabase";

const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// The Google module is native code that Expo Go does not ship: loading it
// there crashes the app, so the button only exists in development and store
// builds.
export const isGoogleSignInAvailable =
  !isExpoGo &&
  Platform.OS !== "web" &&
  Boolean(GOOGLE_WEB_CLIENT_ID) &&
  (Platform.OS !== "ios" || Boolean(GOOGLE_IOS_CLIENT_ID));

export async function isAppleSignInAvailable(): Promise<boolean> {
  if (Platform.OS !== "ios") {
    return false;
  }
  return AppleAuthentication.isAvailableAsync();
}

export async function signInWithApple(): Promise<AuthResponse> {
  try {
    // Apple signs the hashed nonce into the token and Supabase checks it
    // against the raw one, so a stolen token cannot be replayed.
    const rawNonce = Crypto.randomUUID();
    const hashedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      rawNonce,
    );

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      nonce: hashedNonce,
    });

    if (!credential.identityToken) {
      logger.error("Apple sign in returned no identity token");
      return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: credential.identityToken,
      nonce: rawNonce,
    });

    if (error) {
      logger.error("Supabase rejected the Apple token", error);
      return { success: false, error: error.message };
    }

    // Apple only shares the name on the very first authorization: store it
    // now or it is lost for good.
    const fullName = [
      credential.fullName?.givenName,
      credential.fullName?.familyName,
    ]
      .filter(Boolean)
      .join(" ");
    if (fullName && !data.user?.user_metadata?.name) {
      await supabase.auth.updateUser({ data: { name: fullName } });
    }

    return { success: true, hasSession: true };
  } catch (error) {
    if ((error as { code?: string }).code === "ERR_REQUEST_CANCELED") {
      return { success: false, cancelled: true };
    }
    logger.error("Unexpected error during Apple sign in", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
}

let googleConfigured = false;

async function loadGoogleSignIn() {
  const module = await import("@react-native-google-signin/google-signin");
  if (!googleConfigured) {
    module.GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
    });
    googleConfigured = true;
  }
  return module;
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  if (!isGoogleSignInAvailable) {
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }

  const { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes } =
    await loadGoogleSignIn();

  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const response = await GoogleSignin.signIn();

    if (!isSuccessResponse(response)) {
      return { success: false, cancelled: true };
    }

    const { idToken } = response.data;
    if (!idToken) {
      logger.error("Google sign in returned no ID token");
      return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
    }

    const { error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) {
      logger.error("Supabase rejected the Google token", error);
      return { success: false, error: error.message };
    }

    return { success: true, hasSession: true };
  } catch (error) {
    if (isErrorWithCode(error)) {
      if (error.code === statusCodes.IN_PROGRESS) {
        return { success: false, cancelled: true };
      }
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          success: false,
          error: "Les services Google Play ne sont pas disponibles",
        };
      }
    }
    logger.error("Unexpected error during Google sign in", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
}

// Without this, the next Google sign in silently reuses the same account and
// the user cannot switch accounts after logging out.
export async function signOutFromGoogle(): Promise<void> {
  if (!isGoogleSignInAvailable) {
    return;
  }
  try {
    const { GoogleSignin } = await loadGoogleSignIn();
    await GoogleSignin.signOut();
  } catch (error) {
    logger.error("Google sign out failed", error);
  }
}
