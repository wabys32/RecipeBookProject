# Recipe Book Defense Notes

## One-Minute Project Summary

This project is a unified recipe management application. The user can browse recipes, filter and sort them, open recipe details, add a new recipe through a validated form, edit or delete recipes, mark recipes as favorites, like recipes, and view profile statistics. The application uses React Router for navigation, Context API for global state, custom hooks for reusable logic, and an external recipe API synchronized with local state.

## Mandatory Requirements

| Requirement | Status | Where to show |
| --- | --- | --- |
| Unified application logic | Satisfied | `src/context/RecipeContext.jsx`, `src/pages/Recipes.jsx` |
| Complete UI | Satisfied | `src/components/Header.jsx`, `src/components/NavBar.jsx`, `src/pages/Home.jsx`, `src/pages/Recipes.jsx`, `src/pages/Profile.jsx` |
| Complete user flow | Satisfied | `src/pages/Recipes.jsx`, `src/components/RecipeForm.jsx`, `src/components/RecipeModal.jsx` |
| Functionally complete | Satisfied | add/edit/delete/favorite/like/filter/sort/profile stats |
| Modern React standards | Satisfied | functional components, hooks, Context API, Router, memoization, tests |
| React Router used | Satisfied | `src/main.jsx`, `src/App.jsx`, `src/components/NavBar.jsx` |
| Context API used | Satisfied | `src/context/RecipeContext.jsx`, `src/context/AuthContext.jsx` |
| State management used | Satisfied | `src/context/RecipeContext.jsx`, local `useState` in forms/modals/pages |
| Project runs | Satisfied | `npm.cmd run dev`, `npm.cmd run build`, `npm.cmd test -- --run` |

## Assessment Checklist

### 2.1 Project Architecture and Structure

The project is organized into clear folders:

- `src/components` - reusable UI parts such as `RecipeForm`, `RecipeModal`, `RecipeCardCompound`, `Filters`, `Header`, `NavBar`.
- `src/pages` - route-level pages: `Home`, `Recipes`, `Profile`, `NotFound`.
- `src/context` - global state: `RecipeContext`, `AuthContext`.
- `src/hooks` - reusable logic: `useFetch`, `useForm`, `useFilter`.
- `src/services` - API/data transformation logic: `recipeApi.js`.
- `src/test` and `*.test.jsx` - testing setup and test coverage.

I separated page-level components, reusable UI components, hooks, context, and services. This makes the project scalable because UI, state, side effects, and API mapping are not mixed into one file.

### 2.2 React JSX, Components, Props

Important files:

- `src/pages/Recipes.jsx` passes recipe data and handlers into `RecipeCardCompound`.
- `src/components/RecipeCardCompound.jsx` uses a compound component pattern: `Header`, `Body`, `Footer`.
- `src/components/Filters.jsx` receives filter state and setter functions through props.
- `src/components/RecipeListRenderProps.jsx` demonstrates the render props pattern.

The interface is decomposed into reusable components. Components receive data through props, while recipe data itself comes from Context and services rather than being hardcoded inside the cards.

### 2.3 State Management

Important files:

- `src/context/RecipeContext.jsx` stores global recipe state and exposes `addRecipe`, `updateRecipe`, `deleteRecipe`, `toggleFavorite`, and `incrementLikes`.
- `src/context/AuthContext.jsx` stores authentication state for the protected profile page.
- `src/pages/Recipes.jsx` uses local state for selected recipe and add-recipe modal.
- `src/components/RecipeForm.jsx` uses local state for validation errors.
- `src/components/RecipeModal.jsx` uses local state for edit mode and edited recipe values.

Global state is placed in Context because recipes are used across the header, recipes page, modal, form, and profile statistics. Local UI state stays inside the component where it belongs.

### 2.4 useEffect and Side Effects

Important files:

- `src/hooks/useFetch.jsx` uses `useEffect` to fetch external API data and cleans up with `AbortController`.
- `src/context/RecipeContext.jsx` uses `useEffect` to load recipes from `localStorage`, merge API data, and save state changes.

