import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Check, CheckCheck } from "lucide-react-native"; // Importer les icônes

interface IsSent {
  message: string;
  isSent: boolean;
  isRead?: boolean;
}

export default function TextChat({ message, isSent, isRead = false }: IsSent) {
  const bubbleBg = isSent ? "bg-violet-500" : "bg-gray-200"; // Couleur du fond
  const textColor = isSent ? "text-gray-100" : "text-gray-800"; // Couleur du texte
  const timeColor = isSent ? "text-white/70" : "text-gray-500"; // Couleur de l'heure
  const alignment = isSent ? "self-end" : "self-start"; // Alignement du message (droite pour envoyé, gauche pour reçu)

  return (
    <View className="flex w-full my-2">
      <Card className={`max-w-[75%] rounded-xl ${bubbleBg} ${alignment}`}>
        <CardContent className="p-3">
          <Text className={`text-lg ${textColor}`}>{message}</Text>
        </CardContent>
        {isSent && (
          <CardFooter className="flex flex-row justify-end px-3 gap-4 pb-2">
            <Text className={`text-xs ${timeColor}`}>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            {isRead ? (
              <Check className="text-foreground" size={15} strokeWidth={1.75} />
            ) : (
              <CheckCheck size={15} color={"white"} strokeWidth={1.25} />
            )}
          </CardFooter>
        )}
      </Card>
    </View>
  );
}
