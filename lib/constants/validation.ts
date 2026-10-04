/**
 * Constantes de validation pour l'application
 */

export const VALIDATION = {
  EMAIL: {
    MIN_LENGTH: 3,
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  OTP: {
    // Must equal "Email OTP Length" in Supabase (Authentication > Email).
    LENGTH: 8,
  },
} as const;

export const ERROR_MESSAGES = {
  EMAIL_INVALID: "Adresse email invalide",
  EMAIL_REQUIRED: "L'email est requis",
  PASSWORD_TOO_SHORT: "Le mot de passe doit contenir au moins 6 caractères",
  PASSWORD_REQUIRED: "Le mot de passe est requis",
  NAME_TOO_SHORT: "Le nom doit contenir au moins 2 caractères",
  NAME_REQUIRED: "Le nom est requis",
  FIELDS_REQUIRED: "Veuillez remplir tous les champs",
  NETWORK_ERROR: "Erreur de connexion. Vérifiez votre internet.",
  UNKNOWN_ERROR: "Une erreur inattendue s'est produite",
} as const;
