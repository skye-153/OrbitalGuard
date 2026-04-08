
"use client";

import { useState, useMemo } from 'react';
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
  Activity,
  Trash2,
  ShieldAlert
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const INITIAL_DATA = [
  { id: '45621', name: 'STARLINK-1254', type: 'Satellite', owner: 'SpaceX', orbit: 'LEO', launch: '2022-03-12', status: 'Active', inclination: '53.2°', altitude: '550km' },
  { id: '23561', name: 'COSMOS-2251 DEB', type: 'Debris', owner: 'Russia', orbit: 'LEO', launch: '1993-06-16', status: 'Inert', inclination: '86.4°', altitude: '780km' },
  { id: '25412', name: 'IRIDIUM-32', type: 'Satellite', owner: 'Iridium', orbit: 'LEO', launch: '1997-09-14', status: 'Active', inclination: '86.4°', altitude: '780km' },
  { id: '55412', name: 'ASTRA-2E', type: 'Satellite', owner: 'SES', orbit: 'GEO', launch: '2013-09-29', status: 'Active', inclination: '0.1°', altitude: '35,786km' },
  { id: '12412', name: 'VANGUARD 1', type: 'Satellite', owner: 'USA', orbit: 'MEO', launch: '1958-03-17', status: 'Inert', inclination: '34.2°', altitude: '2,500km' },
  { id: '88412', name: 'FENGYUN-1C DEB', type: 'Debris', owner: 'China', orbit: 'LEO', launch: '1999-05-10', status: 'Inert', inclination: '98.6°', altitude: '860km' },
  { id: '33412', name: 'GOES-16', type: 'Satellite', owner: 'NOAA', orbit: 'GEO', launch: '2016-11-19', status: 'Active', inclination: '0.0°', altitude: '35,786km' },
  { id: '44521', name: 'ISS (ZARYA)', type: 'Station', owner: 'Multinational', orbit: 'LEO', launch: '1998-11-20', status: 'Active', inclination: '51.6°', altitude: '420km' },
  { id: '49260', name: 'ONEWEB-0341', type: 'Satellite', owner: 'OneWeb', orbit: 'LEO', launch: '2021-09-14', status: 'Active', inclination: '87.9°', altitude: '1,200km' },
  { id: '52854', name: 'YAOGAN-35', type: 'Satellite', owner: 'China', orbit: 'LEO', launch: '2022-06-23', status: 'Active', inclination: '35.0°', altitude: '500km' },
  { id: '43013', name: 'NOAA-20', type: 'Satellite', owner: 'NOAA', orbit: 'LEO', launch: '2017-11-18', status: 'Active', inclination: '98.7°', altitude: '824km' },
  { id: '25544', name: 'ZARYA (ISS)', type: 'Station', owner: 'Multinational', orbit: 'LEO', launch: '1998-11-20', status: 'Active', inclination: '51.6°', altitude: '418km' },
];

