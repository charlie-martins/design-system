# @charlie-martins/design-system

Centralised design system for Charlie Martins' projects — shared React components, styled with Tailwind CSS + shadcn/ui, published as a private npm package.

The repo itself doubles as its own documentation: `npm run dev` runs a single-page showcase (sidebar nav, search, live components, a real light/dark toggle) instead of a separate tool like Storybook — the page *is* the deliverable.

## Development

```bash
npm install
npm run dev   # showcase page at localhost:5173
```

## Adding a component

Components live under `src/components/ui/` (added via `npx shadcn add <name>`, which respects `components.json`) or hand-written under `src/components/` for anything else (e.g. `theme-provider.tsx`).

1. Add the component.
2. Export it from `src/index.ts` so it's part of the published package.
3. Add it to the showcase: a nav entry in `nav` and a `<Section>` in `src/App.tsx`.

## Building

```bash
npm run build
```

Outputs ESM + CJS bundles and type declarations to `dist/`. React and the component-level dependencies (`radix-ui`, `lucide-react`, `class-variance-authority`, `cn`) stay external — check `vite.config.ts`'s `rollupOptions.external` when adding a new runtime dependency, or it'll get bundled into the package instead of installed alongside it.

## Using this package in another project

Components use Tailwind utility classes rather than a compiled stylesheet — consuming projects must scan this package's `dist/` output with their own Tailwind config:

```js
// tailwind.config.js of the consuming project
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@charlie-martins/design-system/dist/**/*.{js,mjs}',
  ],
};
```

```bash
npm install @charlie-martins/design-system
```

```tsx
import { Button, ThemeProvider } from '@charlie-martins/design-system';
```

## Publishing

This is a **private, scoped** npm package (`publishConfig.access: "restricted"`). Publishing requires an npm account with access to the `@charlie-martins` scope (npm Pro/Teams for private scoped packages, or an npm org).

```bash
npm version patch|minor|major
npm publish
```

`prepublishOnly` runs the build automatically before publish.
