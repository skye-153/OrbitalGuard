
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldCheck, 
  Users, 
  Server, 
  Key, 
  Settings2, 
  Database,
  History,
  Lock
} from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
          <ShieldCheck className="w-7 h-7 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline">Administrator Console</h1>
          <p className="text-muted-foreground text-sm">Manage system access, telemetry sources, and security protocols.</p>
        </div>
      </div>

      <Tabs defaultValue="access" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl mb-8">
          <TabsTrigger value="access" className="rounded-lg data-[state=active]:bg-primary">Access Control</TabsTrigger>
          <TabsTrigger value="data" className="rounded-lg data-[state=active]:bg-primary">Data Sources</TabsTrigger>
          <TabsTrigger value="logs" className="rounded-lg data-[state=active]:bg-primary">Audit Logs</TabsTrigger>
          <TabsTrigger value="system" className="rounded-lg data-[state=active]:bg-primary">System Config</TabsTrigger>
        </TabsList>

        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-panel border-none p-6 col-span-2">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> User Management</h3>
              <div className="space-y-4">
                {[
                  { name: 'Dr. Elena Vance', role: 'Super Admin', status: 'Online' },
                  { name: 'Marcus Chen', role: 'Analyst', status: 'Offline' },
                  { name: 'Sarah Miller', role: 'Observer', status: 'Online' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", user.status === 'Online' ? 'bg-green-500' : 'bg-muted')} />
                        <span className="text-xs">{user.status}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-white/5 hover:bg-white/10 border-white/10" variant="outline">
                  Invite New Team Member
                </Button>
              </div>
            </Card>

            <Card className="glass-panel border-none p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Key className="w-5 h-5 text-accent" /> Security Overview</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">MFA Status</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Enforced for all users</span>
                    <div className="w-10 h-5 rounded-full bg-primary relative px-1 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-white translate-x-5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">Last Backup</Label>
                  <p className="text-sm font-bold">12 minutes ago</p>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <Button variant="outline" className="w-full justify-start text-xs border-white/10 bg-white/5">
                    <Lock className="w-3 h-3 mr-2" /> Rotate Encryption Keys
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-xs border-white/10 bg-white/5">
                    <History className="w-3 h-3 mr-2" /> Session History
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="glass-panel border-none p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-primary" /> Telemetry Pipelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'NORAD Space-Track API', status: 'Connected', delay: '1.2s' },
                { name: 'ESA Star-Link Feed', status: 'Connected', delay: '0.8s' },
                { name: 'JAXA Orbital Stream', status: 'Degraded', delay: '14.5s' },
                { name: 'Private Sensor Network B', status: 'Maintenance', delay: 'N/A' },
              ].map((src, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-sm">{src.name}</span>
                    <Badge variant={src.status === 'Connected' ? 'secondary' : 'outline'} className="text-[10px]">
                      {src.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Latency: {src.delay}</span>
                    <Button variant="link" className="p-0 h-auto text-[10px] text-primary">Configure</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="glass-panel border-none p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Server className="w-5 h-5 text-primary" /> Global Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Collision Probability Threshold (PC)</Label>
                  <Input defaultValue="0.0001" className="bg-white/5 border-white/10" />
                  <p className="text-[10px] text-muted-foreground">Threshold for issuing 'High Risk' critical alerts.</p>
                </div>
                <div className="space-y-2">
                  <Label>Telemetry Sync Interval (Seconds)</Label>
                  <Input defaultValue="300" className="bg-white/5 border-white/10" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Tracking Region</Label>
                  <Input defaultValue="Global / All Layers" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>System Alert Language</Label>
                  <Input defaultValue="English (Technical)" className="bg-white/5 border-white/10" />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-3">
              <Button variant="ghost">Discard Changes</Button>
              <Button className="bg-primary hover:bg-primary/90 px-8">Save Configuration</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
