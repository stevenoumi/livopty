import type { ConfigContext, ExpoConfig } from "expo/config";

// The Google Sign-In plugin needs the reversed iOS client ID at build time.
// Deriving it from the env var keeps a single source for the client ID, and
// skipping the plugin when it is unset lets builds without Google still work.
function googleSignInPlugin(): ExpoConfig["plugins"] {
  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  if (!iosClientId) {
    return [];
  }
  const iosUrlScheme = `com.googleusercontent.apps.${iosClientId.replace(
    ".apps.googleusercontent.com",
    "",
  )}`;
  return [["@react-native-google-signin/google-signin", { iosUrlScheme }]];
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? "LivOpty",
  slug: config.slug ?? "LivOpty",
  plugins: [...(config.plugins ?? []), ...(googleSignInPlugin() ?? [])],
});
