import React, { useState } from 'react';
import { 
  Home, 
  Radio, 
  User, 
  Car, 
  FileText, 
  Briefcase, 
  AlertTriangle, 
  Scale, 
  Users, 
  MessageSquare, 
  Lock, 
  ScrollText,
  Plus,
  Search,
  Shield
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [activeMenu, setActiveMenu] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dispatch', label: 'Dispatch', icon: Radio },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'cases', label: 'Cases', icon: Briefcase },
    { id: 'warrants', label: 'Warrants', icon: AlertTriangle },
    { id: 'offences', label: 'Offences', icon: Scale },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'jail', label: 'Jail', icon: Lock },
    { id: 'logs', label: 'Logs', icon: ScrollText },
  ];

  const recentReports = [
    { id: 'RPT-2024-001', title: 'Traffic Stop - Speeding', officer: 'Officer Johnson', time: '2 hours ago', status: 'pending' },
    { id: 'RPT-2024-002', title: 'Domestic Disturbance', officer: 'Officer Smith', time: '4 hours ago', status: 'completed' },
    { id: 'RPT-2024-003', title: 'Vandalism - Downtown', officer: 'Officer Williams', time: '6 hours ago', status: 'in-progress' },
    { id: 'RPT-2024-004', title: 'DUI Arrest', officer: 'Officer Brown', time: '8 hours ago', status: 'completed' },
  ];

  const bulletins = [
    { id: 'BLT-001', title: 'BOLO: Silver Sedan', priority: 'high', time: '1 hour ago' },
    { id: 'BLT-002', title: 'Missing Person Alert', priority: 'urgent', time: '3 hours ago' },
    { id: 'BLT-003', title: 'Community Event Security', priority: 'medium', time: '5 hours ago' },
    { id: 'BLT-004', title: 'Weather Advisory', priority: 'low', time: '7 hours ago' },
  ];

  const recentWarrants = [
    { id: 'WRT-2024-001', name: 'John Doe', charge: 'Assault', status: 'active', date: '2024-01-15' },
    { id: 'WRT-2024-002', name: 'Jane Smith', charge: 'Theft', status: 'active', date: '2024-01-14' },
    { id: 'WRT-2024-003', name: 'Mike Johnson', charge: 'Drug Possession', status: 'served', date: '2024-01-13' },
    { id: 'WRT-2024-004', name: 'Sarah Williams', charge: 'Fraud', status: 'active', date: '2024-01-12' },
  ];

  const activeUnits = [
    { id: '101', name: 'John Martinez', rank: 'Sergeant', rankColor: 'primary', status: 'Available' },
    { id: '102', name: 'Sarah Johnson', rank: 'Officer', rankColor: 'secondary', status: 'On Call' },
    { id: '103', name: 'Mike Thompson', rank: 'Lieutenant', rankColor: 'destructive', status: 'Available' },
    { id: '104', name: 'Emily Davis', rank: 'Officer', rankColor: 'secondary', status: 'Busy' },
    { id: '105', name: 'Robert Wilson', rank: 'Captain', rankColor: 'accent', status: 'Available' },
    { id: '106', name: 'Lisa Anderson', rank: 'Officer', rankColor: 'secondary', status: 'On Break' },
    { id: '107', name: 'David Brown', rank: 'Detective', rankColor: 'primary', status: 'On Call' },
    { id: '108', name: 'Jennifer Taylor', rank: 'Officer', rankColor: 'secondary', status: 'Available' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'in-progress': return 'secondary';
      case 'completed': return 'default';
      case 'active': return 'destructive';
      case 'served': return 'default';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'default';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600';
      case 'On Call': return 'text-yellow-600';
      case 'Busy': return 'text-red-600';
      case 'On Break': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">LSPD</h1>
              <p className="text-xs text-muted-foreground">Mobile Data Terminal</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeMenu === item.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-foreground">Police Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-foreground">Officer Michael Scott</p>
                <div className="flex items-center gap-2 justify-end">
                  <Badge variant="default">Sergeant</Badge>
                  <span className="text-sm text-muted-foreground">#4521</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                MS
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 flex gap-6">
          {/* Recent Reports */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Reports</CardTitle>
                <Button size="sm" className="gap-1">
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search reports..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-3">
                  {recentReports.map((report) => (
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

          {/* Bulletin Board */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Bulletin Board</CardTitle>
                <Button size="sm" className="gap-1">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search bulletins..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-3">
                  {bulletins.map((bulletin) => (
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

          {/* Recent Warrants */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Warrants</CardTitle>
                <Button size="sm" className="gap-1">
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search warrants..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-3">
                  {recentWarrants.map((warrant) => (
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

          {/* Active Units */}
          <Card className="w-80">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Units</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-3">
                  {activeUnits.map((unit) => (
                    <div key={unit.id} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {unit.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{unit.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={unit.rankColor as any} className="text-xs">
                                {unit.rank}
                              </Badge>
                              <span className="text-xs text-muted-foreground">#{unit.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className={`text-xs font-medium ${getUnitStatusColor(unit.status)}`}>
                          • {unit.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
