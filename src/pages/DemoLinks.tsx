import Navigation from '@/components/layout/Navigation';
import { InteractiveHoverLinks } from '@/components/ui/interactive-hover-links';

export default function DemoLinks() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-24">
        <InteractiveHoverLinks />
      </main>
    </div>
  );
}
