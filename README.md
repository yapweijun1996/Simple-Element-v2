# vue-dashboard-app

A modular, maintainable Vue 3 dashboard application scaffolded with Vite, Vue Router, Pinia, and SCSS.

## Project Structure

```
vue-dashboard-app/
├─ src/
│  ├─ components/
│  │  ├─ AppSidebar.vue
│  │  └─ AppHeader.vue
│  ├─ views/
│  │  ├─ Dashboard.vue
│  │  ├─ Users.vue
│  │  ├─ Settings.vue
│  │  ├─ Reports.vue
│  │  └─ Elements.vue
│  ├─ composables/
│  │  └─ useSettings.js
│  ├─ store/
│  │  └─ index.js
│  ├─ router/
│  │  └─ index.js
│  ├─ styles/
│  │  └─ theme.scss
│  ├─ App.vue
│  └─ main.js
├─ .eslintrc.js
├─ .prettierrc
├─ vite.config.js
├─ package.json
└─ README.md
```

## Setup & Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm run serve
```

### Lint & Format

```bash
npm run lint
npm run format
```

## Dependencies

- vue
- vue-router
- pinia

### Dev Dependencies

- vite
- @vitejs/plugin-vue
- eslint
- eslint-plugin-vue
- prettier
- sass

## Features

- Vue 3 + Composition API
- Single-File Components (SFCs)
- Vue Router for declarative navigation
- Pinia for state management
- SCSS with CSS variables (theme)
- ESLint + Prettier for code quality & formatting
- BEM naming & semantic HTML elements
- Accessible buttons with ARIA attributes 