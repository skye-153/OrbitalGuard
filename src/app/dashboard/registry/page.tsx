
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Satellite, 
  Box, 
  Globe2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Info,
  History,
  Activity
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';

const INITIAL_DATA = [
  { id: '45621', name: 'STARLINK-1254', type: 'Satellite', owner: 'SpaceX', orbit: 'LEO', launch: '2022-03-12', status: 'Active', inclination: '53.2°', altitude: '550km' },
  { id: '23561', name: 'COSMOS-2251 DEB', type: 'Debris', owner: 'Russia', orbit: 'LEO', launch: '1993-06-16', status: 'Inert', inclination: '86.4°', altitude: '780km' },
  { id: '25412', name: 'IRIDIUM-32', type: 'Satellite', owner: 'Iridium', orbit: 'LEO', launch: '1997-09-14', status: 'Active', inclination: '86.4°', altitude: '780km' },
  { id: '55412', name: 'ASTRA-2E', type: 'Satellite', owner: 'SES', orbit: 'GEO', launch: '2013-09-29', status: 'Active', inclination: '0.1°', altitude: '35,786km' },
  { id: '12412', name: 'VANGUARD 1', type: 'Satellite', owner: 'USA', orbit: 'MEO', launch: '1958-03-17', status: 'Inert', inclination: '34.2°', altitude: '2,500km' },
  { id: '88412', name: 'FENGYUN-1C DEB', type: 'Debris', owner: 'China', orbit: 'LEO', launch: '1999-05-10', status: 'Inert', inclination: '98.6°', altitude: '860km' },
  { id: '33412', name: 'GOES-16', type: 'Satellite', owner: 'NOAA', orbit: 'GEO', launch: '2016-11-19', status: 'Active', inclination: '0.0°', altitude: '35,786km' },
  { id: '44521', name: 'ISS (ZARYA)', type: 'Station', owner: 'Multinational', orbit: 'LEO', launch: '1998-11-20', status: 'Active', inclination: '51.6°', altitude: '420km' },
];

export default function RegistryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [registryData, setRegistryData] = useState(INITIAL_DATA);

  // Form State
  const [newObjectName, setNewObjectName] = useState('');
  const [newObjectNorad, setNewObjectNorad] = useState('');
  const [newObjectType, setNewObjectType] = useState('Satellite');

  const handleAddObject = () => {
    if (!newObjectName || !newObjectNorad) return;

    const newObj = {
      id: newObjectNorad,
      name: newObjectName.toUpperCase(),
      type: newObjectType,
      owner: 'System Registered',
      orbit: 'LEO',
      launch: new Date().toISOString().split('T')[0],
      status: 'Active',
      inclination: 'TBD',
      altitude: 'TBD'
    };

    setRegistryData([newObj, ...registryData]);
    setIsAdding(false);
    setNewObjectName('');
    setNewObjectNorad('');
  };

  const filteredData = registryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.includes(searchTerm);
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by Name or NORAD ID..." 
              className="pl-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-white/5 border-white/10 gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          
          <Dialog open={isAdding} onOpenChange={setIsAdding}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" /> Add Object
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10">
              <DialogHeader>
                <DialogTitle>Register New Orbital Object</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. STARLINK-9999" 
                    className="col-span-3 bg-white/5 border-white/10"
                    value={newObjectName}
                    onChange={(e) => setNewObjectName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="norad" className="text-right">NORAD ID</Label>
                  <Input 
                    id="norad" 
                    placeholder="e.g. 52412" 
                    className="col-span-3 bg-white/5 border-white/10"
                    value={newObjectNorad}
                    onChange={(e) => setNewObjectNorad(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <select 
                    id="type" 
                    className="col-span-3 h-10 px-3 rounded-md bg-white/5 border-white/10 text-sm focus:outline-none"
                    value={newObjectType}
                    onChange={(e) => setNewObjectType(e.target.value)}
                  >
                    <option value="Satellite" className="bg-card">Satellite</option>
                    <option value="Debris" className="bg-card">Debris</option>
                    <option value="Station" className="bg-card">Station</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button onClick={handleAddObject}>Register Object</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Filter Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'All Objects', count: registryData.length, icon: Globe2, filter: 'All' },
          { label: 'Satellites', count: registryData.filter(d => d.type === 'Satellite').length, icon: Satellite, filter: 'Satellite' },
          { label: 'Debris', count: registryData.filter(d => d.type === 'Debris').length, icon: Box, filter: 'Debris' },
          { label: 'Critical', count: '12', icon: Filter, filter: 'Critical' },
        ].map((tile, i) => (
          <button 
            key={i} 
            onClick={() => setFilterType(tile.filter)}
            className={cn(
              "p-4 rounded-xl text-left transition-all border",
              filterType === tile.filter 
                ? "bg-primary/10 border-primary text-primary" 
                : "glass-panel border-white/5 hover:border-white/20"
            )}
          >
            <tile.icon className="w-5 h-5 mb-2" />
            <p className="text-xs text-muted-foreground">{tile.label}</p>
            <h4 className="text-xl font-bold font-headline">{tile.count}</h4>
          </button>
        ))}
      </div>

      {/* Database Table */}
      <Card className="glass-panel border-none">
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Object Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Orbit</TableHead>
                <TableHead>Launch Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="border-white/5 hover:bg-white/5 cursor-pointer"
                  onClick={() => setSelectedObject(row)}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">{row.id}</TableCell>
                  <TableCell className="font-bold">{row.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal border-white/10 bg-white/5">
                      {row.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{row.owner}</TableCell>
                  <TableCell className="font-medium text-xs tracking-widest">{row.orbit}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.launch}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        row.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-muted'
                      )} />
                      <span className="text-xs">{row.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="p-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Showing {filteredData.length} objects</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/5 border-white/10">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-white border-none">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/5 border-white/10">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Object Detail Sheet */}
      <Sheet open={!!selectedObject} onOpenChange={() => setSelectedObject(null)}>
        <SheetContent className="bg-card border-l-white/10 w-full sm:max-w-md">
          {selectedObject && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Satellite className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-bold">{selectedObject.name}</SheetTitle>
                    <SheetDescription>NORAD ID: {selectedObject.id}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              
              <div className="space-y-6 mt-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Status</p>
                    <p className="font-bold text-green-500 mt-1">{selectedObject.status}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Orbit</p>
                    <p className="font-bold mt-1">{selectedObject.orbit}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Orbital Parameters
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm p-3 rounded-lg bg-white/5">
                      <span className="text-muted-foreground">Inclination</span>
                      <span className="font-mono">{selectedObject.inclination}</span>
                    </div>
                    <div className="flex justify-between text-sm p-3 rounded-lg bg-white/5">
                      <span className="text-muted-foreground">Mean Altitude</span>
                      <span className="font-mono">{selectedObject.altitude}</span>
                    </div>
                    <div className="flex justify-between text-sm p-3 rounded-lg bg-white/5">
                      <span className="text-muted-foreground">Launch Date</span>
                      <span className="font-mono">{selectedObject.launch}</span>
                    </div>
                    <div className="flex justify-between text-sm p-3 rounded-lg bg-white/5">
                      <span className="text-muted-foreground">Owner / Agency</span>
                      <span className="font-mono">{selectedObject.owner}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <Button className="w-full gap-2">
                    <Activity className="w-4 h-4" /> Live Telemetry
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-white/5">
                    <History className="w-4 h-4" /> Orbit History
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
