import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../services/supabase/supabase";
import { useRouter } from "expo-router";
import { signOutSupabase } from "~/lib/services/supabase/authService";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    load();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const proceed = async () => {
      if (loading) return;

      if (user) {
        router.replace("/(screens)/Grocery");
      } else {
        router.replace("/welcomePage");
      }

      await SplashScreen.hideAsync();
    };

    proceed();
  }, [user, loading]);

  const signOut = async () => {
    await signOutSupabase();
    setUser(null);
    router.replace("/welcomePage");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
