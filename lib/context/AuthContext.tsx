import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { supabase } from "../services/supabase/supabase";
import { useRouter } from "expo-router";
import { signOutSupabase } from "~/lib/services/supabase/authService";
import { ROUTES } from "~/lib/constants";
import { logger } from "../services/logger";
import { User } from "~/lib/types/auth";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          logger.error("Failed to load session", error);
        }

        if (isMounted) {
          setUser((data.session?.user as User) ?? null);
          setLoading(false);
        }
      } catch (error) {
        logger.error("Unexpected error loading session", error);
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    loadSession();

    // Écouter les changements d'authentification
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.debug("Auth state changed", { event });

        if (isMounted) {
          setUser((session?.user as User) ?? null);

          // Gérer la redirection lors des changements d'état
          if (event === "SIGNED_IN" && session?.user) {
            router.replace(ROUTES.GROCERY);
          } else if (event === "SIGNED_OUT") {
            router.replace(ROUTES.WELCOME);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Gérer la redirection initiale et masquer le splash screen
  useEffect(() => {
    if (loading || hasRedirected.current) return;

    const handleInitialRedirect = async () => {
      try {
        // Attendre un court instant pour éviter les conflits de navigation
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (user) {
          router.replace(ROUTES.GROCERY);
        } else {
          router.replace(ROUTES.WELCOME);
        }

        hasRedirected.current = true;
        await SplashScreen.hideAsync();
      } catch (error) {
        logger.error("Error during initial redirect", error);
        await SplashScreen.hideAsync();
      }
    };

    handleInitialRedirect();
  }, [user, loading]);

  const signOut = async () => {
    try {
      const result = await signOutSupabase();

      if (result.success) {
        setUser(null);
        router.replace(ROUTES.WELCOME);
      } else {
        logger.error("Sign out failed", result.error);
      }
    } catch (error) {
      logger.error("Unexpected error during sign out", error);
    }
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