Side effects are isolated. The fetch hook handles loading, error, data, and cleanup. The context synchronizes recipe state with localStorage and API data.

### 2.5 Forms and Validation

Important file:

- `src/components/RecipeForm.jsx`

Implemented:

- Controlled fields for title, category, rating, ingredients, instructions, tags.
- Validation for required fields.
- Rating validation from 1 to 5.
- Real-time validation through `handleValidatedChange`.
- Submit validation before calling `addRecipe`.
- Uncontrolled image URL field with `useRef`.

The form uses controlled inputs for main recipe data, shows validation errors, prevents invalid submission, and then writes valid data into global Context.

### 2.6 React Router

Important files:

- `src/main.jsx` wraps the app in `BrowserRouter`.
- `src/App.jsx` defines routes for `/`, `/recipes`, `/profile`, and `*`.
- `src/components/NavBar.jsx` uses `NavLink` for navigation without page reloads.
- `src/pages/NotFound.jsx` handles unknown routes.

Routing is fully implemented with multiple pages and a NotFound route. Navigation is client-side using NavLink.

### 2.7 Custom Hooks

Important files:

- `src/hooks/useForm.jsx` manages form state and reusable form handlers.
- `src/hooks/useFetch.jsx` handles API loading, error, data, and cleanup.
- `src/hooks/useFilter.jsx` filters and sorts recipes using `useMemo`.

I extracted reusable logic into custom hooks, so components stay focused on rendering and user interaction.

### 2.8 API Integration

Important files:

- `src/hooks/useFetch.jsx` performs the fetch.
- `src/services/recipeApi.js` stores `MEALDB_SEARCH_URL`, initial recipes, and maps API meals into app recipe objects.
- `src/context/RecipeContext.jsx` calls `useFetch`, merges API recipes with saved recipes, and synchronizes them with global state.

The project uses TheMealDB API. API data is transformed in a service file, then merged into Context state. Loading state is shown on the recipes page.

### 2.9 Performance Optimization

Important files:

- `src/components/RecipeCardCompound.jsx` uses `React.memo`.
- `src/components/RecipeCard.jsx` also uses `memo`.
- `src/hooks/useFilter.jsx` uses `useMemo` to avoid recalculating filtered lists unnecessarily.
- `src/pages/Recipes.jsx` uses `useCallback` for recipe click handling.
- `src/App.jsx` and `src/pages/Recipes.jsx` use `lazy` and `Suspense` for code splitting.

The app avoids unnecessary rendering with memoized cards, memoized filtering, callback memoization, and lazy loading.

### 2.10 UI/UX and Visual Design

Important files:

- `src/components/Header.jsx`
- `src/components/NavBar.jsx`
- `src/components/Filters.jsx`
- `src/components/RecipeCardCompound.jsx`
- `src/components/RecipeForm.jsx`
- `src/components/RecipeModal.jsx`
- `src/pages/Profile.jsx`

Implemented:

- Consistent orange/white recipe-book style.
- Responsive grid layouts with `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`.
- Flexbox layouts for headers, buttons, stats, and modal actions.
- Hover effects and transitions on buttons/cards.
- Modal workflow for add/edit/detail.

The UI is responsive, consistent, and supports a complete workflow from browsing to editing recipes.

### 2.10 Testing

Important files:

- `src/hooks/useForm.test.jsx`
- `src/components/RecipeCardCompound.test.jsx`
- `src/components/RecipeFormHybrid.test.jsx`
- `src/components/RecipeListRenderProps.test.jsx`
- `src/test/setup.js`
- `vite.config.js`

Implemented tests:

- `useForm` initialization, change, reset, submit behavior.
- `RecipeCardCompound` rendering and action callbacks.
- `RecipeForm` validation and successful submission.
- `RecipeListRenderProps` filtering behavior.

Tests use Vitest and React Testing Library. They cover key hooks and user-facing components.

Run tests:

```bash
npm.cmd test -- --run
```

## Commands to Demonstrate

```bash
npm.cmd install
npm.cmd run dev
npm.cmd test -- --run
npm.cmd run lint
npm.cmd run build
```