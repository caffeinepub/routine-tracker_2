import { SiCaffeine } from 'react-icons/si';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'routine-tracker'
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Routine Tracker
                </h1>
                <p className="text-sm text-muted-foreground">Build better habits, one day at a time</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight mb-3 text-foreground">
              Master Your Daily Routine
            </h2>
            <p className="text-lg text-muted-foreground">
              Track your habits, stay consistent, and let our AI assistant help you build a better routine.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <img
              src="/assets/generated/routine-hero.dim_1200x600.png"
              alt="Routine Hero"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Routine Tracker. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Built with <SiCaffeine className="text-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
