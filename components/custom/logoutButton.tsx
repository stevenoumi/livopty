import React from "react";
import { Button } from "react-native";
import { useAuth } from "~/lib/context/AuthContext";

export default function LogoutButton() {
  const { signOut, loading } = useAuth();

  return (
    <Button title={loading ? "Chargement..." : "Se déconnecter"} onPress={signOut} />
  );
}
