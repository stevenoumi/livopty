import { z } from "zod";

/**
 * Schémas de validation Zod pour les formulaires
 */

// Schéma de validation pour l'email
export const emailSchema = z
  .string()
  .min(1, "L'adresse e-mail est requise")
  .email("Adresse e-mail invalide")
  .toLowerCase()
  .trim();

// Schéma de validation pour le mot de passe
export const passwordSchema = z
  .string()
  .min(6, "Le mot de passe doit contenir au moins 6 caractères")
  .max(100, "Le mot de passe est trop long");

// Schéma de validation pour le nom
export const nameSchema = z
  .string()
  .min(1, "Le nom est requis")
  .min(2, "Le nom doit contenir au moins 2 caractères")
  .max(100, "Le nom est trop long")
  .trim();

// Schéma de validation pour le numéro de téléphone
export const phoneSchema = z
  .string()
  .min(10, "Numéro de téléphone invalide")
  .max(15, "Numéro de téléphone invalide")
  .regex(/^[0-9+\-\s()]+$/, "Format de numéro invalide")
  .optional();

// Schéma de validation pour le code OTP
export const otpSchema = z
  .string()
  .length(6, "Le code doit contenir 6 chiffres")
  .regex(/^\d{6}$/, "Le code doit contenir uniquement des chiffres");

// Schéma pour le formulaire de connexion
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Schéma pour le formulaire d'inscription
export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// Schéma pour le formulaire de vérification OTP
export const verifyOtpSchema = z.object({
  otp: otpSchema,
});

// Schéma pour le formulaire de réinitialisation de mot de passe
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Schéma pour le formulaire de nouveau mot de passe
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// Types TypeScript dérivés des schémas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
