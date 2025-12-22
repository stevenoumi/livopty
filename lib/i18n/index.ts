import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

// Langue par défaut
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_STORAGE_KEY = "app_language";

// Configuration des ressources de traduction
const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
};

// Fonction pour récupérer la langue sauvegardée
const getStoredLanguage = async (): Promise<string> => {
  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLang || DEFAULT_LANGUAGE;
  } catch (error) {
    console.error("Error getting stored language:", error);
    return DEFAULT_LANGUAGE;
  }
};

// Fonction pour sauvegarder la langue
export const saveLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error("Error saving language:", error);
  }
};

// Initialisation i18next
const initI18n = async () => {
  const storedLanguage = await getStoredLanguage();

  const options: InitOptions = {
    resources,
    lng: storedLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false, // React Native échappe déjà les valeurs
    },
    react: {
      useSuspense: false,
    },
  };

  await i18n.use(initReactI18next).init(options);
};

// Initialiser au chargement
initI18n();

export default i18n;
