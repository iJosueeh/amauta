<div align="center">

# Amauta

### Dashboard educativo offline-first para zonas vulnerables del Perú

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## Propósito

**Amauta** es una aplicación web diseñada para docentes que trabajan en instituciones educativas en zonas rurales y remotas del Perú. Permite gestionar asistencia, calificaciones, incidentes y reportes de estudiantes **sin necesidad de conexión a internet**.

> El nombre "Amauta" proviene del quechua y significa "maestro" o "sabio", en honor a los educadores que transforman comunidades.

---

## Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| **Dashboard** | Panel principal con KPIs, acciones rápidas y resumen por sección |
| **Asistencia** | Registro diario con estados: Presente, Tardanza, Falta |
| **Calificaciones** | Gestión de notas por bimestre (EV1, EV2, EV3, Examen) con promedio automático |
| **Incidentes** | Registro conductual con categorías: Positivo, Observación, Falta |
| **Estudiantes** | directorio con rendimiento, filtros y búsqueda |
| **Secciones** | Gestión de clases con detalle y estadísticas |
| **Reportes** | Exportación de datos y reportes para SIAGIE |
| **Configuración** | Perfil, preferencias, modo offline e idioma |

---

## Arquitectura

```
src/
├── app/                    # Layouts y rutas
│   ├── layouts/            # AuthLayout, DashboardLayout, OnboardingLayout
│   └── routes/             # Router y ProtectedRoute
├── components/ui/          # Componentes base (shadcn/ui)
├── features/               # Arquitectura por feature
│   ├── attendance/         # Asistencia
│   ├── auth/               # Autenticación
│   ├── dashboard/          # Panel principal
│   ├── grades/             # Calificaciones
│   ├── incidents/          # Incidentes
│   ├── reports/            # Reportes
│   ├── sections/           # Secciones
│   ├── settings/           # Configuración y perfil
│   └── students/           # Estudiantes
└── shared/                 # Compartido
    ├── config/             # Configuración (nav)
    ├── db/                 # Base de datos (Dexie)
    ├── stores/             # Estado global (Zustand)
    └── types/              # Tipos compartidos
```

Cada feature sigue la estructura:
```
feature/
├── types/      # Definiciones TypeScript
├── stores/     # Estado Zustand + getter methods
├── seeds/      # Datos mock offline
├── components/ # Componentes UI
├── pages/      # Páginas orquestadoras
└── hooks/      # Hooks personalizados (si aplica)
```

---

## Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| **Framework** | React 19 | UI library |
| **Build** | Vite 8 + Rolldown | Bundler ultrarrápido |
| **Lenguaje** | TypeScript 6 | Tipado estático |
| **Estilos** | Tailwind CSS 4 | Utility-first CSS |
| **UI Kit** | shadcn/ui (Base UI) | Componentes accesibles |
| **Iconos** | Lucide React | Iconografía consistente |
| **Router** | React Router 8 | Navegación SPA |
| **Estado** | Zustand 5 | State management ligero |
| **BD Offline** | Dexie.js 4 | IndexedDB wrapper |
| **Linting** | Oxlint | Análisis estático |

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/amauta.git
cd amauta

# Instalar dependencias
npm install

# Ejutar en desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

---

## Decisiones Técnicas

- **shadcn/ui con Base UI (no Radix)**: Usa `render` prop en vez de `asChild`, con `nativeButton={false}` para composición correcta
- **Arquitectura por feature**: Cada módulo es autónomo con sus types, stores, seeds y components
- **Sección global**: Un Zustand store comparte `activeSectionId` entre todos los features para filtrado consistente
- **Datos offline**: Seeds con datos mock realistas para funcionar sin backend
- **Mobile-first**: Responsive design con底部导航 en móvil y sidebar en desktop

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build optimizado para producción |
| `npm run lint` | Análisis estático con Oxlint |
| `npm run preview` | Vista previa del build |

---

## Licencia

MIT

---

<div align="center">
  <sub>Construido con ❤️ para los educadores del Perú</sub>
</div>
