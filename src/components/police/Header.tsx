import React from 'react';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  officerName: string;
  rank: string;
  badgeNumber: string;
}

const Header: React.FC<HeaderProps> = ({ officerName, rank, badgeNumber }) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">Police Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-foreground">{officerName}</p>
            <div className="flex items-center gap-2 justify-end">
              <Badge variant="default">{rank}</Badge>
              <span className="text-sm text-muted-foreground">#{badgeNumber}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            {officerName.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;