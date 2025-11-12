import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Languages from "~/lib/data/languageData";


const LanguageSelector = ({ selectedLang, onSelect }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <View className="relative min-w-[80px] items-end">
      <TouchableOpacity
        onPress={() => setShowMenu(!showMenu)}
        className="flex-row items-center gap-2 px-3 py-2 bg-gray-100 rounded-md shadow-sm"
      >
        <Image source={{ uri: selectedLang.flag }} className="w-5 h-4" />
        <Text className="text-gray-700 font-semibold">{selectedLang.code}</Text>
      </TouchableOpacity>
      {showMenu && (
        <View className="absolute top-11 right-0 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          {Languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => {
                onSelect(lang);
                setShowMenu(false);
              }}
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