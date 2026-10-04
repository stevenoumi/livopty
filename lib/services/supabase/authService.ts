import { supabase } from "./supabase";
import { AuthResponse, SignUpData, SignInData, User } from "~/lib/types/auth";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "~/lib/utils/validation";
import { logger } from "../logger";
import { ERROR_MESSAGES } from "~/lib/constants";

/**
 * Inscription d'un nouvel utilisateur avec validation
 * Note: Pour activer la vérification par code OTP, configurez Supabase :
 * Dashboard > Authentication > Email Templates > Enable "Email OTP" template
 * OU Dashboard > Authentication > Settings > Disable "Enable email confirmations"
 */
export const signUpWithEmail = async (
  data: SignUpData,
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

    // Appel API Supabase avec auto-confirmation si configuré
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

      // Messages d'erreur personnalisés
      if (error.message.includes("User already registered")) {
        return {
          success: false,
          error: "Un compte existe déjà avec cet email",
        };
      }
      if (error.message.includes("Password should be at least")) {
        return {
          success: false,
          error: "Le mot de passe doit contenir au moins 6 caractères",
        };
      }

      return { success: false, error: error.message };
    }

    logger.info("User signed up successfully", { userId: authData.user?.id });
    return {
      success: true,
      user: authData.user as User,
      hasSession: authData.session !== null,
    };
  } catch (error) {
    logger.error("Unexpected error during sign up", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};

/**
 * Connexion d'un utilisateur existant avec validation
 */
export const signInWithEmail = async (
  data: SignInData,
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
      if (error.message.includes("Email not confirmed")) {
        return {
          success: false,
          error: "Veuillez confirmer votre email avant de vous connecter",
        };
      }
      if (error.message.includes("User not found")) {
        return { success: false, error: "Aucun compte associé à cet email" };
      }

      return { success: false, error: error.message };
    }

    logger.info("User signed in successfully", { userId: authData.user?.id });
    return { success: true, user: authData.user as User };
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

/**
 * Envoie un code de réinitialisation du mot de passe par email
 */
export const requestPasswordReset = async (
  email: string,
): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
    );

    // Only rate limiting is surfaced: any other answer stays neutral so the
    // screen never reveals whether an account exists for this address.
    if (error?.status === 429) {
      return { success: false, error: error.message };
    }
    if (error) {
      logger.error("Password reset request failed", error);
    }

    return { success: true };
  } catch (error) {
    logger.error("Unexpected error during password reset request", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};

/**
 * Vérifie le code reçu par email ; ouvre une session en cas de succès
 */
export const verifyRecoveryCode = async (
  email: string,
  token: string,
): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token,
      type: "recovery",
    });

    if (error) {
      logger.error("Recovery code verification failed", error);
      return { success: false, error: "Code invalide ou expiré" };
    }

    return { success: true, hasSession: true };
  } catch (error) {
    logger.error("Unexpected error during recovery code verification", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};

/**
 * Change le mot de passe de l'utilisateur connecté
 */
export const updatePassword = async (
  password: string,
): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      logger.error("Password update failed", error);
      if (error.code === "same_password") {
        return {
          success: false,
          error: "Le nouveau mot de passe doit être différent de l'ancien",
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    logger.error("Unexpected error during password update", error);
    return { success: false, error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};
