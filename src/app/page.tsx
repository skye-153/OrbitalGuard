
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, Shield, Globe, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 h-20 flex items-center justify-between border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight font-headline">ORBITAL<span className="text-primary">GUARD</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="/dashboard/registry" className="text-sm font-medium hover:text-primary transition-colors">Registry</Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href="/dashboard">Launch Console</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-6 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              REAL-TIME ORBITAL TRACKING ACTIVE
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6 leading-tight">
              Safeguarding the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Orbital Frontier</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              The world's most advanced satellite traffic management system. Monitor, track, and predict collision risks with precision telemetry and interactive 3D visualizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Enter Dashboard <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg font-semibold">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Globe className="text-primary group-hover:text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Live Orbital Registry</h3>
                <p className="text-muted-foreground">Comprehensive database of every tracked object in Earth's orbit, from satellites to space debris.</p>
              </div>
              <div className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Shield className="text-primary group-hover:text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Collision Avoidance</h3>
                <p className="text-muted-foreground">Automated alert system providing real-time notifications for high-risk orbital conjunction events.</p>
              </div>
              <div className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <BarChart3 className="text-primary group-hover:text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
                <p className="text-muted-foreground">Interactive visualization tools to analyze orbital parameters, launch trends, and debris concentration.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="text-primary w-6 h-6" />
            <span className="text-lg font-bold font-headline">ORBITAL GUARD</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Orbital Guard Systems. All orbital rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
