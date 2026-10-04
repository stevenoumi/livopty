/**
 * Constantes de routes de l'application
 * Centralisé pour éviter les erreurs de typage et faciliter la maintenance
 */

export const ROUTES = {
  // Auth Routes
  WELCOME: "/welcomePage",
  LOGIN: "/loginPage",
  REGISTER: "/registerPage",
  VERIFY_OTP: "/verifyOtpPage",

  // Main Screens
  CHAT_LIST: "/chatList",
  HOME: "/(screens)/Home",
  CHATS: "/(screens)/Chats",
  GROCERY: "/(screens)/Grocery",
  FINANCE: "/(screens)/Finance",
  AGENDA: "/(screens)/Agenda",

  // Settings
  SETTINGS: "/Settings",

  // Dynamic Routes
  GROCERY_LIST: (id: string) => `/groceryList/${id}` as const,
  GROCERY_FOLDER: (id: string) => `/groceryList/folder/${id}` as const,
} as const;

export type RouteKey = keyof typeof ROUTES;
