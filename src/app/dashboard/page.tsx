
"use client";

import { useEffect, useState } from 'react';
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
  Satellite as SatelliteIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Dashboard() {
  const [activeObjects, setActiveObjects] = useState(0);
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [filterType, setFilterType] = useState<'ALL' | 'SATELLITE' | 'DEBRIS'>('ALL');
  const [selectedDot, setSelectedDot] = useState<any>(null);
  
  const [dots, setDots] = useState<{
    tracking: { top: string; left: string; delay: string; id: string; name: string; type: string }[];
    debris: { top: string; left: string; id: string; name: string }[];
  }>({ tracking: [], debris: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveObjects(prev => {
        if (prev >= 24892) return 24892;
        return prev + 123;
      });
    }, 20);

    const tracking = [...Array(20)].map((_, i) => ({
      id: `SAT-${1000 + i}`,
      name: `STARLINK-${1200 + i}`,
      type: 'Satellite',
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`,
      delay: `${Math.random() * 2}s`
    }));
    const debris = [...Array(15)].map((_, i) => ({
      id: `DEB-${5000 + i}`,
      name: `DEBRIS-200${i}-A`,
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
    }));
    setDots({ tracking, debris });

    return () => clearInterval(interval);
  }, []);

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
          <Card key={i} className="glass-panel border-none">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-lg bg-background/50", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="bg-white/5 text-xs">+2.4%</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 font-headline">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Orbital Map Visualization */}
        <Card className="lg:col-span-2 glass-panel border-none min-h-[500px] relative overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
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
                className="h-8 bg-white/5"
                onClick={() => setViewMode(viewMode === '2D' ? '3D' : '2D')}
              >
                {viewMode === '3D' ? '2D VIEW' : '3D VIEW'}
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="h-8 bg-white/5">FILTERS</Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 bg-card border-white/10 p-2">
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
                      <SatelliteIcon className="w-3 h-3 mr-2" /> Satellites Only
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("justify-start text-xs", filterType === 'DEBRIS' && "bg-white/10")}
                      onClick={() => setFilterType('DEBRIS')}
                    >
                      <Box className="w-3 h-3 mr-2" /> Debris Only
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent className="flex-1 relative flex items-center justify-center bg-black/20 rounded-b-xl overflow-hidden">
            <div 
              className={cn(
                "relative w-[340px] h-[340px] md:w-[450px] md:h-[450px] transition-all duration-1000",
                viewMode === '3D' ? "perspective-[1000px] rotate-x-[45deg] rotate-z-[20deg]" : ""
              )}
            >
              {/* Earth */}
              <div className="absolute inset-0 m-auto w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-blue-600 via-blue-900 to-black rounded-full shadow-[0_0_80px_rgba(37,99,235,0.4)] animate-pulse-slow">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
              </div>
              
              {/* Orbital Rings */}
              <div className="absolute inset-0 m-auto w-full h-full orbital-ring rotate-[20deg]" />
              <div className="absolute inset-0 m-auto w-[85%] h-[85%] orbital-ring rotate-[-15deg]" />
              <div className="absolute inset-0 m-auto w-[70%] h-[70%] orbital-ring rotate-[45deg]" />
              
              {/* Tracking dots */}
              {(filterType === 'ALL' || filterType === 'SATELLITE') && dots.tracking.map((dot, i) => (
                <div 
                  key={dot.id} 
                  className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-ping cursor-pointer hover:scale-150 transition-transform"
                  style={{
                    top: dot.top,
                    left: dot.left,
                    animationDelay: dot.delay
                  }}
                  onClick={() => setSelectedDot(dot)}
                />
              ))}
              
              {/* Debris dots */}
              {(filterType === 'ALL' || filterType === 'DEBRIS') && dots.debris.map((dot, i) => (
                <div 
                  key={dot.id} 
                  className="absolute w-1 h-1 bg-accent rounded-full opacity-60 cursor-pointer hover:scale-150 transition-transform"
                  style={{
                    top: dot.top,
                    left: dot.left,
                  }}
                  onClick={() => setSelectedDot({ ...dot, type: 'Debris' })}
                />
              ))}
            </div>
            
            {/* Selection Card */}
            {selectedDot && (
              <div className="absolute bottom-6 left-6 p-4 glass-panel rounded-lg max-w-[200px] animate-in slide-in-from-bottom-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", selectedDot.type === 'Debris' ? 'bg-accent' : 'bg-primary')} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">{selectedDot.type}</span>
                  </div>
                  <button onClick={() => setSelectedDot(null)} className="text-muted-foreground hover:text-white">×</button>
                </div>
                <h4 className="text-xs font-bold truncate">{selectedDot.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">ID: {selectedDot.id}</p>
                <Button size="sm" variant="link" className="p-0 h-auto text-[10px] text-primary mt-2">VIEW ANALYTICS</Button>
              </div>
            )}

            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <div className="px-3 py-1.5 glass-panel rounded-md text-[10px] font-bold">ZOOM: 24,000 KM</div>
              <div className="px-3 py-1.5 glass-panel rounded-md text-[10px] font-bold uppercase text-green-500">MODE: {viewMode}</div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts Sidebar */}
        <div className="space-y-6">
          <Card className="glass-panel border-none">
            <CardHeader>
              <CardTitle className="text-md font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                High Risk Conjunctions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Starlink-1422', id: '45621', risk: 'High', prob: '1.2e-3', time: '14m 22s' },
                { name: 'Iridium-32', id: '25412', risk: 'Medium', prob: '4.5e-5', time: '2h 45m' },
                { name: 'Cosmos-2251', id: '23561', risk: 'Low', prob: '1.1e-6', time: '5h 12m' },
              ].map((alert, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{alert.name}</span>
                    <Badge variant={alert.risk === 'High' ? 'destructive' : 'secondary'} className="text-[10px] px-1.5 py-0 h-4">
                      {alert.risk}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-muted-foreground mt-1">
                    <span>ID: {alert.id}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> P: {alert.prob}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">T-Minus</span>
                    <span className="text-xs font-mono text-primary font-bold">{alert.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-white mt-2">
                View All Alerts <ArrowUpRight className="ml-2 w-3 h-3" />
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none bg-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Info className="w-4 h-4" />
                Orbital Health Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Solar activity is currently <span className="text-white font-medium">Moderate</span>. Atmospheric drag is normal for LEO objects. 4 new debris fragments detected in Geo-Transfer orbits.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
