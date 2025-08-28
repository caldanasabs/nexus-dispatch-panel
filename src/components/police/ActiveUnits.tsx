import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export interface Unit {
  id: string;
  name: string;
  rank: string;
  rankColor: string;
  status: string;
}

interface ActiveUnitsProps {
  units: Unit[];
}

const ActiveUnits: React.FC<ActiveUnitsProps> = ({ units }) => {
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
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Active Units</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-3">
            {units.map((unit) => (
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
  );
};

export default ActiveUnits;