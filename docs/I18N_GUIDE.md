# Guide d'utilisation de l'internationalisation (i18n)

## 📦 Installation

L'i18n a été configuré avec **i18next** et **react-i18next** pour gérer les traductions dans l'application.

## 🏗️ Structure

```
lib/
├── i18n/
│   ├── index.ts              # Configuration i18next
│   └── locales/
│       ├── fr.json           # Traductions françaises
│       ├── en.json           # Traductions anglaises
│       └── es.json           # Traductions espagnoles
└── context/
    └── LanguageContext.tsx   # Context pour gérer la langue
```

## 🚀 Utilisation

### Dans un composant

```tsx
import { useLanguage } from "~/lib/context/LanguageContext";

function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <View>
      <Text>{t("common.welcome")}</Text>
      <Text>{t("auth.login.title", { appName: "LivOpty" })}</Text>

      <Button onPress={() => changeLanguage("en")}>Switch to English</Button>
    </View>
  );
}
```

### Méthodes disponibles

- **`t(key, options?)`** : Traduire une clé
- **`currentLanguage`** : Langue actuelle (objet avec code, label, flag)
- **`changeLanguage(code)`** : Changer la langue
- **`languages`** : Liste de toutes les langues disponibles

## 📝 Ajouter une traduction

### 1. Ajouter dans les fichiers JSON

Modifiez `fr.json`, `en.json`, `es.json` :

```json
{
  "mySection": {
    "myKey": "Ma traduction"
  }
}
```

### 2. Utiliser dans le code

```tsx
const text = t("mySection.myKey");
```

## 🌍 Langues supportées

- 🇫🇷 Français (fr) - par défaut
- 🇬🇧 Anglais (en)
- 🇪🇸 Espagnol (es)

## 🔧 Configuration

La langue est automatiquement sauvegardée dans AsyncStorage et restaurée au démarrage de l'app.

### Changer la langue par défaut

Dans `lib/i18n/index.ts` :

```ts
const DEFAULT_LANGUAGE = "fr"; // Changez ici
```

## 📱 Composant LanguageSelector

Le composant `LanguageSelector` a été mis à jour pour utiliser le contexte i18n :

```tsx
import LanguageSelector from "~/components/custom/LanguageSelector";

// Utilisation simple
<LanguageSelector />;
```

Plus besoin de passer `selectedLang` et `onSelect` en props !

## 🎯 Bonnes pratiques

1. **Toujours utiliser des clés** : Ne pas mettre de texte en dur
2. **Organiser par section** : Grouper les traductions par fonctionnalité
3. **Utiliser l'interpolation** : Pour les variables dynamiques

```tsx
// ❌ Mauvais
<Text>Bienvenue {userName}</Text>

// ✅ Bon
<Text>{t("welcome.greeting", { name: userName })}</Text>
```

4. **Tester toutes les langues** : Vérifier que les traductions fonctionnent

## 🔄 Migration d'un composant existant

### Avant

```tsx
<Text>Bienvenue sur LivOpty</Text>
```

### Après

```tsx
import { useLanguage } from "~/lib/context/LanguageContext";

function MyComponent() {
  const { t } = useLanguage();

  return <Text>{t("welcome.title")}</Text>;
}
```

## 🐛 Dépannage

### La traduction ne s'affiche pas

1. Vérifiez que la clé existe dans tous les fichiers JSON
2. Vérifiez l'orthographe de la clé
3. Assurez-vous que le composant est dans le `LanguageProvider`

### La langue ne change pas

1. Vérifiez que `changeLanguage` est appelé avec le bon code
2. Vérifiez la console pour les erreurs
3. Effacez le cache AsyncStorage si nécessaire

## 📚 Exemples

Consultez les composants déjà migrés :

- `app/loginPage.tsx` - Page de connexion complète
- `app/groceryList/[id].tsx` - Éditeur de notes
- `components/custom/LanguageSelector.tsx` - Sélecteur de langue
