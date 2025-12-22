# Configuration Supabase pour l'Authentification

## 🎯 Flux d'authentification actuel

### Inscription (Register)

1. L'utilisateur remplit le formulaire (nom, email, mot de passe)
2. Création du compte Supabase
3. **Accès direct à Home** ✅

### Connexion (Login)

1. L'utilisateur entre email/mot de passe
2. Vérification des credentials
3. **Accès direct à Home** ✅

## ⚙️ Configuration Supabase requise

Pour que l'inscription fonctionne sans vérification email obligatoire, vous devez configurer Supabase :

### Option 1 : Désactiver la confirmation email (Recommandé)

1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Authentication** > **Providers** > **Email**
4. Décochez **"Enable email confirmations"**
5. Cliquez sur **Save**

✅ **Avantage** : Les utilisateurs peuvent se connecter immédiatement après inscription
⚠️ **Note** : L'email doit quand même être valide mais n'est pas vérifié

### Option 2 : Activer la vérification par code OTP (Alternative)

Si vous voulez vérifier les emails avec un code à 6 chiffres :

1. Allez dans **Authentication** > **Email Templates**
2. Sélectionnez **"Magic Link"** template
3. Activez **"Enable Email OTP"**
4. Modifiez le template pour afficher le code `{{ .Token }}`
5. Dans votre code, utilisez `signInWithOtp` au lieu de `signUp`

#### Modification du code pour OTP

```typescript
// Dans authService.ts
export const signUpWithOtp = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      shouldCreateUser: true,
    },
  });

  return { success: !error, error: error?.message };
};
```

#### Template email personnalisé

```html
<h2>Votre code de vérification</h2>
<p>Entrez ce code dans l'application :</p>
<h1 style="font-size: 32px; letter-spacing: 5px;">{{ .Token }}</h1>
<p>Ce code expire dans 60 minutes.</p>
```

## 🔒 Configuration de sécurité

### Rate limiting

Par défaut, Supabase limite les tentatives :

- **Inscription** : 30 requêtes / heure / IP
- **Connexion** : 30 requêtes / heure / IP

Modifiez dans **Authentication** > **Rate Limits** si nécessaire.

### Politique de mot de passe

Dans **Authentication** > **Policies** :

- Longueur minimale : 6 caractères (défaut)
- Complexité : Peut être configurée

## 📱 Deep Links (pour liens email)

Si vous utilisez des liens de confirmation email :

### Configurer dans Supabase

**Site URL** : `livopty://` (ou votre URL de production)
**Redirect URLs** :

- `livopty://loginPage`
- `livopty://verifyOtpPage`
- `livopty://(screens)/Home`

### Configurer dans app.json

```json
{
  "expo": {
    "scheme": "livopty",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "livopty"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.livopty",
      "associatedDomains": ["applinks:livopty.com"]
    }
  }
}
```

## 🧪 Test de l'authentification

### Test local

```bash
# Terminal 1 : Démarrer l'app
pnpm dev

# Terminal 2 : Créer un compte de test
curl -X POST 'https://your-project.supabase.co/auth/v1/signup' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "data": { "name": "Test User" }
  }'
```

### Vérifier dans le Dashboard

1. **Authentication** > **Users**
2. Vérifiez que le nouveau compte apparaît
3. Status : `confirmed` (si email confirmations désactivé) ou `unconfirmed`

## 🚨 Troubleshooting

### "Email not confirmed"

➡️ Désactivez **"Enable email confirmations"** dans les paramètres Email Provider

### "Invalid email or password"

➡️ Vérifiez que l'email et le mot de passe respectent les politiques

### "User already registered"

➡️ Utilisez la connexion (Login) au lieu de l'inscription (Register)

### Email OTP ne contient pas de code

➡️ Activez "Email OTP" dans les Email Templates et modifiez le template pour inclure `{{ .Token }}`

## 📚 Documentation Supabase

- [Auth Configuration](https://supabase.com/docs/guides/auth/auth-email)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Deep Linking](https://supabase.com/docs/guides/auth/auth-deep-linking)
- [Rate Limiting](https://supabase.com/docs/guides/auth/auth-rate-limiting)

## ✅ Configuration actuelle recommandée

Pour votre cas d'usage (inscription + connexion immédiate) :

1. ✅ **Désactiver "Enable email confirmations"**
2. ✅ **Garder la politique de mot de passe par défaut**
3. ✅ **Configurer les redirect URLs pour deep links**
4. ✅ **Rate limiting par défaut (30/h)**

Avec cette configuration, le flux est :

- **Register** → Création compte → **Home directement** 🎉
- **Login** → Vérification → **Home directement** 🎉
