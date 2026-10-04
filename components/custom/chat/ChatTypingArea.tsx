import { ArrowUp } from "lucide-react-native";
import * as React from "react";
import {
  Animated,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatBottomPanel from "~/components/custom/chat/ChatBottomPanel";
import { Camera } from "~/lib/icons/Camera";
import { Keyboard as KeyboardIcon } from "~/lib/icons/Keyboard";
import { Mic } from "~/lib/icons/Mic";
import { Plus } from "~/lib/icons/Plus";
import { Sticker } from "~/lib/icons/Sticker";

export default function ChatTypingArea() {
  const [value, setValue] = React.useState("");
  const [isPanelVisible, setIsPanelVisible] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(300);
  const insets = useSafeAreaInsets();
  const [bottomAnim] = React.useState(() => new Animated.Value(insets.bottom));
  const [panelSlideAnim] = React.useState(() => new Animated.Value(300));
  const textInputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setIsPanelVisible(false);
        setKeyboardHeight(e.endCoordinates.height);
        Animated.timing(bottomAnim, {
          toValue: e.endCoordinates.height || 300,
          duration: e.duration || 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        if (!isPanelVisible) {
          Animated.timing(bottomAnim, {
            toValue: insets.bottom,
            duration: 250,
            useNativeDriver: false,
          }).start();
        }
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [bottomAnim, insets.bottom, isPanelVisible]);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const togglePanel = () => {
    if (isPanelVisible) {
      setIsPanelVisible(false);
      Animated.timing(bottomAnim, {
        toValue: keyboardHeight || 300,
        duration: 250,
        useNativeDriver: false,
      }).start();

      Animated.timing(panelSlideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else if (keyboardHeight > 0) {
      Keyboard.dismiss();
      setIsPanelVisible(true);
      Animated.timing(bottomAnim, {
        toValue: keyboardHeight || 300,
        duration: 250,
        useNativeDriver: false,
      }).start();

      Animated.timing(panelSlideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else if (keyboardHeight === 0) {
      setIsPanelVisible(true);
      Animated.timing(bottomAnim, {
        toValue: keyboardHeight || 300,
        duration: 250,
        useNativeDriver: false,
      }).start();

      Animated.timing(panelSlideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const openKeyboard = () => {
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 0);
    Animated.timing(bottomAnim, {
      toValue: keyboardHeight || 300,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(panelSlideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{ paddingBottom: bottomAnim }}
      className="bg-zinc-50 w-full px-3 pt-2 pb-2"
    >
      <View className="flex-row items-center justify-between w-full gap-4">
        {isPanelVisible ? (
          <TouchableOpacity className="justify-center items-center">
            <KeyboardIcon
              className="text-foreground"
              size={25}
              strokeWidth={1.75}
              onPress={openKeyboard}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="justify-center items-center">
            <Plus
              className="text-foreground"
              size={25}
              strokeWidth={1.75}
              onPress={togglePanel}
            />
          </TouchableOpacity>
        )}

        <View className="flex-1 flex-row items-center bg-white rounded-3xl px-3 py-1 border border-zinc-200">
          <TextInput
            ref={textInputRef}
            className="flex-1 bg-transparent px-2 text-black"
            style={{ minHeight: 24, maxHeight: 120, fontSize: 18 }}
            value={value}
            onChangeText={onChangeText}
            multiline
            onFocus={() => {
              if (isPanelVisible) {
                setIsPanelVisible(false);
              }
            }}
          />
          <TouchableOpacity className="justify-center items-center">
            <Sticker className="text-foreground" size={25} strokeWidth={1.75} />
          </TouchableOpacity>
        </View>

        {value.length > 0 ? (
          <TouchableOpacity className="bg-purple-800 w-10 h-10 rounded-full justify-center items-center">
            <ArrowUp
              className="text-white"
              size={25}
              strokeWidth={1.75}
              color={"white"}
            />
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity className="justify-center items-center">
              <Camera
                className="text-foreground"
                size={25}
                strokeWidth={1.75}
              />
            </TouchableOpacity>
            <TouchableOpacity className="justify-center items-center">
              <Mic className="text-foreground" size={25} strokeWidth={1.75} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isPanelVisible && (
        <View
          style={{
            overflow: "hidden",
            height: keyboardHeight - insets.bottom,
            position: "absolute",
            bottom: insets.bottom,
            left: 0,
            right: 0,
          }}
        >
          <ChatBottomPanel />
        </View>
      )}
    </Animated.View>
  );
}
