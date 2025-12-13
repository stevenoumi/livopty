# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [Unreleased]

### Added - 13 Décembre 2025

#### 🔒 Sécurité

- Nettoyage du fichier `.env.example` - Suppression des vraies clés Supabase
- Amélioration du `.gitignore` avec exclusion des fichiers de tests et IDE

#### 📦 Types TypeScript

- Ajout de types stricts pour l'authentification (`lib/types/auth.ts`)
- Ajout de types pour les listes de courses (`lib/types/grocery.ts`)
- Ajout de types pour le chat (`lib/types/chat.ts`)
- Export centralisé des types (`lib/types/index.ts`)

#### 🛠️ Services & Utilitaires

- Création d'un service de logging centralisé (`lib/services/logger.ts`)
  - Support dev/production
  - Préparé pour intégration Sentry
- Création d'utilitaires de validation (`lib/utils/validation.ts`)
  - Validation email avec regex
  - Validation mot de passe (longueur, complexité)
  - Validation nom d'utilisateur

#### 📍 Constantes

- Ajout de constantes de routes (`lib/constants/routes.ts`)
- Ajout de constantes de validation (`lib/constants/validation.ts`)
- Messages d'erreur centralisés

#### ✨ Améliorations AuthService

- Refactoring complet avec validation côté client
- Typage strict avec `AuthResponse`, `SignUpData`, `SignInData`
- Messages d'erreur personnalisés et localisés
- Logging des opérations d'authentification
- Gestion robuste des erreurs réseau

#### 🔄 Amélioration AuthContext

- Correction du problème de double redirection
- Utilisation de `useRef` pour éviter les redirections multiples
- Typage strict avec interface `User`
- Meilleure gestion du cycle de vie avec `isMounted`
- Utilisation des constantes de routes

#### 🧪 Configuration des tests

- Setup Jest avec `jest-expo`
- Configuration ESLint avec règles TypeScript
- Mocks pour Expo Router, AsyncStorage, SplashScreen
- Tests unitaires pour validation (`lib/utils/__tests__/validation.test.ts`)
- Tests pour le logger (`lib/services/__tests__/logger.test.ts`)
- Scripts npm : `test`, `test:watch`, `test:coverage`

#### 📚 Documentation

- README complet avec instructions d'installation
- Guide de contribution (`CONTRIBUTING.md`)
- Ce changelog

### Changed

#### 🔄 Mise à jour des composants existants

- `app/loginPage.tsx` : Utilisation du nouveau authService et constantes
- `app/registerPage.tsx` : Simplification avec nouveau authService
- `lib/context/ChatContext.tsx` : Utilisation des types centralisés

### Fixed

- Problème de redirection infinie dans `AuthContext`
- Validation incohérente entre pages login/register

---

## [1.0.0] - Version initiale

### Added

- Application de base avec Expo Router
- Authentification Supabase
- Interface avec NativeWind v4
- Modules : Grocery, Chat, Finance, Agenda
