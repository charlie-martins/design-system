import type { VariantProps } from 'class-variance-authority';
import type { TypographyVariant } from '../design-system/typography';
import type { buttonVariants } from '../design-system/ui/button';

/** Content for the showcase page (App.tsx) only — which tokens/variants to
 * display, in what order, under what label. Kept separate from App.tsx so
 * that file stays composition-only: no data, no design tokens, just
 * layout. This is curated display data (what to demo, and how to label
 * it), not a source of truth for the tokens themselves — those live in
 * src/themes/*.css and src/components/typography.tsx. */

export interface ColorToken {
  name: string;
  var: string;
}

export const colorTokens: ColorToken[] = [
  { name: 'background', var: '--background' },
  { name: 'foreground', var: '--foreground' },
  { name: 'card', var: '--card' },
  { name: 'popover', var: '--popover' },
  { name: 'primary', var: '--primary' },
  { name: 'secondary', var: '--secondary' },
  { name: 'muted', var: '--muted' },
  { name: 'accent', var: '--accent' },
  { name: 'destructive', var: '--destructive' },
  { name: 'border', var: '--border' },
];

/** A curated subset of Tailwind's spacing scale (`--spacing` is defined by
 * Tailwind itself, not this design system) — just enough steps to show the
 * scale's progression, not an exhaustive list. */
export const spacingTokens: string[] = ['1', '2', '3', '4', '6', '8', '12', '16'];

export interface TypeSample {
  label: string;
  variant: TypographyVariant;
}

export const typeSamples: TypeSample[] = [
  { label: 'h1', variant: 'h1' },
  { label: 'h2', variant: 'h2' },
  { label: 'h3', variant: 'h3' },
  { label: 'h4', variant: 'h4' },
  { label: 'subheading', variant: 'subheading' },
  { label: 'body', variant: 'body' },
  { label: 'label', variant: 'label' },
];

export interface ButtonVariantSample {
  variant: NonNullable<VariantProps<typeof buttonVariants>['variant']>;
  label: string;
}

export const buttonVariantSamples: ButtonVariantSample[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'destructive', label: 'Destructive' },
  { variant: 'link', label: 'Link' },
];

export interface ButtonSizeSample {
  size: NonNullable<VariantProps<typeof buttonVariants>['size']>;
  label: string;
}

export const buttonSizeSamples: ButtonSizeSample[] = [
  { size: 'sm', label: 'Small' },
  { size: 'default', label: 'Default' },
  { size: 'lg', label: 'Large' },
];

export interface NavGroup {
  group: string;
  items: { id: string; label: string }[];
}

export const nav: NavGroup[] = [
  {
    group: 'Foundations',
    items: [
      { id: 'color', label: 'Color' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'input', label: 'Input' },
      { id: 'search-input', label: 'Search Input' },
    ],
  },
];

/** Flattened once at module load — a stable reference, safe to pass
 * straight into `useActiveSection`'s effect dependency array. */
export const navSectionIds: string[] = nav.flatMap((group) => group.items.map((item) => item.id));
