# 🚀 Guide de démarrage rapide

## Après l'installation des dépendances

### 1️⃣ Configurer les variables d'environnement

```bash
# Créer le fichier .env à partir de l'exemple
cp .env.example .env
```

Puis éditer `.env` avec vos vraies clés Supabase :

```env
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=votre_cle_publishable_ici
```

> 🔑 **Obtenir vos clés** : https://supabase.com/dashboard/project/_/settings/api

### 2️⃣ Vérifier que tout fonctionne

```bash
# Vérifier les types TypeScript
pnpm types:check

# Lancer les tests
pnpm test

# Démarrer l'application
pnpm dev
```

### 3️⃣ Configurer votre éditeur

Si vous utilisez VS Code, installez les extensions recommandées :

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Expo Tools

### ✅ Vous êtes prêt !

L'application devrait démarrer sur :

- 📱 Expo Go (scannez le QR code)
- 🌐 Web (appuyez sur `w`)
- 🤖 Android (appuyez sur `a`)
- 🍎 iOS (appuyez sur `i`)

## 🆘 Besoin d'aide ?

- 📖 Documentation : voir `README.md`
- 🤝 Contribution : voir `CONTRIBUTING.md`
- 📝 Changelog : voir `CHANGELOG.md`

## 🎯 Prochaines étapes recommandées

1. ✅ Configurer Supabase (tables, policies)
2. ✅ Personnaliser les couleurs dans `tailwind.config.js`
3. ✅ Ajouter vos propres fonctionnalités
4. ✅ Écrire des tests pour votre code
5. ✅ Déployer avec EAS Build

---

**Bon développement ! 🎉**
