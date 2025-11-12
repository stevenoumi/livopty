import { Stack, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, Text } from "react-native";

function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} className="px-0 rounded-full flex-row items-center gap-2">
      <ChevronLeft size={30} strokeWidth={2} color="#000" />
      <Text className="text-xl text-gray-800">Retour</Text>
    </TouchableOpacity>
  );
}

export default function GroceryListLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Liste",
          headerTitle: () => <></>,
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="folder/[id]"
        options={{
          title: "Dossier",
          headerTitle: () => <></>,
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
