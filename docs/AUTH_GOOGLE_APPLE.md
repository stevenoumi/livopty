# Connexion avec Google et Apple

L'app envoie à Supabase le jeton fourni par Google ou Apple
(`signInWithIdToken`), sans page web intermédiaire. Le code est dans
`lib/services/supabase/socialAuth.ts` et les boutons dans
`components/custom/auth/SocialAuthButtons.tsx`.

| Fournisseur | Plateformes    | Expo Go | Build de développement |
| ----------- | -------------- | ------- | ---------------------- |
| Apple       | iOS uniquement | Oui     | Oui                    |
| Google      | Android et iOS | Non     | Oui                    |

Le bouton Google est masqué dans Expo Go, qui ne contient pas le module natif
Google. Le bouton Apple n'apparaît que sur iOS : l'App Store impose Apple
seulement sur iOS dès qu'une autre connexion sociale est proposée.

## Google

### 1. Google Cloud Console

1. Créer un projet sur https://console.cloud.google.com.
2. **Google Auth Platform > Branding** : nom `LivOpty`, email d'assistance,
   logo. **Audience** : `External`. **Data access** : `openid`, `email`,
   `profile`.
3. **Clients > Create client**, trois fois :

| Type            | Réglage                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| Application Web | Aucun réglage obligatoire. C'est le client que Supabase vérifie.        |
| Android         | Package `com.livopty.app` et empreinte SHA-1 du certificat de signature |
| iOS             | Bundle ID `com.livopty.app`                                             |

L'empreinte SHA-1 Android s'obtient avec
`pnpm dlx eas-cli credentials --platform android` (profil concerné, puis
"Keystore"). Il en faut une par certificat : celui des builds EAS, puis celui
de Google Play App Signing au moment de publier.

### 2. Supabase

**Authentication > Sign In / Providers > Google** :

- **Enable** : activé
- **Client IDs** : l'identifiant du client Web, puis celui du client iOS,
  séparés par une virgule
- **Client Secret** : le secret du client Web
- **Skip nonce checks** : activé (la bibliothèque Google pour iOS n'envoie pas
  de nonce)

### 3. Variables d'environnement

Dans `.env` en local :

```bash
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=<client Web>.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=<client iOS>.apps.googleusercontent.com
```

Et dans EAS, pour chaque environnement (`development`, `preview`,
`production`) :

```bash
pnpm dlx eas-cli env:create --environment development --name EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID --value "<client Web>" --visibility plaintext
pnpm dlx eas-cli env:create --environment development --name EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID --value "<client iOS>" --visibility plaintext
```

Le client iOS sert aussi à la construction : `app.config.ts` en déduit le
schéma d'URL exigé par Google. Sans lui, le plugin Google n'est pas ajouté et
le bouton reste masqué sur iOS.

## Apple

### 1. Apple Developer

Il faut être inscrit à l'Apple Developer Program (99 $/an). Dans
**Certificates, Identifiers & Profiles > Identifiers**, l'identifiant
`com.livopty.app` doit avoir la capacité **Sign In with Apple**. EAS l'active
automatiquement au premier build iOS grâce à `ios.usesAppleSignIn`.

### 2. Supabase

**Authentication > Sign In / Providers > Apple** :

- **Enable** : activé
- **Client IDs** : `com.livopty.app,host.exp.Exponent`

`host.exp.Exponent` est l'identifiant d'Expo Go : il permet de tester Apple
dans Expo Go sur iPhone. Le retirer avant la publication.

Aucune clé secrète n'est nécessaire : elle ne sert qu'au parcours par page web.

### 3. Particularités d'Apple

- Apple ne transmet le nom qu'à la **toute première** autorisation. L'app
  l'enregistre aussitôt dans le profil ; s'il est perdu, l'utilisateur doit
  retirer LivOpty dans Réglages > Identifiant Apple > Connexion avec Apple.
- Un utilisateur peut masquer son adresse : Supabase reçoit alors une adresse
  `@privaterelay.appleid.com`. Pour que les emails de LivOpty lui parviennent,
  déclarer le domaine d'envoi (`livopty.stevenoumi.com`) dans
  **Services > Sign in with Apple for Email Communication**.

## Tester

1. Construire un build de développement et l'installer sur le téléphone :

   ```bash
   pnpm dlx eas-cli build --profile development --platform android
   ```

2. Lancer le serveur pour ce build :

   ```bash
   pnpm dev:client
   ```

`pnpm dev` continue d'ouvrir l'app dans Expo Go, sans le bouton Google.
