import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../services/supabase/supabase";
import { signOutSupabase } from "~/lib/services/supabase/authService";
import { logger } from "../services/logger";
import { User } from "~/lib/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (error) {
        logger.error("Unexpected error loading session", error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        logger.debug("Auth state changed", { event });

        if (isMounted) {
          setUser((session?.user as User) ?? null);
        }
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const result = await signOutSupabase();

    if (!result.success) {
      logger.error("Sign out failed", result.error);
    }
    // Clear the local user even if the server call failed, so the user is
    // never stuck in the app after asking to leave.
    setUser(null);
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
