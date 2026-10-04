import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLanguage } from "~/lib/context/LanguageContext";

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode.toLowerCase());
    setShowMenu(false);
  };

  return (
    <View className="relative min-w-[80px] items-end">
      <TouchableOpacity
        onPress={() => setShowMenu(!showMenu)}
        className="flex-row items-center gap-2 px-3 py-2 bg-gray-100 rounded-md shadow-sm"
      >
        <Image source={{ uri: currentLanguage.flag }} className="w-5 h-4" />
        <Text className="text-gray-700 font-semibold">
          {currentLanguage.code}
        </Text>
      </TouchableOpacity>
      {showMenu && (
        <View className="absolute top-11 right-0 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleLanguageSelect(lang.code)}
              className="flex-row items-center px-4 py-2"
            >
              <Image source={{ uri: lang.flag }} className="w-5 h-4 mr-2" />
              <Text className="text-gray-800 text-sm">{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default LanguageSelector;
