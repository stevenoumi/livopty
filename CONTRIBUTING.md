# 📚 Guide de contribution

## 🎯 Bonnes pratiques

### 1. Structure du code

- **Un composant = un fichier**
- **Types d'abord** : Définir les types avant d'écrire le code
- **Nommage** : PascalCase pour composants, camelCase pour fonctions/variables
- **Imports organisés** : Types > Libraries > Components > Utils

### 2. TypeScript

```typescript
// ✅ BON - Types explicites
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

// ❌ MAUVAIS - Type 'any'
const handleData = (data: any) => { ... }
```

### 3. Gestion d'erreurs

```typescript
// ✅ BON - Utiliser le logger
import { logger } from "~/lib/services/logger";

try {
  await someAsyncOperation();
} catch (error) {
  logger.error("Operation failed", error);
}

// ❌ MAUVAIS - console.log
console.log("Error:", error);
```

### 4. Validation

```typescript
// ✅ BON - Utiliser les utilitaires de validation
import { validateEmail } from '~/lib/utils/validation';

const result = validateEmail(email);
if (!result.valid) {
  Alert.alert('Erreur', result.error);
  return;
}

// ❌ MAUVAIS - Validation inline
if (!email.includes('@')) { ... }
```

### 5. Navigation

```typescript
// ✅ BON - Utiliser les constantes
import { ROUTES } from "~/lib/constants";

router.push(ROUTES.LOGIN);

// ❌ MAUVAIS - Chaînes en dur
router.push("/loginPage");
```

### 6. Tests

- Écrire des tests pour toute nouvelle fonctionnalité
- Tests unitaires pour utils/services
- Tests d'intégration pour contexts/hooks

```bash
# Lancer les tests
pnpm test

# Avec coverage
pnpm test:coverage
```

### 7. Commits

Format : `type(scope): message`

Types :

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `refactor`: Refactoring
- `test`: Ajout/modification de tests
- `docs`: Documentation
- `style`: Formatage (sans changement de logique)

Exemples :

```
feat(auth): add password validation
fix(grocery): resolve list deletion bug
refactor(context): improve AuthContext performance
test(validation): add email validation tests
```

### 8. Performance

- Utiliser `React.memo` pour composants lourds
- `useCallback` pour fonctions passées en props
- `useMemo` pour calculs coûteux
- Éviter les re-renders inutiles

### 9. Sécurité

- **JAMAIS** commiter `.env`
- Valider toutes les entrées utilisateur
- Utiliser HTTPS uniquement
- Nettoyer les données sensibles des logs

### 10. Code Review

Avant de soumettre une PR :

- [ ] Tests passent
- [ ] Pas d'erreurs TypeScript
- [ ] Pas de console.log
- [ ] Documentation à jour
- [ ] Respecte les conventions de nommage

## 📖 Ressources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Docs](https://supabase.com/docs)
