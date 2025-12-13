/**
 * Utilitaires de validation pour les formulaires
 */

import { VALIDATION, ERROR_MESSAGES } from "../constants";

export const validateEmail = (
  email: string
): { valid: boolean; error?: string } => {
  if (!email || !email.trim()) {
    return { valid: false, error: ERROR_MESSAGES.EMAIL_REQUIRED };
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length < VALIDATION.EMAIL.MIN_LENGTH) {
    return { valid: false, error: ERROR_MESSAGES.EMAIL_INVALID };
  }

  if (!VALIDATION.EMAIL.REGEX.test(trimmedEmail)) {
    return { valid: false, error: ERROR_MESSAGES.EMAIL_INVALID };
  }

  return { valid: true };
};

export const validatePassword = (
  password: string
): { valid: boolean; error?: string } => {
  if (!password) {
    return { valid: false, error: ERROR_MESSAGES.PASSWORD_REQUIRED };
  }

  if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
    return { valid: false, error: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
  }

  if (password.length > VALIDATION.PASSWORD.MAX_LENGTH) {
    return { valid: false, error: "Le mot de passe est trop long" };
  }

  return { valid: true };
};

export const validateName = (
  name: string
): { valid: boolean; error?: string } => {
  if (!name || !name.trim()) {
    return { valid: false, error: ERROR_MESSAGES.NAME_REQUIRED };
  }

  if (name.trim().length < VALIDATION.NAME.MIN_LENGTH) {
    return { valid: false, error: ERROR_MESSAGES.NAME_TOO_SHORT };
  }

  if (name.trim().length > VALIDATION.NAME.MAX_LENGTH) {
    return { valid: false, error: "Le nom est trop long" };
  }

  return { valid: true };
};
