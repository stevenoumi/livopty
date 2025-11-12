// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { supabase } from '~/lib/services/supabase/supabase';
import { useRouter, useSegments } from 'expo-router';

export function useAuthRedirect() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const isAuth = !!session?.user;
        const inAuthStack = !(segments as string[]).includes('(screens)');

        if (isAuth && inAuthStack) {
          router.replace('/Chats'); // ou /chatList ou autre écran connecté
        } else if (!isAuth && !inAuthStack) {
          router.replace('/loginPage'); // écran public
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
}
