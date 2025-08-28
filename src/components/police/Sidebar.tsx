import React from 'react';
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
  Shield
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
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

  return (
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
  );
};

export default Sidebar;