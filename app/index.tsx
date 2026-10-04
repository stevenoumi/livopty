// app/index.tsx
import { router } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { supabase } from "~/lib/services/supabase/supabase";

ExpoSplashScreen.preventAutoHideAsync();

export default function IndexPage() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data.session;

        if (session) {
          router.replace("/(screens)/Grocery");
        } else {
          router.replace("/welcomePage");
        }
      } catch (e) {
        console.error("Erreur de redirection :", e);
      } finally {
        setAppReady(true);
        await ExpoSplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return <View style={{ flex: 1, backgroundColor: "#ffffff" }} />;
}
