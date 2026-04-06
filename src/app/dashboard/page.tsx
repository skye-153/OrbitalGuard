
"use client";

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Trash2, 
  AlertTriangle, 
  Activity, 
  ArrowUpRight, 
  Map as MapIcon, 
  Info,
  Layers,
  Box,
  Satellite as SatelliteIcon,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type OrbitalObject = {
  id: string;
  name: string;
  type: 'Satellite' | 'Debris';
  top: string;
  left: string;
  delay: string;
  altitude: number;
  status: string;
  speed: string;
};

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [filterType, setFilterType] = useState<'ALL' | 'SATELLITE' | 'DEBRIS'>('ALL');
  const [selectedDot, setSelectedDot] = useState<OrbitalObject | null>(null);
  const [allDots, setAllDots] = useState<OrbitalObject[]>([]);

  useEffect(() => {
    // Generate random dots once on mount
    const generated: OrbitalObject[] = [
      ...Array(40).fill(0).map((_, i) => ({
        id: `SAT-${1000 + i}`,
        name: `STARLINK-${1200 + i}`,
        type: 'Satellite' as const,
        top: `${15 + Math.random() * 70}%`,
        left: `${15 + Math.random() * 70}%`,
        delay: `${Math.random() * 3}s`,
        altitude: 60 + Math.random() * 100,
        status: 'Active',
        speed: '27,000 km/h'
      })),
      ...Array(30).fill(0).map((_, i) => ({
        id: `DEB-${5000 + i}`,
        name: `FRAGMENT-${2000 + i}-X`,
        type: 'Debris' as const,
        top: `${10 + Math.random() * 80}%`,
        left: `${10 + Math.random() * 80}%`,
        delay: '0s',
        altitude: 20 + Math.random() * 40,
        status: 'Uncontrolled',
        speed: '28,500 km/h'
      }))
    ];
    setAllDots(generated);
  }, []);

  const filteredDots = useMemo(() => {
    if (filterType === 'ALL') return allDots;
    return allDots.filter(d => d.type.toUpperCase() === filterType);
  }, [allDots, filterType]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Satellites', value: '8,421', icon: Rocket, color: 'text-primary' },
          { label: 'Debris Tracked', value: '16,471', icon: Trash2, color: 'text-orange-500' },
          { label: 'Pending Risks', value: '12', icon: AlertTriangle, color: 'text-destructive' },
          { label: 'Signal Quality', value: '99.4%', icon: Activity, color: 'text-green-500' },
        ].map((stat, i) => (
          <Card key={i} className="glass-panel border-none shadow-xl hover:bg-white/5 transition-colors">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-lg bg-background/50", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="bg-white/5 text-[10px]">+2.4%</Badge>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 font-headline">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Orbital Map Visualization */}
        <Card className="lg:col-span-2 glass-panel border-none min-h-[600px] relative overflow-hidden flex flex-col group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 z-10">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary" />
                Orbital Live Feed
              </CardTitle>
              <p className="text-xs text-muted-foreground">LEO/MEO/GEO Real-time Projection</p>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={viewMode === '3D' ? 'secondary' : 'outline'} 
                className={cn("h-8 transition-all", viewMode === '3D' ? "bg-primary text-white" : "bg-white/5")}
                onClick={() => setViewMode(viewMode === '2D' ? '3D' : '2D')}
              >
                <Maximize2 className="w-3 h-3 mr-2" />
                {viewMode === '3D' ? '3D ACTIVE' : '3D VIEW'}
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="h-8 bg-white/5 hover:bg-white/10">
                    <Layers className="w-3 h-3 mr-2" />
                    FILTERS
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 bg-card border-white/10 p-2 shadow-2xl">
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start text-xs", filterType === 'ALL' && "bg-white/10")}
                      onClick={() => setFilterType('ALL')}
                    >
                      <Layers className="w-3 h-3 mr-2" /> All Objects
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start text-xs", filterType === 'SATELLITE' && "bg-white/10")}
                      onClick={() => setFilterType('SATELLITE')}
                    >
                      <SatelliteIcon className="w-3 h-3 mr-2 text-primary" /> Satellites
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start text-xs", filterType === 'DEBRIS' && "bg-white/10")}
                      onClick={() => setFilterType('DEBRIS')}
                    >
                      <Box className="w-3 h-3 mr-2 text-accent" /> Debris
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent className="flex-1 relative flex items-center justify-center bg-[#0a0c10] rounded-b-xl overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div 
              className={cn(
                "relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] transition-all duration-1000 ease-in-out",
                viewMode === '3D' ? "perspective-[1200px] rotate-x-[55deg] rotate-z-[15deg] scale-110" : ""
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Earth */}
              <div 
                className="absolute inset-0 m-auto w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-500 via-blue-900 to-black rounded-full shadow-[0_0_100px_rgba(37,99,235,0.3)] animate-pulse-slow"
                style={{ transform: viewMode === '3D' ? 'translateZ(-20px)' : 'none' }}
              >
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute inset-0 rounded-full border border-blue-400/20" />
              </div>
              
              {/* Orbital Rings */}
              <div className="absolute inset-0 m-auto w-full h-full orbital-ring border-primary/10 rotate-[20deg]" />
              <div className="absolute inset-0 m-auto w-[85%] h-[85%] orbital-ring border-accent/10 rotate-[-15deg]" />
              <div className="absolute inset-0 m-auto w-[70%] h-[70%] orbital-ring border-primary/20 rotate-[45deg]" />
              
              {/* Objects */}
              {filteredDots.map((dot) => (
                <div 
                  key={dot.id} 
                  className={cn(
                    "absolute rounded-full cursor-pointer hover:scale-150 transition-all z-30",
                    dot.type === 'Satellite' ? 'w-1.5 h-1.5 bg-primary animate-pulse' : 'w-1 h-1 bg-accent/70'
                  )}
                  style={{
                    top: dot.top,
                    left: dot.left,
                    animationDelay: dot.delay,
                    transform: viewMode === '3D' ? `translateZ(${dot.altitude}px)` : 'none',
                    boxShadow: dot.type === 'Satellite' ? '0 0 8px rgba(82, 130, 224, 0.6)' : 'none'
                  }}
                  onClick={() => setSelectedDot(dot)}
                />
              ))}
            </div>
            
            {/* Selection Card Overlay */}
            {selectedDot && (
              <div className="absolute bottom-8 left-8 p-5 glass-panel rounded-xl w-64 animate-in fade-in slide-in-from-bottom-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 border-primary/20">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", selectedDot.type === 'Debris' ? 'bg-accent' : 'bg-primary')} />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">{selectedDot.type}</span>
                  </div>
                  <button onClick={() => setSelectedDot(null)} className="text-muted-foreground hover:text-white transition-colors">×</button>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{selectedDot.name}</h4>
                <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
                  <div className="p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-muted-foreground block uppercase">Altitude</span>
                    <span className="font-mono text-white">~{Math.round(selectedDot.altitude * 10)} km</span>
                  </div>
                  <div className="p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-muted-foreground block uppercase">Velocity</span>
                    <span className="font-mono text-white">{selectedDot.speed}</span>
                  </div>
                </div>
                <Button size="sm" variant="link" className="p-0 h-auto text-[10px] text-primary mt-4 hover:no-underline font-bold">
                  FULL TELEMETRY DATA <ArrowUpRight className="ml-1 w-3 h-3" />
                </Button>
              </div>
            )}

            <div className="absolute top-8 right-8 flex flex-col gap-2">
              <div className="px-4 py-2 glass-panel rounded-lg text-[10px] font-bold border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SYNC: 0.04ms
              </div>
              <div className="px-4 py-2 glass-panel rounded-lg text-[10px] font-bold uppercase text-primary border-primary/20">
                MODE: {viewMode}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts Sidebar */}
        <div className="space-y-6">
          <Card className="glass-panel border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Real-time Risk Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Starlink-1422', id: '45621', risk: 'High', prob: '1.2e-3', time: '14m 22s' },
                { name: 'Iridium-32', id: '25412', risk: 'Medium', prob: '4.5e-5', time: '2h 45m' },
                { name: 'Cosmos-2251', id: '23561', risk: 'Low', prob: '1.1e-6', time: '5h 12m' },
                { name: 'GPS-III-SV04', id: '46825', risk: 'Nominal', prob: '9.2e-9', time: '12h 04m' },
              ].map((alert, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1 hover:bg-white/10 transition-all cursor-pointer group hover:translate-x-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm group-hover:text-primary transition-colors">{alert.name}</span>
                    <Badge variant={alert.risk === 'High' ? 'destructive' : alert.risk === 'Nominal' ? 'outline' : 'secondary'} className="text-[10px] px-1.5 py-0 h-4">
                      {alert.risk}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-muted-foreground mt-1">
                    <span className="font-mono">ID: {alert.id}</span>
                    <span className="flex items-center gap-1 font-mono text-primary"><Activity className="w-3 h-3" /> {alert.prob}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">T-Minus Conjunction</span>
                    <span className="text-xs font-mono text-primary font-bold">{alert.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-white mt-2 font-bold" asChild>
                <a href="/dashboard/alerts">
                  Open Collision Center <ArrowUpRight className="ml-2 w-3 h-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none bg-accent/10 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-accent" />
                Orbital Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Solar wind activity at <span className="text-white font-medium">422 km/s</span>. 
                  Atmospheric drag increased by <span className="text-accent font-bold">12%</span> for objects in LEO-400.
                </p>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[65%]" />
                </div>
                <p className="text-[10px] text-muted-foreground italic">Last update: 2 minutes ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

