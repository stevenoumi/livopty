// app/index.tsx
import { Redirect } from "expo-router";
import { ROUTES } from "~/lib/constants";
import { useAuth } from "~/lib/context/AuthContext";

export default function IndexPage() {
  const { user } = useAuth();

  return <Redirect href={user ? ROUTES.HOME : ROUTES.WELCOME} />;
}
