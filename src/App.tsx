import { useMemo, useState } from 'react';
import { Button } from './design-system/ui/button';
import { Input } from './design-system/ui/input';
import { SearchInput } from './design-system/search-input';
import { ModeToggle } from './design-system/mode-toggle';
import { PaletteSwitcher } from './design-system/palette-switcher';
import { ThemeProvider } from './design-system/theme-provider';
import { Typography } from './design-system/typography';
import { ColorSwatch } from './showcase/components/color-swatch';
import { GroupEyebrow } from './showcase/components/group-eyebrow';
import { Section } from './showcase/components/section';
import { ShowcaseSidebar } from './showcase/components/showcase-sidebar';
import { CollapsedBrand } from './showcase/components/collapsed-brand';
import { FaviconSync } from './showcase/components/favicon-sync';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './showcase/ui/sidebar';
import { useActiveSection } from './showcase/hooks/use-active-section';
import {
  buttonSizeSamples,
  buttonVariantSamples,
  colorTokens,
  nav,
  navSectionIds,
  spacingTokens,
  typeSamples,
} from './showcase/content';

/** The showcase page — composition and layout only. No design tokens, no
 * content data: those live in src/showcase/content.ts and src/themes/. */
function App() {
  const [query, setQuery] = useState('');
  const activeId = useActiveSection(navSectionIds);

  const filteredNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nav;
    return nav
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <ThemeProvider defaultMode="system" defaultPalette="mustard" storageKey="design-system-theme">
      <FaviconSync />
      <SidebarProvider>
        <ShowcaseSidebar query={query} onQueryChange={setQuery} groups={filteredNav} activeId={activeId} />

        <SidebarInset>
          <header className="border-border bg-background/90 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <CollapsedBrand />
            </div>
            <div className="flex items-center gap-2">
              <PaletteSwitcher />
              <ModeToggle />
            </div>
          </header>

          <main className="min-w-0 flex-1 px-8 py-12">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12">
                <Typography variant="h1">Design System</Typography>
                <Typography variant="body" className="text-muted-foreground mt-3 max-w-xl">
                  Shared React components for future projects — built on Tailwind
                  CSS variables and shadcn/ui primitives. This page is the whole
                  deliverable: the live components, styled by the real tokens
                  below, in whichever theme you prefer.
                </Typography>
              </div>

              <GroupEyebrow>01 — foundations</GroupEyebrow>

              <Section id="color" title="Color">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {colorTokens.map((token) => (
                    <ColorSwatch key={token.name} token={token} />
                  ))}
                </div>
              </Section>

              <Section id="typography" title="Typography">
                <div className="flex flex-col gap-4">
                  {typeSamples.map((sample) => (
                    <div key={sample.label} className="flex items-baseline gap-4">
                      <span className="text-muted-foreground w-28 shrink-0 font-mono text-[11px]">
                        {sample.label}
                      </span>
                      <Typography variant={sample.variant}>
                        "I am serious, and don't call me Shirley."
                      </Typography>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="spacing" title="Spacing">
                <div className="flex flex-col gap-3">
                  {spacingTokens.map((step) => (
                    <div key={step} className="flex items-center gap-4">
                      <span className="text-muted-foreground w-6 shrink-0 font-mono text-[11px]">{step}</span>
                      <div className="bg-primary h-2.5" style={{ width: `calc(var(--spacing) * ${step})` }} />
                    </div>
                  ))}
                </div>
              </Section>

              <GroupEyebrow>02 — components</GroupEyebrow>

              <Section id="button" title="Button">
                <div className="flex flex-wrap items-center gap-3">
                  {buttonVariantSamples.map((sample) => (
                    <Button key={sample.variant} variant={sample.variant}>
                      {sample.label}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {buttonSizeSamples.map((sample) => (
                    <Button key={sample.size} size={sample.size}>
                      {sample.label}
                    </Button>
                  ))}
                  <Button disabled>Disabled</Button>
                </div>
              </Section>

              <Section id="input" title="Input">
                <div className="flex max-w-xs flex-col gap-3">
                  <Input placeholder="Email address" type="email" />
                  <Input placeholder="Disabled" disabled />
                  <Input placeholder="Invalid" aria-invalid />
                </div>
              </Section>

              <Section id="search-input" title="Search Input">
                <div className="max-w-xs">
                  <SearchInput placeholder="Search" />
                </div>
              </Section>
            </div>
          </main>

          <footer className="border-border text-muted-foreground border-t px-6 py-8 text-left font-mono text-xs">
            @charlie-martins/design-system
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
