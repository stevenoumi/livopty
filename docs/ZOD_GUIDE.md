# Guide d'utilisation de Zod pour la validation des formulaires

## 📦 Installation

Zod a été intégré avec **react-hook-form** pour une validation de formulaires performante et type-safe.

Packages installés :

- `zod` - Schémas de validation TypeScript-first
- `react-hook-form` - Gestion des formulaires React
- `@hookform/resolvers` - Intégration Zod avec react-hook-form

## 🏗️ Structure

```
lib/
├── schemas/
│   └── auth.schema.ts    # Schémas de validation Zod pour l'authentification
```

## 🎯 Schémas disponibles

### Authentification

#### `loginSchema`

```ts
{
  email: string (email valide, requis),
  password: string (min 6 caractères, requis)
}
```

#### `registerSchema`

```ts
{
  name: string (min 2 caractères, requis),
  email: string (email valide, requis),
  password: string (min 6 caractères, requis),
  confirmPassword: string (doit correspondre au password)
}
```

#### `verifyOtpSchema`

```ts
{
  otp: string (exactement 6 chiffres, requis)
}
```

## 🚀 Utilisation

### Exemple : Formulaire de connexion

```tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "~/lib/schemas/auth.schema";

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // data est automatiquement validé et typé
    console.log(data.email, data.password);
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Email"
              className={errors.email ? "border-red-500" : "border-gray-300"}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs">
                {errors.email.message}
              </Text>
            )}
          </>
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 📝 Créer un nouveau schéma

### 1. Définir le schéma dans `lib/schemas/`

```ts
import { z } from "zod";

export const myFormSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(20, "Le nom d'utilisateur est trop long"),
  age: z.number().min(18, "Vous devez avoir au moins 18 ans").optional(),
});

export type MyFormData = z.infer<typeof myFormSchema>;
```

### 2. Utiliser dans un composant

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myFormSchema, type MyFormData } from "~/lib/schemas/myForm.schema";

const MyComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFormData>({
    resolver: zodResolver(myFormSchema),
  });

  const onSubmit = (data: MyFormData) => {
    // data est validé
  };

  // ... rest of component
};
```

## 🎨 Validations Zod communes

### String

```ts
z.string()
  .min(3, "Minimum 3 caractères")
  .max(100, "Maximum 100 caractères")
  .email("Email invalide")
  .url("URL invalide")
  .regex(/^[A-Z]/, "Doit commencer par une majuscule")
  .trim() // Supprime les espaces
  .toLowerCase() // Convertit en minuscules
  .optional(); // Rend le champ optionnel
```

### Number

```ts
z.number()
  .min(0, "Doit être positif")
  .max(100, "Maximum 100")
  .int("Doit être un entier")
  .positive("Doit être positif")
  .optional();
```

### Validation personnalisée

```ts
z.string().refine((val) => val !== "admin", {
  message: "Ce nom est réservé",
});
```

### Validation entre champs

```ts
z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"], // Indique quel champ a l'erreur
});
```

## ✅ Avantages

1. **Type-safety** : Les types TypeScript sont automatiquement dérivés
2. **Validation côté client** : Feedback instantané pour l'utilisateur
3. **Messages d'erreur personnalisés** : Messages clairs en français
4. **Performance** : Validation uniquement quand nécessaire (onBlur, onChange, onSubmit)
5. **Maintenance** : Schémas centralisés et réutilisables

## 🔧 Configuration react-hook-form

### Mode de validation

```tsx
useForm({
  mode: "onBlur", // Valide au blur (par défaut)
  mode: "onChange", // Valide à chaque changement
  mode: "onSubmit", // Valide uniquement à la soumission
  mode: "all", // Valide tout le temps
});
```

### Réinitialiser un formulaire

```tsx
const { reset } = useForm();

// Réinitialiser aux valeurs par défaut
reset();

// Réinitialiser avec de nouvelles valeurs
reset({ email: "", password: "" });
```

### Déclencher la validation manuellement

```tsx
const { trigger } = useForm();

// Valider un champ spécifique
await trigger("email");

// Valider tout le formulaire
await trigger();
```

## 📚 Exemples migrés

Les pages suivantes utilisent déjà Zod :

- ✅ `app/loginPage.tsx` - Connexion avec email et mot de passe
- ✅ `app/registerPage.tsx` - Inscription avec validation de confirmation
- ✅ `app/verifyOtpPage.tsx` - Vérification du code OTP

## 🐛 Dépannage

### Les erreurs ne s'affichent pas

- Vérifiez que vous utilisez `errors.fieldName?.message`
- Assurez-vous que le `Controller` est bien configuré

### Validation ne se déclenche pas

- Vérifiez le mode de validation dans `useForm`
- Assurez-vous d'utiliser `handleSubmit(onSubmit)` sur le bouton

### Type errors TypeScript

- Vérifiez que vous utilisez le bon type dérivé avec `z.infer<typeof schema>`
- Importez le type depuis le fichier de schéma