export default function RegistryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [advancedStatusFilter, setAdvancedStatusFilter] = useState('All');
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [registryData, setRegistryData] = useState(INITIAL_DATA);

  // Form State
  const [newObjectName, setNewObjectName] = useState('');
  const [newObjectNorad, setNewObjectNorad] = useState('');
  const [newObjectType, setNewObjectType] = useState('Satellite');

  const handleExport = () => {
    toast({ title: 'Export Initiated', description: 'Generating and downloading orbital CSV data...' });
    
    const headers = ['NORAD ID', 'Name', 'Type', 'Owner', 'Orbit', 'Launch', 'Status', 'Inclination', 'Altitude'];
    const csvRows = [
      headers.join(','),
      ...filteredData.map(row => 
        [row.id, `"${row.name}"`, row.type, `"${row.owner}"`, row.orbit, row.launch, row.status, `"${row.inclination}"`, `"${row.altitude}"`].join(',')
      )
    ];
    const csvContent = csvRows.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orbital_registry_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddObject = () => {
    if (!newObjectName || !newObjectNorad) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please provide both a name and a NORAD ID.'
      });
      return;
    }

    const newObj = {
      id: newObjectNorad,
      name: newObjectName.toUpperCase(),
      type: newObjectType,
      owner: 'Manual Entry',
      orbit: 'TBD',
      launch: new Date().toISOString().split('T')[0],
      status: 'Active',
      inclination: 'TBD',
      altitude: 'TBD'
    };

    setRegistryData([newObj, ...registryData]);
    setIsAdding(false);
    setNewObjectName('');
    setNewObjectNorad('');
    
    toast({
      title: 'Object Registered',
      description: `${newObj.name} has been added to the secure registry.`
    });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRegistryData(prev => prev.filter(item => item.id !== id));
    toast({
      title: 'Object Removed',
      description: 'The tracking record has been deleted.'
    });
  };

  const filteredData = useMemo(() => {
    return registryData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.includes(searchTerm);
      const matchesType = filterType === 'All' || item.type === filterType;
      
      let matchesAdvancedStatus = true;
      if (advancedStatusFilter === 'Active') matchesAdvancedStatus = item.status === 'Active';
      if (advancedStatusFilter === 'Inert') matchesAdvancedStatus = item.status === 'Inert';
      
      return matchesSearch && matchesType && matchesAdvancedStatus;
    });
  }, [registryData, searchTerm, filterType, advancedStatusFilter]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by Name or NORAD ID..." 
              className="pl-10 bg-white/5 border-white/10 h-11 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto bg-white/5 border-white/10 gap-2 h-11 rounded-xl">
                <Filter className="w-4 h-4" /> Filter Advanced
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-card border-white/10 p-4">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status Filter</p>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className={cn("w-full justify-start text-xs", advancedStatusFilter === 'Active' && "bg-white/10")} onClick={() => setAdvancedStatusFilter(advancedStatusFilter === 'Active' ? 'All' : 'Active')}>Only Active</Button>
                  <Button variant="ghost" size="sm" className={cn("w-full justify-start text-xs", advancedStatusFilter === 'Inert' && "bg-white/10")} onClick={() => setAdvancedStatusFilter(advancedStatusFilter === 'Inert' ? 'All' : 'Inert')}>Only Inert</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => toast({ title: 'Feature Unavailable', description: 'Decade filtering coming in v1.1.0' })}>Launch Decades</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="flex-1 lg:flex-none bg-white/5 border-white/10 gap-2 h-11 rounded-xl" onClick={handleExport}>
            <Download className="w-4 h-4" /> Export
          </Button>
          
          <Dialog open={isAdding} onOpenChange={setIsAdding}>
            <DialogTrigger asChild>
              <Button className="flex-1 lg:flex-none bg-primary hover:bg-primary/90 gap-2 h-11 rounded-xl px-6">
                <Plus className="w-4 h-4" /> Add Object
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Register New Orbital Asset</DialogTitle>
                <p className="text-sm text-muted-foreground">Manually inject a tracking entry into the registry.</p>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase font-bold text-muted-foreground">Object Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. STARLINK-9999" 
                    className="bg-white/5 border-white/10"
                    value={newObjectName}
                    onChange={(e) => setNewObjectName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="norad" className="text-xs uppercase font-bold text-muted-foreground">NORAD Catalog ID</Label>
                  <Input 
                    id="norad" 
                    placeholder="e.g. 52412" 
                    className="bg-white/5 border-white/10"
                    value={newObjectNorad}
                    onChange={(e) => setNewObjectNorad(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-xs uppercase font-bold text-muted-foreground">Classification</Label>
                  <select 
                    id="type" 
                    className="w-full h-10 px-3 rounded-md bg-white/5 border-white/10 text-sm focus:outline-none appearance-none"
                    value={newObjectType}
                    onChange={(e) => setNewObjectType(e.target.value)}
                  >
                    <option value="Satellite" className="bg-card">Active Satellite</option>
                    <option value="Debris" className="bg-card">Space Debris</option>
                    <option value="Station" className="bg-card">Space Station</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-white/10" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleAddObject}>Register Asset</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Filter Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Tracked', count: registryData.length, icon: Globe2, filter: 'All', color: 'text-primary' },
          { label: 'Active Assets', count: registryData.filter(d => d.type === 'Satellite' || d.type === 'Station').length, icon: Satellite, filter: 'Satellite', color: 'text-green-500' },
          { label: 'Inert Objects', count: registryData.filter(d => d.type === 'Debris').length, icon: Box, filter: 'Debris', color: 'text-accent' },
          { label: 'Critical Risks', count: '14', icon: ShieldAlert, filter: 'Critical', color: 'text-destructive' },
        ].map((tile, i) => (
          <button 
            key={i} 
            onClick={() => setFilterType(tile.filter)}
            className={cn(
              "p-5 rounded-2xl text-left transition-all border shadow-lg group",
              filterType === tile.filter 
                ? "bg-primary/10 border-primary text-primary" 
                : "glass-panel border-white/5 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <tile.icon className={cn("w-5 h-5 mb-3", tile.color)} />
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{tile.label}</p>
            <h4 className="text-2xl font-bold font-headline mt-1 group-hover:translate-x-1 transition-transform">{tile.count}</h4>
          </button>
        ))}
      </div>

      {/* Database Table */}
      <Card className="glass-panel border-none shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="w-[120px] text-xs uppercase font-bold text-muted-foreground px-6">NORAD ID</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-muted-foreground">Object Name</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-muted-foreground">Type</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-muted-foreground">Owner</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-muted-foreground">Orbit</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-muted-foreground">Launch</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right px-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className="border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => setSelectedObject(row)}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground px-6">{row.id}</TableCell>
                    <TableCell className="font-bold text-sm">{row.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal border-white/10 bg-white/5 text-[10px] py-0 h-5">
                        {row.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-muted-foreground">{row.owner}</TableCell>
                    <TableCell className="font-bold text-[10px] tracking-widest">{row.orbit}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{row.launch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          row.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-muted'
                        )} />
                        <span className="text-[11px] font-medium">{row.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive transition-colors" 
                          onClick={(e) => handleDelete(row.id, e)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-card/20">
          <span className="text-xs text-muted-foreground">Displaying {filteredData.length} tracked entities</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 bg-primary text-white border-none font-bold text-xs">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/5 border-white/10 hover:bg-white/10">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Object Detail Sheet */}
      <Sheet open={!!selectedObject} onOpenChange={() => setSelectedObject(null)}>
        <SheetContent className="bg-[#1a1f26] border-l-white/10 w-full sm:max-w-md p-0 overflow-hidden">
          {selectedObject && (
            <div className="flex flex-col h-full">
              <div className="p-8 pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                    <Satellite className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-2xl font-bold font-headline">{selectedObject.name}</SheetTitle>
                    <SheetDescription className="font-mono text-xs">NORAD ID: {selectedObject.id}</SheetDescription>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Operational Status</p>
                    <p className={cn("font-bold text-sm mt-1", selectedObject.status === 'Active' ? 'text-green-500' : 'text-muted-foreground')}>
                      {selectedObject.status}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Orbit Regime</p>
                    <p className="font-bold text-sm mt-1">{selectedObject.orbit}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-primary">
                      <Info className="w-4 h-4" /> Technical Parameters
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Inclination', value: selectedObject.inclination },
                        { label: 'Mean Altitude', value: selectedObject.altitude },
                        { label: 'Launch Date', value: selectedObject.launch },
                        { label: 'Owner / Agency', value: selectedObject.owner },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-mono font-bold text-white">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-accent">
                      <History className="w-4 h-4" /> Recent Events
                    </h4>
                    <div className="space-y-3">
                      {[
                        { date: '2024-03-01', event: 'Station-keeping maneuver executed' },
                        { date: '2024-02-15', event: 'Telemetry signal strength normal' },
                      ].map((evt, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[10px] text-muted-foreground block mb-1">{evt.date}</span>
                          <p className="text-xs font-medium">{evt.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-card/50 border-t border-white/10 space-y-3">
                <Button className="w-full h-12 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20" onClick={() => toast({ title: 'Establishing Link...', description: 'Requesting real-time telemetry packets.' })}>
                  <Activity className="w-4 h-4" /> Live Telemetry Link
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold gap-2 bg-white/5 border-white/10 hover:bg-white/10">
                  Generate Full Report
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
