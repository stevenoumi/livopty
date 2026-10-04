# 🛍️ LivOpty

**LivOpty** est une application mobile complète pour mieux vivre ensemble : gérez vos listes de courses, votre agenda, votre budget et vos discussions en toute simplicité !

## 📱 Fonctionnalités

- ✅ **Listes de courses** - Créez et partagez vos listes
- 💬 **Chat en temps réel** - Communiquez avec vos proches
- 📅 **Agenda partagé** - Synchronisez vos événements
- 💰 **Gestion financière** - Suivez vos dépenses
- 🔐 **Authentification sécurisée** - Via Supabase
- 🎨 **Interface moderne** - Avec NativeWind v4

## 🚀 Installation

### Prérequis

- Node.js 18+ et pnpm
- Expo CLI
- Un compte Supabase

### Étapes

1. **Cloner le projet**

   ```bash
   git clone https://github.com/stevenoumi/livopty.git
   cd livopty
   ```

2. **Installer les dépendances**

   ```bash
   pnpm install
   ```

3. **Configurer les variables d'environnement**

   ```bash
   cp .env.example .env
   ```

   Puis éditer `.env` avec vos clés Supabase :

   ```env
   EXPO_PUBLIC_SUPABASE_URL=votre_url_supabase
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=votre_cle_publishable
   ```

4. **Lancer l'application**
   ```bash
   pnpm dev          # Démarre Expo
   pnpm dev:android  # Pour Android
   pnpm dev:ios      # Pour iOS
   pnpm dev:web      # Pour le Web
   ```

## 📁 Architecture

```
├── app/                    # Screens (Expo Router)
│   ├── (screens)/         # Écrans principaux (tabs)
│   ├── groceryList/       # Listes de courses
│   ├── _layout.tsx        # Layout racine
│   └── ...                # Pages auth & autres
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   └── custom/           # Composants métier
├── lib/
│   ├── constants/        # Constantes (routes, validation)
│   ├── context/          # Contexts React (Auth, Chat)
│   ├── hooks/            # Custom hooks
│   ├── services/         # Services API (Supabase, etc.)
│   ├── types/            # Types TypeScript
│   └── utils/            # Utilitaires
└── assets/               # Images et ressources
```

## 🛠️ Technologies

- **React Native** 0.81.5
- **Expo** 54
- **TypeScript** 5.9
- **Expo Router** - Navigation file-based
- **Supabase** - Backend & Auth
- **NativeWind** v4 - Styling (Tailwind CSS)
- **Lucide Icons** - Icônes
- **Système de typographie** - Gestion globale des polices

## 🎨 Design System

### Typographie

Le projet utilise un système de typographie centralisé pour une cohérence visuelle :

- **Composants préformatés** : `<Heading1>`, `<ChatName>`, `<ListTitle>`, etc.
- **Classes Tailwind personnalisées** : `text-h1`, `text-chat-name`, etc.
- **Constantes réutilisables** : `FONT_SIZES`, `TYPOGRAPHY_STYLES`

📖 **Documentation complète** : Voir `docs/TYPOGRAPHY_GUIDE.md`

```tsx
// Exemple d'utilisation
import { Heading2, BodyText, ChatName } from '~/components/ui/typography';

<Heading2 className="text-purple-700">Mon titre</Heading2>
<BodyText className="text-gray-600">Mon contenu</BodyText>
<ChatName className="text-black">John Doe</ChatName>
```

## 🧪 Tests

```bash
# Lancer les tests (à venir)
pnpm test

# Lancer les tests en watch mode
pnpm test:watch
```

## 📝 Scripts disponibles

- `pnpm dev` - Démarre le serveur Expo
- `pnpm android` - Lance sur Android
- `pnpm ios` - Lance sur iOS
- `pnpm web` - Lance sur navigateur
- `pnpm clean` - Nettoie le cache

## 🔐 Sécurité

- ✅ Variables d'environnement gitignorées
- ✅ Validation côté client des données
- ✅ Types TypeScript stricts
- ✅ Logging centralisé
- ⚠️ TODO : Ajouter Sentry pour le monitoring en production

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence privée.

## 👥 Auteurs

- **Stevenoumi** - [GitHub](https://github.com/stevenoumi)

## 🙏 Remerciements

- [Expo](https://expo.dev/)
- [Supabase](https://supabase.com/)
- [NativeWind](https://www.nativewind.dev/)
