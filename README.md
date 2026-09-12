# @charlie-martins/design-system

Centralised design system for Charlie Martins' projects — shared React components, built and documented with [Storybook](https://storybook.js.org/), styled with [Tailwind CSS](https://tailwindcss.com/), and published as a private npm package.

## Development

```bash
npm install
npm run dev         # demo app at localhost:5173
npm run storybook   # component explorer at localhost:6006
```

## Adding a component

Each component lives in its own folder under `src/components/<Name>/`:

```
src/components/Button/
  Button.tsx          # implementation
  Button.stories.tsx  # Storybook stories
  index.ts            # public exports
```

Export it from `src/index.ts` so it's part of the published package.

## Building

```bash
npm run build
```

Outputs ESM + CJS bundles and type declarations to `dist/`.

## Using this package in another project

This package ships **unstyled-by-default Tailwind utility classes** rather than a compiled stylesheet — consuming projects must scan this package's `dist/` output with their own Tailwind config:

```js
// tailwind.config.js of the consuming project
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@charlie-martins/design-system/dist/**/*.{js,mjs}',
  ],
  // ...
};
```

Then install and import as normal:

```bash
npm install @charlie-martins/design-system
```

```tsx
import { Button } from '@charlie-martins/design-system';
```

## Publishing

This is a **private, scoped** npm package (`publishConfig.access: "restricted"`). Publishing requires an npm account with access to the `@charlie-martins` scope (npm Pro/Teams for private scoped packages, or an npm org).

```bash
npm version patch|minor|major
npm publish
```

`prepublishOnly` runs the build automatically before publish.
