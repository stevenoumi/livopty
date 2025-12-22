import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { saveLanguage } from "../i18n";
import Languages from "../data/languageData";

type Language = {
  code: string;
  label: string;
  flag: string;
};

type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (languageCode: string) => Promise<void>;
  t: (key: string, options?: Record<string, unknown>) => string;
  languages: Language[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t, i18n: i18nInstance } = useTranslation();

  // Trouver la langue actuelle dans la liste des langues disponibles
  const getCurrentLanguage = (langCode: string): Language => {
    const lang = Languages.find(
      (l) => l.code.toLowerCase() === langCode.toLowerCase()
    );
    return lang || Languages[0]; // Français par défaut
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    getCurrentLanguage(i18nInstance.language)
  );

  useEffect(() => {
    // Mettre à jour la langue actuelle quand i18n change
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(getCurrentLanguage(lng));
    };

    i18nInstance.on("languageChanged", handleLanguageChange);

    return () => {
      i18nInstance.off("languageChanged", handleLanguageChange);
    };
  }, [i18nInstance]);

  const changeLanguage = async (languageCode: string) => {
    try {
      await i18nInstance.changeLanguage(languageCode.toLowerCase());
      await saveLanguage(languageCode.toLowerCase());
      setCurrentLanguage(getCurrentLanguage(languageCode));
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        t,
        languages: Languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
