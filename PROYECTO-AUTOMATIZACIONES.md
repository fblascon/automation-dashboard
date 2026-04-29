# Proyecto de Automatizaciones CI/CD

Este proyecto demuestra un setup completo de automatizaciones para aplicaciones Angular con Node.js.

## Stack Tecnológico

| Área      | Tecnología                           |
| --------- | ------------------------------------ |
| Framework | Angular 21 (standalone, signals)     |
| UI        | Angular Material + CSS personalizado |
| State     | Signals                              |
| Testing   | Vitest/Jest                          |
| CI/CD     | GitHub Actions                       |
| Hooks     | Husky + lint-staged + commitlint     |

## Automatizaciones Incluidas

### 1. Pre-commit Hook

**Qué hace:** Antes de cada `git commit`, automáticamente:

- **ESLint** - Detecta y arregla errores de código JavaScript/TypeScript
- **Prettier** - Formatea el código automáticamente

**Archivos:**

- `.husky/pre-commit` - Hook de git
- `lint-staged.config.js` - Configuración de tareas
- `eslint.config.js` - Reglas de linting

### 2. Validación de Commits

**Qué hace:** Valida que el mensaje de commit siga el formato "Conventional Commits"

**Formato requerido:**

```
type: description

Types: feat, fix, docs, style, refactor, test, chore
```

**Ejemplos:**

```
feat: add new feature
fix: resolve bug in login
docs: update README
```

**Archivos:**

- `.husky/commit-msg` - Hook de validación
- `commitlint.config.js` - Configuración

### 3. CI Pipeline (GitHub Actions)

**Qué hace:** En cada push a la rama principal:

1. Instala dependencias
2. Ejecuta ESLint
3. Verifica formato con Prettier
4. Verifica tipos TypeScript
5. Ejecuta tests unitarios
6. Build de producción
7. Sube artifacts

**Archivos:**

- `.github/workflows/ci.yml` - Pipeline principal

### 4. Deploy Automático

**Qué hace:** Cuando se hace push a `main`:

1. Build de producción
2. Despliega a GitHub Pages automáticamente

**Archivos:**

- `.github/workflows/deploy.yml` - Pipeline de despliegue

### 5. Tests Unitarios

**Qué hace:** Ejecuta tests con Jest y verifica coverage

**Configuración:**

- `jest.config.js` - Config de Jest
- Coverage threshold: 80% statements, 50% branches, 70% functions, 80% lines

---

## Cómo Aplicar a Proyectos Existentes

### Paso 1: Instalar Dependencias

```bash
# Dependencies
npm install @angular/core@^21 @angular/common@^21 @angular/router@^21 @angular/platform-browser@^21 @angular/forms@^21 @angular/animations@^21 @angular/cdk@^21 @angular/material@^21 rxjs

# Dev dependencies
npm install -D @angular/cli@^21 @angular/build@^21 @angular/compiler-cli@^21 typescript@~5.9
npm install -D jest@^30 jest-preset-angular@^16 @types/jest@^30
npm install -D eslint@^10 prettier@^3
npm install -D husky@^9 lint-staged@^16 @commitlint/cli@^20 @commitlint/config-conventional@^20
npm install -D @typescript-eslint/parser@^8 @typescript-eslint/eslint-plugin@^8
npm install -D @angular-eslint/template-parser@^21 @angular-eslint/builder@^21
npm install -D tailwindcss@^4 @tailwindcss/postcss@^4 autoprefixer@^10 postcss@^8
```

### Paso 2: Configurar ESLint

```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        Promise: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: await import('@angular-eslint/template-parser'),
    },
    rules: {},
  },
];
```

### Paso 3: Configurar lint-staged

```javascript
// lint-staged.config.js
export default {
  '*.{ts,js}': ['eslint --fix', 'prettier --write'],
  '*.{html,scss,css,json,md}': ['prettier --write'],
};
```

### Paso 4: Configurar commitlint

```javascript
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
};
```

### Paso 5: Configurar Husky

```bash
npx husky init
```

Editar `.husky/pre-commit`:

```bash
npx lint-staged
```

### Paso 6: Configurar GitHub Actions

**.github/workflows/ci.yml:**

```yaml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build -- --configuration production
```

**.github/workflows/deploy.yml:**

```yaml
name: Deploy

on:
  push:
    branches: [main, master]

permissions:
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build -- --configuration production
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - uses: actions/deploy-pages@v4
```

### Paso 7: Scripts en package.json

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "jest",
    "lint": "eslint \"src/**/*.{ts,html}\"",
    "format": "prettier --write \"src/**/*.{ts,html}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html}\"",
    "typecheck": "tsc --noEmit",
    "prepare": "husky"
  }
}
```

### Paso 8: Configurar Jest

```javascript
// jest.config.js
export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 70,
      lines: 80,
    },
  },
};
```

---

## Comandos Útiles

```bash
# Iniciar proyecto
npm install

# Desarrollo
npm start                    # Servidor en http://localhost:4200

# Calidad de código
npm run lint                 # Detectar errores
npm run format               # Formatear código
npm run format:check         # Verificar formato
npm run typecheck            # Verificar tipos

# Testing
npm test                     # Ejecutar tests
npm run test:coverage        # Tests con coverage

# Build
npm run build                # Build producción

# Hooks
npm run prepare             # Instalar Husky
```

---

## Estructura de Archivos

```
proyecto/
├── .github/workflows/
│   ├── ci.yml              # Pipeline CI
│   └── deploy.yml          # Pipeline Deploy
├── .husky/
│   ├── pre-commit          # Hook pre-commit
│   └── commit-msg          # Hook commit-msg
├── src/
│   ├── app/
│   └── setup-jest.ts       # Config Jest
├── eslint.config.js        # Config ESLint
├── lint-staged.config.js   # Config lint-staged
├── commitlint.config.js    # Config commitlint
├── jest.config.js          # Config Jest
├── tsconfig.json          # Config TypeScript
└── package.json            # Dependencias y scripts
```

---

## Resultados del Pipeline

| Step         | Estado              |
| ------------ | ------------------- |
| Install      | ✅                  |
| Lint         | ✅                  |
| Format check | ✅                  |
| Type check   | ✅                  |
| Unit tests   | ✅                  |
| Build        | ✅                  |
| Deploy       | ✅ (a GitHub Pages) |

---

##这只一个示例项目

Este setup es un ejemplo completo. Puedes adaptarlo según las necesidades de tu proyecto:

- Cambiar la rama principal (`main`/`master`)
- Ajustar los coverage thresholds
- Añadir más jobs al CI (E2E tests, SonarCloud, etc.)
- Configurar deploy a otros servicios (Vercel, Netlify, AWS, etc.)
