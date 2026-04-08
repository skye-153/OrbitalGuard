
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info, Bell, ShieldAlert, Radio, ArrowRight, Zap, RefreshCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export default function AlertsPage() {
  const [analyzingAlert, setAnalyzingAlert] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    if (analyzingAlert) {
      setAnalysisProgress(0);
      const timer = setInterval(() => {
        setAnalysisProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          let diff = Math.random() * 20;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [analyzingAlert]);

  const handleAnalyze = (title: string) => {
    setAnalyzingAlert(title);
    toast({
      title: "Analysis Initialized",
      description: `Calculating conjunction probability for: ${title}`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Telemetry Refreshed",
      description: "Sensor data and orbital positions updated to latest epoch.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Conjunction Monitoring</h1>
          <p className="text-muted-foreground text-sm mt-1">High-fidelity collision avoidance tracking and risk assessment.</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="bg-white/5 border-white/10 gap-2 h-10 px-4 rounded-xl">
          <RefreshCcw className="w-4 h-4" /> Update Sensors
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-panel border-none bg-destructive/10 border-destructive/20 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-destructive" />
                Critical Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-5xl font-bold text-destructive font-headline">04</h2>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">Active conjunctions with P &gt; 10^-4 in next 24h.</p>
            </CardContent>
          </Card>
          <Card className="glass-panel border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 text-primary">
                <Bell className="w-4 h-4" />
                Network Traffic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-5xl font-bold font-headline">22</h2>
              <p className="text-xs text-muted-foreground mt-3">New orbital entries identified in the last cycle.</p>
            </CardContent>
          </Card>
          <Card className="glass-panel border-none shadow-lg border-orange-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 text-orange-500">
                <Radio className="w-4 h-4" />
                Sensor Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-5xl font-bold font-headline">99.2%</h2>
              <p className="text-xs text-muted-foreground mt-3">Tracking network global coverage and signal integrity.</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Feed */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Active System Alerts
            </h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-white/10 text-muted-foreground">ALL</Badge>
              <Badge variant="outline" className="border-destructive/30 text-destructive">CRITICAL</Badge>
            </div>
          </div>
          
          {[
            { 
              title: 'High Risk Conjunction: STARLINK-1422 vs DEBRIS 2004-03A', 
              time: '12 minutes ago', 
              severity: 'Critical',
              prob: '0.0012',
              desc: 'Objects approaching distance of 142m in LEO. Maneuver suggested for Starlink-1422 to increase radial separation.'
            },
            { 
              title: 'Maneuver Warning: COSMOS-2251 Fragments', 
              time: '1 hour ago', 
              severity: 'High',
              prob: '0.00045',
              desc: 'Recent fragment decay detected. Predicted orbital shift of 4.2km in next 48 hours due to atmospheric density spike.'
            },
            { 
              title: 'New Object Registered: SPACE-X-F9-FLIGHT-22', 
              time: '3 hours ago', 
              severity: 'Normal',
              prob: 'N/A',
              desc: 'Successfully deployed 22 Starlink satellites. Orbital IDs being assigned by NORAD 18th Space Control Squadron.'
            },
            { 
              title: 'Solar Weather Alert: M-Class Flare Detected', 
              time: '5 hours ago', 
              severity: 'Information',
              prob: 'N/A',
              desc: 'Expected increase in atmospheric drag for all LEO objects below 450km. Satellite operators should monitor decay rates.'
            },
            { 
              title: 'Geostationary Drift Detected: EUTELSAT-7B', 
              time: 'Yesterday', 
              severity: 'High',
              prob: 'N/A',
              desc: 'Corrective station-keeping thrusters failed to ignite. Monitoring longitude drift in GEO slot 7.0°E.'
            },
            { 
              title: 'Collision Warning: ONEWEB-0412 vs DEBRIS-X', 
              time: '2 hours ago', 
              severity: 'Critical',
              prob: '0.0034',
              desc: 'Collision probability exceeded safety threshold. Emergency station-keeping maneuver authorized.'
            }
          ].map((alert, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 hover:border-white/20 transition-all flex flex-col md:flex-row gap-6 group">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all",
                alert.severity === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20 group-hover:bg-destructive/20' :
                alert.severity === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20 group-hover:bg-orange-500/20' :
                alert.severity === 'Information' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 group-hover:bg-blue-500/20' :
                'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20'
              )}>
                {alert.severity === 'Critical' ? <ShieldAlert className="w-7 h-7" /> : <Info className="w-7 h-7" />}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-lg group-hover:text-white transition-colors">{alert.title}</h4>
                    <span className="text-xs text-muted-foreground font-mono">{alert.time}</span>
                  </div>
                  <Badge className={cn(
                    "uppercase text-[9px] font-bold tracking-widest px-3 py-1",
                    alert.severity === 'Critical' ? 'bg-destructive shadow-lg shadow-destructive/20' :
                    alert.severity === 'High' ? 'bg-orange-600' :
                    alert.severity === 'Information' ? 'bg-blue-600' :
                    'bg-secondary'
                  )}>{alert.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{alert.desc}</p>
                {alert.prob !== 'N/A' && (
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 p-4 rounded-xl bg-black/40 border border-white/5 shadow-inner">
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Collision Probability</span>
                      <span className={cn("text-lg font-mono font-bold", alert.severity === 'Critical' ? 'text-destructive' : 'text-primary')}>{alert.prob}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Relative Velocity</span>
                      <span className="text-lg font-mono font-bold text-white">14.8 km/s</span>
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-primary text-xs font-bold hover:no-underline group"
                      onClick={() => handleAnalyze(alert.title)}
                    >
                      Analyze Telemetry <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Dialog */}
      <Dialog open={!!analyzingAlert} onOpenChange={(open) => !open && setAnalyzingAlert(null)}>
        <DialogContent className="bg-card border-white/10 sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary animate-pulse" /> Telemetry Analysis Protocol
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-8">
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-2">TARGET: {analyzingAlert}</p>
              {analysisProgress < 100 ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-primary">
                    <span>PROCESSING RADAR PACKETS...</span>
                    <span>{Math.round(analysisProgress)}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between text-xs font-bold text-green-500">
                    <span>ANALYSIS COMPLETE</span>
                    <span>100%</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Predicted Miss Distance</p>
                      <p className="font-mono text-xl font-bold mt-1 text-white">42.8 m <span className="text-destructive text-sm ml-2">↓ High Risk</span></p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Required Avoidance Delta-V</p>
                      <p className="font-mono text-xl font-bold mt-1 text-white">0.05 m/s</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Time to Closest Approach</p>
                      <p className="font-mono text-xl font-bold mt-1 text-white">00:12:44</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Confidence Level</p>
                      <p className="font-mono text-xl font-bold mt-1 text-white">99.8%</p>
                    </div>
                  </div>
                  
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl">
                    <h4 className="font-bold text-destructive text-sm mb-1">Maneuver Recommended</h4>
                    <p className="text-xs text-muted-foreground">Initiate radial burn sequence to achieve safe minimum separation distance of 1.5km.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

