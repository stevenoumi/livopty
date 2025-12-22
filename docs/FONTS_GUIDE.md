# Guide des Polices et Typographie

## 🎨 Police Globale

L'application utilise **Outfit** comme police principale pour une apparence moderne, douce et amoureuse.

### Polices installées

- **Outfit** (principale) : Police arrondie, moderne et élégante

  - Regular (400)
  - Medium (500)
  - SemiBold (600)
  - Bold (700)

- **Inter** (secondaire) : Police lisible et professionnelle
  - Regular (400)
  - Medium (500)
  - SemiBold (600)
  - Bold (700)

## 📝 Utilisation

### Option 1 : Composants StyledText (Recommandé)

```tsx
import { Heading1, BodyText, Caption } from "~/components/ui/StyledText";

function MyComponent() {
  return (
    <>
      <Heading1 className="text-purple-700">Bienvenue</Heading1>
      <BodyText className="text-gray-600">Contenu de l'application</BodyText>
      <Caption className="text-gray-400">Note secondaire</Caption>
    </>
  );
}
```

### Option 2 : Styles directs

```tsx
import { Text } from "react-native";
import { getTextStyle, getOutfitFont } from "~/lib/constants/fonts";

function MyComponent() {
  return (
    <>
      <Text style={getTextStyle("h1")}>Titre</Text>
      <Text style={{ fontFamily: getOutfitFont("semibold") }}>
        Texte avec Outfit SemiBold
      </Text>
    </>
  );
}
```

### Option 3 : Classes Tailwind

```tsx
import { Text } from "react-native";

function MyComponent() {
  return <Text className="font-outfit text-xl font-semibold">Texte stylé</Text>;
}
```

## 🎯 Variantes disponibles

### Titres

- `h1` - 32px, Bold - Titres principaux
- `h2` - 28px, Bold - Sous-titres importants
- `h3` - 24px, SemiBold - Sections
- `h4` - 20px, SemiBold - Sous-sections
- `h5` - 18px, Medium - Petits titres
- `h6` - 16px, Medium - Titres mineurs

### Corps de texte

- `body` - 16px, Regular - Texte principal
- `bodyLarge` - 18px, Regular - Texte large
- `bodySmall` - 14px, Regular - Texte petit
- `bodyTiny` - 12px, Regular - Texte très petit

### Éléments UI

- `label` - 14px, Medium - Labels de formulaire
- `button` - 16px, SemiBold - Texte de bouton
- `caption` - 12px, Regular - Légendes et notes

## 🎨 Composants disponibles

```tsx
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  BodyText,
  BodyLarge,
  BodySmall,
  Label,
  ButtonText,
  Caption,
} from "~/components/ui/StyledText";
```

## 💡 Exemples d'utilisation

### Page de connexion

```tsx
<Heading1 className="text-center text-zinc-900">
  Bienvenue sur LivOpty
</Heading1>
<BodySmall className="text-zinc-500 text-center mt-2">
  L'application pour mieux vivre ensemble
</BodySmall>
```

### Bouton

```tsx
<TouchableOpacity className="bg-purple-700 px-6 py-3 rounded-xl">
  <ButtonText className="text-white text-center">Se connecter</ButtonText>
</TouchableOpacity>
```

### Formulaire

```tsx
<Label className="text-gray-700 mb-1">
  Adresse e-mail
</Label>
<TextInput
  style={{ fontFamily: getOutfitFont("regular") }}
  className="border border-gray-300 rounded-xl px-4 py-3"
/>
<Caption className="text-red-500 mt-1">
  {errors.email?.message}
</Caption>
```

## 🔧 Configuration

### Tailwind (tailwind.config.js)

```javascript
fontFamily: {
  outfit: ["Outfit_400Regular", "Outfit_500Medium", ...],
  inter: ["Inter_400Regular", "Inter_500Medium", ...],
}
```

### Global CSS (global.css)

```css
* {
  font-family: "Outfit_400Regular", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
}
```

## 🎨 Design moderne et amoureux

La police **Outfit** a été choisie pour :

- ✨ Ses formes arrondies et douces
- 💜 Son aspect moderne et chaleureux
- 📱 Sa lisibilité sur mobile
- 🎯 Son élégance professionnelle
- 💕 Son ambiance amoureuse et accueillante

### Conseils de design

1. Utilisez des espacements généreux pour la respiration
2. Privilégiez les couleurs douces (violet, rose pastel)
3. Ajoutez des ombres légères pour la profondeur
4. Utilisez des bordures arrondies (rounded-xl, rounded-2xl)
5. Combinez avec des icônes lucide-react-native pour l'harmonie

## 🚀 Migration

Pour mettre à jour un composant existant :

### Avant

```tsx
<Text className="text-3xl font-bold text-zinc-900">Mon titre</Text>
```

### Après

```tsx
<Heading1 className="text-zinc-900">Mon titre</Heading1>
```

## 📦 Chargement des polices

Les polices sont chargées automatiquement dans `app/_layout.tsx` :

```tsx
const [fontsLoaded] = useFonts({
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
});
```

Le SplashScreen est affiché pendant le chargement des polices.
