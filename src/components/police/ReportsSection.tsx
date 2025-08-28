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

export interface Report {
  id: string;
  title: string;
  officer: string;
  time: string;
  status: string;
  description?: string;
}

interface ReportsSectionProps {
  reports: Report[];
  onAddReport: (report: Omit<Report, 'id' | 'time'>) => void;
}

const ReportsSection: React.FC<ReportsSectionProps> = ({ reports, onAddReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    officer: '',
    status: 'pending',
    description: ''
  });

  const filteredReports = useMemo(() => {
    return reports.filter(report => 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reports, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'in-progress': return 'secondary';
      case 'completed': return 'default';
      default: return 'outline';
    }
  };

  const handleSubmit = () => {
    if (!newReport.title || !newReport.officer) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onAddReport(newReport);
    setIsDialogOpen(false);
    setNewReport({ title: '', officer: '', status: 'pending', description: '' });
    toast({
      title: "Success",
      description: "Report created successfully"
    });
  };

  return (
    <>
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Reports</CardTitle>
            <Button size="sm" className="gap-1" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search reports..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{report.id}</span>
                    <Badge variant={getStatusColor(report.status)}>
                      {report.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{report.officer}</span>
                    <span>{report.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={newReport.title}
                onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                placeholder="Enter report title..."
              />
            </div>
            <div>
              <Label htmlFor="officer">Officer Name</Label>
              <Input
                id="officer"
                value={newReport.officer}
                onChange={(e) => setNewReport({...newReport, officer: e.target.value})}
                placeholder="Enter officer name..."
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newReport.status} onValueChange={(value) => setNewReport({...newReport, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newReport.description}
                onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                placeholder="Enter report description..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Create Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportsSection;