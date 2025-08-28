import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export interface Warrant {
  id: string;
  name: string;
  charge: string;
  status: string;
  date: string;
}

interface WarrantsSectionProps {
  warrants: Warrant[];
  onAddWarrant: (warrant: Omit<Warrant, 'id' | 'date'>) => void;
}

const WarrantsSection: React.FC<WarrantsSectionProps> = ({ warrants, onAddWarrant }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWarrant, setNewWarrant] = useState({
    name: '',
    charge: '',
    status: 'active'
  });

  const filteredWarrants = useMemo(() => {
    return warrants.filter(warrant => 
      warrant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warrant.charge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warrant.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [warrants, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'served': return 'default';
      default: return 'outline';
    }
  };

  const handleSubmit = () => {
    if (!newWarrant.name || !newWarrant.charge) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onAddWarrant(newWarrant);
    setIsDialogOpen(false);
    setNewWarrant({ name: '', charge: '', status: 'active' });
    toast({
      title: "Success",
      description: "Warrant created successfully"
    });
  };

  return (
    <>
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Warrants</CardTitle>
            <Button size="sm" className="gap-1" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search warrants..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-3">
              {filteredWarrants.map((warrant) => (
                <div key={warrant.id} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{warrant.id}</span>
                    <Badge variant={getStatusColor(warrant.status)}>
                      {warrant.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">{warrant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{warrant.charge}</p>
                  <span className="text-xs text-muted-foreground">{warrant.date}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Warrant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Suspect Name</Label>
              <Input
                id="name"
                value={newWarrant.name}
                onChange={(e) => setNewWarrant({...newWarrant, name: e.target.value})}
                placeholder="Enter suspect name..."
              />
            </div>
            <div>
              <Label htmlFor="charge">Charge</Label>
              <Input
                id="charge"
                value={newWarrant.charge}
                onChange={(e) => setNewWarrant({...newWarrant, charge: e.target.value})}
                placeholder="Enter charge..."
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newWarrant.status} onValueChange={(value) => setNewWarrant({...newWarrant, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="served">Served</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Create Warrant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WarrantsSection;