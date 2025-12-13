// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
  email_confirmed_at?: string;
  user_metadata?: {
    name?: string;
    [key: string]: unknown;
  };
  app_metadata?: {
    provider?: string;
    [key: string]: unknown;
  };
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}
