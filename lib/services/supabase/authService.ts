import { supabase } from "./supabase";
import { AuthResponse, SignUpData, SignInData } from "~/lib/types/auth";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "~/lib/utils/validation";
import { logger } from "../logger";
import { ERROR_MESSAGES } from "~/lib/constants";

/**
 * Inscription d'un nouvel utilisateur avec validation
 */
export const signUpWithEmail = async (
  data: SignUpData
): Promise<AuthResponse> => {
  try {
    // Validation des données
    const nameValidation = validateName(data.name);
    if (!nameValidation.valid) {
      return { success: false, error: nameValidation.error };
    }

    const emailValidation = validateEmail(data.email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error };
    }

    // Appel API Supabase
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      options: {
        data: { name: data.name.trim() },
        emailRedirectTo: "livopty://loginPage",
      },
    });

    if (error) {
      logger.error("Sign up failed", error);
      return { success: false, error: error.message };
    }

    logger.info("User signed up successfully", { userId: authData.user?.id });
    return { success: true, user: authData.user as any };
  } catch (error) {
    logger.error("Unexpected error during sign up", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};

/**
 * Connexion d'un utilisateur existant avec validation
 */
export const signInWithEmail = async (
  data: SignInData
): Promise<AuthResponse> => {
  try {
    // Validation des données
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error };
    }

    // Appel API Supabase
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });

    if (error) {
      logger.error("Sign in failed", error);

      // Messages d'erreur personnalisés
      if (error.message.includes("Invalid login credentials")) {
        return { success: false, error: "Email ou mot de passe incorrect" };
      }

      return { success: false, error: error.message };
    }

    logger.info("User signed in successfully", { userId: authData.user?.id });
    return { success: true, user: authData.user as any };
  } catch (error) {
    logger.error("Unexpected error during sign in", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};

/**
 * Déconnexion de l'utilisateur
 */
export const signOutSupabase = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      logger.error("Sign out failed", error);
      return { success: false, error: error.message };
    }

    logger.info("User signed out successfully");
    return { success: true };
  } catch (error) {
    logger.error("Unexpected error during sign out", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};
