
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Globe, Shield, Database, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold font-headline mb-2">System Architecture Report</h1>
          <p className="text-muted-foreground">Orbital Guard Technical Documentation v1.0.4</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      <Separator className="bg-white/10" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Executive Summary
        </h2>
        <Card className="glass-panel border-none p-6">
          <p className="leading-relaxed text-muted-foreground">
            Orbital Guard is a comprehensive satellite traffic and debris management system designed to address the growing challenge of space congestion. By integrating real-time telemetry, advanced predictive modeling, and intuitive data visualization, the system provides space agencies and satellite operators with critical tools for collision avoidance and orbital maintenance.
          </p>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Database className="w-6 h-6 text-primary" /> Technical Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-panel border-none p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-accent" /> Frontend Visuals</h3>
            <ul className="text-sm space-y-3 text-muted-foreground list-disc pl-4">
              <li>Next.js App Router for server-side performance.</li>
              <li>Three.js based interactive orbital map for 3D visualization.</li>
              <li>Responsive Tailwind CSS design with glassmorphism UI.</li>
              <li>Accessible Shadcn/ui component library.</li>
            </ul>
          </Card>
          <Card className="glass-panel border-none p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Database className="w-4 h-4 text-accent" /> Data Management</h3>
            <ul className="text-sm space-y-3 text-muted-foreground list-disc pl-4">
              <li>Relational database structure for high-integrity telemetry.</li>
              <li>Role-based access control (RBAC) for administration.</li>
              <li>RESTful API endpoints for external sensor integration.</li>
              <li>Automated conflict resolution for tracking data.</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" /> System Modules
        </h2>
        <div className="space-y-4">
          {[
            { 
              module: 'Object Registry', 
              desc: 'Securely stores and retrieves orbital parameters, owner info, and status for over 25,000 tracked objects.',
              status: 'Stable'
            },
            { 
              module: 'Orbital Visualizer', 
              desc: 'Renders complex trajectories in an interactive 3D space with high precision and performance.',
              status: 'Active'
            },
            { 
              module: 'Conjunction Predictor', 
              desc: 'Uses physics-based algorithms to calculate probability of collision between any two objects.',
              status: 'Active'
            },
            { 
              module: 'Alert Engine', 
              desc: 'Dispatches real-time notifications to stakeholders via push, email, and API webhooks.',
              status: 'Operational'
            }
          ].map((m, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold">{m.module}</h4>
                  <Badge variant="outline" className="text-[10px] text-green-500 border-green-500/30">{m.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-10 border-t border-white/10 text-center">
        <p className="text-sm text-muted-foreground mb-4">Generated by Orbital Guard Internal System v1.0.4</p>
        <div className="flex justify-center gap-4">
          <Button variant="ghost" size="sm">Verification Log</Button>
          <Button variant="ghost" size="sm">System Uptime: 99.98%</Button>
        </div>
      </footer>
    </div>
  );
}
