import { validateEmail, validatePassword, validateName } from '../validation';

describe('validateEmail', () => {
  it('should accept valid email', () => {
    const result = validateEmail('test@example.com');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject empty email', () => {
    const result = validateEmail('');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should reject invalid email format', () => {
    const result = validateEmail('notanemail');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Adresse email invalide');
  });

  it('should reject email without @', () => {
    const result = validateEmail('test.example.com');
    expect(result.valid).toBe(false);
  });

  it('should trim and accept email with spaces', () => {
    const result = validateEmail('  test@example.com  ');
    expect(result.valid).toBe(true);
  });
});

describe('validatePassword', () => {
  it('should accept valid password', () => {
    const result = validatePassword('password123');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject empty password', () => {
    const result = validatePassword('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Le mot de passe est requis');
  });

  it('should reject password shorter than 6 characters', () => {
    const result = validatePassword('12345');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Le mot de passe doit contenir au moins 6 caractères');
  });

  it('should accept password with exactly 6 characters', () => {
    const result = validatePassword('123456');
    expect(result.valid).toBe(true);
  });

  it('should reject password longer than 128 characters', () => {
    const result = validatePassword('a'.repeat(129));
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Le mot de passe est trop long');
  });
});

describe('validateName', () => {
  it('should accept valid name', () => {
    const result = validateName('John Doe');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject empty name', () => {
    const result = validateName('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Le nom est requis');
  });

  it('should reject name with only spaces', () => {
    const result = validateName('   ');
    expect(result.valid).toBe(false);
  });

  it('should reject name shorter than 2 characters', () => {
    const result = validateName('A');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Le nom doit contenir au moins 2 caractères');
  });

  it('should accept name with exactly 2 characters', () => {
    const result = validateName('Jo');
    expect(result.valid).toBe(true);
  });

  it('should reject name longer than 50 characters', () => {
    const result = validateName('a'.repeat(51));
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Le nom est trop long');
  });

  it('should trim spaces from name', () => {
    const result = validateName('  John  ');
    expect(result.valid).toBe(true);
  });
});
