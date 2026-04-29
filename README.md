# Automation Dashboard

[![CI](https://github.com/your-org/automation-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/automation-dashboard/actions/workflows/ci.yml)
[![Deploy](https://github.com/your-org/automation-dashboard/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-org/automation-dashboard/actions/workflows/deploy.yml)
[![Code Quality](https://github.com/your-org/automation-dashboard/actions/workflows/code-quality.yml/badge.svg)](https://github.com/your-org/automation-dashboard/actions/workflows/code-quality.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dashboard interactivo para monitoreo de pipelines CI/CD, métricas de calidad de código, cobertura de tests y estado de despliegues.

## Demostración de automatizaciones

Este proyecto demuestra experiencia en:

### CI/CD

- **GitHub Actions**: Pipelines multi-etapa con matrix builds (Node 18, 20, 22)
- **Deploy automático** a GitHub Pages en cada push a `main`
- **Cache de dependencias** para builds optimizados

### Calidad de código

- **ESLint + Prettier**: Linting y formateo automático
- **Husky + lint-staged**: Pre-commit hooks que validan código antes de cada commit
- **Commitlint**: Validación de conventional commits
- **SonarCloud**: Análisis estático de código y cobertura
- **CodeQL**: Escaneo de seguridad automático

### Docker

- **Multi-stage build**: Build con Node, serve con Nginx
- **docker-compose**: Entorno local con un solo comando
- **Healthcheck**: Monitoreo de estado del contenedor

### Testing

- **Tests unitarios** con Vitest (built-in Angular)
- **Cobertura de código** con thresholds configurables

## Stack técnico

| Área      | Tecnología                         |
| --------- | ---------------------------------- |
| Framework | Angular 21 (standalone, signals)   |
| UI        | Angular Material + Tailwind CSS v4 |
| State     | Signals + computed                 |
| CI/CD     | GitHub Actions                     |
| Hooks     | Husky + lint-staged + commitlint   |
| Quality   | SonarCloud + CodeQL                |
| Container | Docker + Nginx                     |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 10
- Docker (opcional)

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Abre http://localhost:4200

### Build

```bash
npm run build
```

### Docker

```bash
docker compose up -d
```

### Scripts disponibles

| Comando                | Descripción                   |
| ---------------------- | ----------------------------- |
| `npm start`            | Servidor de desarrollo        |
| `npm run build`        | Build de producción           |
| `npm run lint`         | Ejecutar ESLint               |
| `npm run format`       | Formatear código con Prettier |
| `npm run format:check` | Verificar formateo            |
| `npm run typecheck`    | Verificar tipos TypeScript    |
| `npm test`             | Ejecutar tests unitarios      |

## Estructura del proyecto

```
src/app/
├── core/
│   ├── models/          # Interfaces y tipos
│   └── services/        # Servicios con datos mock
├── features/
│   ├── dashboard/       # Panel principal
│   ├── pipelines/       # Vista de pipelines
│   ├── tests/           # Reporte de cobertura
│   └── settings/        # Configuración
└── shared/
    └── components/      # Componentes compartidos
```

## Automatizaciones configuradas

### Pre-commit hook

```
.git/hooks/pre-commit → npx lint-staged
```

Ejecuta ESLint + Prettier solo en archivos staged.

### Commit message validation

```
.git/hooks/commit-msg → npx commitlint --edit
```

Valida que los commits sigan [Conventional Commits](https://www.conventionalcommits.org/).

### CI Pipeline

1. Checkout → Install → Lint → Format check → Type check → Build
2. Matrix: Node 18, 20, 22
3. Upload artifacts (solo Node 20)

### Deploy Pipeline

1. Trigger en push a `main`
2. Build production con base-href
3. Deploy a GitHub Pages

### Code Quality

1. **SonarCloud**: Análisis de cobertura y code smells
2. **CodeQL**: Escaneo de vulnerabilidades de seguridad

## License

MIT
