
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  ChevronRight
} from 'lucide-react';

// Mock data
const INITIAL_DATA = [
  { id: '45621', name: 'STARLINK-1254', type: 'Satellite', owner: 'SpaceX', orbit: 'LEO', launch: '2022-03-12', status: 'Active' },
  { id: '23561', name: 'COSMOS-2251 DEB', type: 'Debris', owner: 'Russia', orbit: 'LEO', launch: '1993-06-16', status: 'Inert' },
  { id: '25412', name: 'IRIDIUM-32', type: 'Satellite', owner: 'Iridium', orbit: 'LEO', launch: '1997-09-14', status: 'Active' },
  { id: '55412', name: 'ASTRA-2E', type: 'Satellite', owner: 'SES', orbit: 'GEO', launch: '2013-09-29', status: 'Active' },
  { id: '12412', name: 'VANGUARD 1', type: 'Satellite', owner: 'USA', orbit: 'MEO', launch: '1958-03-17', status: 'Inert' },
  { id: '88412', name: 'FENGYUN-1C DEB', type: 'Debris', owner: 'China', orbit: 'LEO', launch: '1999-05-10', status: 'Inert' },
  { id: '33412', name: 'GOES-16', type: 'Satellite', owner: 'NOAA', orbit: 'GEO', launch: '2016-11-19', status: 'Active' },
  { id: '44521', name: 'ISS (ZARYA)', type: 'Station', owner: 'Multinational', orbit: 'LEO', launch: '1998-11-20', status: 'Active' },
];

export default function RegistryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredData = INITIAL_DATA.filter(item => {
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
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="w-4 h-4" /> Add Object
          </Button>
        </div>
      </div>

      {/* Quick Filter Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'All Objects', count: '24,892', icon: Globe2, filter: 'All' },
          { label: 'Satellites', count: '8,421', icon: Satellite, filter: 'Satellite' },
          { label: 'Debris', count: '16,471', icon: Box, filter: 'Debris' },
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
                <TableRow key={row.id} className="border-white/5 hover:bg-white/5 cursor-pointer">
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="p-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Showing 8 of 24,892 objects</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/5 border-white/10 disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-white border-none">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-white/5 border-white/10">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-white/5 border-white/10">3</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/5 border-white/10">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
