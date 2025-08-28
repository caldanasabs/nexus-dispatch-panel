import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export interface Bulletin {
  id: string;
  title: string;
  priority: string;
  time: string;
  description?: string;
}

interface BulletinSectionProps {
  bulletins: Bulletin[];
  onAddBulletin: (bulletin: Omit<Bulletin, 'id' | 'time'>) => void;
}

const BulletinSection: React.FC<BulletinSectionProps> = ({ bulletins, onAddBulletin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBulletin, setNewBulletin] = useState({
    title: '',
    priority: 'medium',
    description: ''
  });

  const filteredBulletins = useMemo(() => {
    return bulletins.filter(bulletin => 
      bulletin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bulletin.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bulletins, searchTerm]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'default';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const handleSubmit = () => {
    if (!newBulletin.title) {
      toast({
        title: "Error",
        description: "Please enter a bulletin title",
        variant: "destructive"
      });
      return;
    }

    onAddBulletin(newBulletin);
    setIsDialogOpen(false);
    setNewBulletin({ title: '', priority: 'medium', description: '' });
    toast({
      title: "Success",
      description: "Bulletin added successfully"
    });
  };

  return (
    <>
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Bulletin Board</CardTitle>
            <Button size="sm" className="gap-1" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search bulletins..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-3">
              {filteredBulletins.map((bulletin) => (
                <div key={bulletin.id} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{bulletin.id}</span>
                    <Badge variant={getPriorityColor(bulletin.priority)}>
                      {bulletin.priority}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{bulletin.title}</h3>
                  <span className="text-sm text-muted-foreground">{bulletin.time}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Bulletin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Bulletin Title</Label>
              <Input
                id="title"
                value={newBulletin.title}
                onChange={(e) => setNewBulletin({...newBulletin, title: e.target.value})}
                placeholder="Enter bulletin title..."
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={newBulletin.priority} onValueChange={(value) => setNewBulletin({...newBulletin, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newBulletin.description}
                onChange={(e) => setNewBulletin({...newBulletin, description: e.target.value})}
                placeholder="Enter bulletin description..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Bulletin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BulletinSection;