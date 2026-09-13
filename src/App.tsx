import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { ModeToggle } from './components/mode-toggle';
import { PaletteSwitcher } from './components/palette-switcher';
import { ThemeProvider } from './components/theme-provider';

const colorTokens = [
  { name: 'background', var: '--background' },
  { name: 'foreground', var: '--foreground' },
  { name: 'card', var: '--card' },
  { name: 'popover', var: '--popover' },
  { name: 'primary', var: '--primary' },
  { name: 'brand-ink', var: '--brand-ink' },
  { name: 'secondary', var: '--secondary' },
  { name: 'muted', var: '--muted' },
  { name: 'accent', var: '--accent' },
  { name: 'destructive', var: '--destructive' },
  { name: 'border', var: '--border' },
];

const spacingTokens = ['1', '2', '3', '4', '6', '8', '12', '16'];

const typeSamples = [
  { label: 'Heading', className: 'text-2xl font-semibold tracking-tight' },
  { label: 'Subheading', className: 'text-lg font-medium' },
  { label: 'Body', className: 'text-[15px]' },
  { label: 'Small / label', className: 'text-xs font-mono text-muted-foreground' },
];

const nav = [
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
    ],
  },
];

function GroupEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-brand-ink mt-12 mb-2 font-mono text-xs tracking-wide first:mt-0">
      {children}
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-8 first:border-t-0 first:pt-0 scroll-mt-20">
      <h2 className="mb-6 text-xl font-medium">{title}</h2>
      {children}
    </section>
  );
}

function App() {
  const [query, setQuery] = useState('');

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
      <div className="bg-background text-foreground min-h-screen">
        {/* TOP BAR */}
        <header className="border-border bg-background/90 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-3 backdrop-blur">
          <div className="font-mono text-sm font-medium">
            <span className="text-brand-ink">{'{}'}</span> heyitscharlie / design-system
          </div>
          <div className="flex items-center gap-2">
            <PaletteSwitcher />
            <ModeToggle />
          </div>
        </header>

        <div className="flex">
          {/* SIDEBAR — pinned to the left edge */}
          <aside className="border-border sticky top-[49px] h-[calc(100vh-49px)] w-52 shrink-0 overflow-y-auto border-r px-4 py-6">
            <div className="relative mb-5">
              <Search className="text-muted-foreground pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="h-7 pl-7 text-xs"
              />
            </div>
            <nav className="flex flex-col gap-5">
              {filteredNav.map((group) => (
                <div key={group.group}>
                  <div className="text-muted-foreground mb-2 font-mono text-[11px] uppercase tracking-wide">
                    {group.group}
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="hover:bg-muted block rounded-md px-2 py-1 text-sm text-foreground/80 hover:text-foreground"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {filteredNav.length === 0 && (
                <div className="text-muted-foreground text-sm">No matches</div>
              )}
            </nav>
          </aside>

          {/* CONTENT — fills the remaining width, centered within it */}
          <main className="min-w-0 flex-1 px-8 py-12">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12">
                <h1 className="text-3xl font-semibold tracking-tight">Design System</h1>
                <p className="text-muted-foreground mt-3 max-w-xl text-[15px]">
                  Shared React components for future projects — built on Tailwind
                  CSS variables and shadcn/ui primitives. This page is the whole
                  deliverable: the live components, styled by the real tokens
                  below, in whichever theme you prefer.
                </p>
              </div>

              <GroupEyebrow>01 — foundations</GroupEyebrow>

              <Section id="color" title="Color">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {colorTokens.map((token) => (
                    <div key={token.name} className="flex flex-col gap-2">
                      <div
                        className="border-border h-14 rounded-md border"
                        style={{ background: `var(${token.var})` }}
                      />
                      <div className="font-mono text-[11px] text-muted-foreground">{token.name}</div>
                    </div>
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
                      <span className={sample.className}>The quick brown fox jumps.</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="spacing" title="Spacing">
                <div className="flex flex-wrap items-end gap-4">
                  {spacingTokens.map((step) => (
                    <div key={step} className="flex flex-col items-center gap-2">
                      <div className="bg-primary" style={{ width: `calc(var(--spacing) * ${step})`, height: '10px' }} />
                      <div className="font-mono text-[11px] text-muted-foreground">{step}</div>
                    </div>
                  ))}
                </div>
              </Section>

              <GroupEyebrow>02 — components</GroupEyebrow>

              <Section id="button" title="Button">
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Default</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
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
            </div>
          </main>
        </div>

        <footer className="border-border text-muted-foreground border-t px-6 py-8 text-left font-mono text-xs">
          @charlie-martins/design-system
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
