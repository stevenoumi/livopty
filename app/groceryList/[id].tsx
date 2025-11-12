import { CirclePlus } from "lucide-react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
} from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NoteEditorScreen() {
  const editorRef = useRef<RichEditor>(null);
  const [content, setContent] = useState("");
  const insets = useSafeAreaInsets();

  // Init avec la safe area bottom
  const toolbarBottom = useRef(new Animated.Value(insets.bottom)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardWillShow", (e) => {
      setKeyboardVisible(true);
      Animated.timing(toolbarBottom, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hide = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardVisible(false);
      Animated.timing(toolbarBottom, {
        toValue: insets.bottom,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [insets.bottom]);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={64}
    >
      <View className="flex-1 p-4 bg-white gap-2">
        <Text className="text-2xl font-bold text-gray-800 ">
          🗒️ Éditeur de Note
        </Text>
        <RichEditor
          ref={editorRef}
          initialContentHTML={content}
          placeholder="Écrivez quelque chose..."
          onChange={setContent}
          style={{ flex: 1, marginBottom: insets.bottom }}
          editorStyle={{
            contentCSSText: `
              font-size: 20px;
              line-height: 34px;
              color: #18181b;
              font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue";
              background: #fff;
              padding: 12px 0;
            `,
            cssText: `
              ul, ol {
                margin: 0 0 1em 0;
                padding-left: 1.5em;
              }
              li {
                display: flex;
                font-size: 20px;
                line-height: 30px;
                text-align: left;
                gap: 0.5em;
              }
              input[type="checkbox"] {
                width: 20px;
                height: 20px;
                margin-right: 12px;
                accent-color: #7c3aed;
                vertical-align: end;
                margint-right: 0.5em;
              }
              p {
                font-size: 24px;
                line-height: 34px;
                margin-bottom: 1em;
                text-align: left;
              }
            `,
          }}
        />
      </View>

      {keyboardVisible && (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: toolbarBottom,
          }}
        >
          <View className="overflow-hidden shadow-md shadow-violet-50 bg-white">
            <RichToolbar
              editor={editorRef}
              selectedIconTint="#fff"
              iconSize={26}
              iconTint="#aaa"
              selectedButtonStyle={{
                borderRadius: 100,
                backgroundColor: "#aaa",
                marginHorizontal: 14,
              }}
              style={{
                borderTopWidth: 1,
                paddingVertical: 4,
                paddingHorizontal: 2,
                backgroundColor: "#fff",
              }}
              actions={[
                actions.keyboard,
                actions.setBold,
                actions.checkboxList,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.setUnderline,
                actions.undo,
                actions.redo,
              ]}
            />
          </View>
        </Animated.View>
      )}
      <View className="absolute bottom-0 right-0 left-0 bg-white p-5"></View>
    </KeyboardAvoidingView>
  );
}
