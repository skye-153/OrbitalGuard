
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, Bell, ShieldAlert, Radio, ArrowRight } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-panel border-none bg-destructive/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-destructive" />
                Critical Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold text-destructive font-headline">02</h2>
              <p className="text-xs text-muted-foreground mt-2">Active conjunctions with P &gt; 10^-4</p>
            </CardContent>
          </Card>
          <Card className="glass-panel border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                <Bell className="w-4 h-4" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold font-headline">14</h2>
              <p className="text-xs text-muted-foreground mt-2">New orbital entries in last 24h</p>
            </CardContent>
          </Card>
          <Card className="glass-panel border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-orange-500">
                <Radio className="w-4 h-4" />
                Sensor Integrity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-4xl font-bold font-headline">98%</h2>
              <p className="text-xs text-muted-foreground mt-2">Tracking network active coverage</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Feed */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Active Collision Events
          </h3>
          {[
            { 
              title: 'High Risk Conjunction: STARLINK-1422 vs DEBRIS 2004-03A', 
              time: '12 minutes ago', 
              severity: 'Critical',
              prob: '0.0012',
              desc: 'Objects approaching distance of 142m in LEO. Maneuver suggested for Starlink-1422.'
            },
            { 
              title: 'Maneuver Warning: COSMOS-2251 Fragments', 
              time: '1 hour ago', 
              severity: 'High',
              prob: '0.00045',
              desc: 'Recent fragment decay detected. Predicted orbital shift of 4.2km in next 48 hours.'
            },
            { 
              title: 'New Object Registered: SPACE-X-F9-FLIGHT-22', 
              time: '3 hours ago', 
              severity: 'Normal',
              prob: 'N/A',
              desc: 'Successfully deployed 22 Starlink satellites. Orbital IDs being assigned by NORAD.'
            },
            { 
              title: 'Solar Weather Alert: M-Class Flare Detected', 
              time: '5 hours ago', 
              severity: 'Information',
              prob: 'N/A',
              desc: 'Expected increase in atmospheric drag for all LEO objects below 450km.'
            },
            { 
              title: 'Geostationary Drift Detected: EUTELSAT-7B', 
              time: 'Yesterday', 
              severity: 'High',
              prob: 'N/A',
              desc: 'Corrective station-keeping thrusters failed to ignite. Monitoring longitude drift.'
            }
          ].map((alert, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 hover:border-white/20 transition-all flex flex-col md:flex-row gap-6">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                alert.severity === 'Critical' ? 'bg-destructive/20 text-destructive' :
                alert.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                alert.severity === 'Information' ? 'bg-blue-500/20 text-blue-500' :
                'bg-primary/20 text-primary'
              )}>
                {alert.severity === 'Critical' ? <ShieldAlert className="w-6 h-6" /> : <Info className="w-6 h-6" />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{alert.title}</h4>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <Badge className={cn(
                    "uppercase text-[10px]",
                    alert.severity === 'Critical' ? 'bg-destructive' :
                    alert.severity === 'High' ? 'bg-orange-500' :
                    'bg-secondary'
                  )}>{alert.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.desc}</p>
                {alert.prob !== 'N/A' && (
                  <div className="flex items-center gap-4 mt-4 p-3 rounded-lg bg-black/20 border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-muted-foreground">Probability</span>
                      <span className="text-sm font-mono font-bold text-primary">{alert.prob}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-muted-foreground">Confidence</span>
                      <span className="text-sm font-mono font-bold">98.4%</span>
                    </div>
                    <Button variant="link" size="sm" className="ml-auto text-primary text-xs">
                      Analyze Telemetry <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
