// authservice.ts
import { supabase } from "./supabase";

export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: "livopty://loginPage",
    },
  });

  if (error) return { success: false, error: error.message };

  return { success: true };
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { success: false, error: error.message };

  return { success: true };
};

export const signOutSupabase = async (): Promise<void> => {
  await supabase.auth.signOut();
};