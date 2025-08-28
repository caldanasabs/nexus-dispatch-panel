import React, { useState } from 'react';
import Sidebar from '@/components/police/Sidebar';
import Header from '@/components/police/Header';
import ReportsSection, { Report } from '@/components/police/ReportsSection';
import BulletinSection, { Bulletin } from '@/components/police/BulletinSection';
import WarrantsSection, { Warrant } from '@/components/police/WarrantsSection';
import ActiveUnits, { Unit } from '@/components/police/ActiveUnits';

const Index = () => {
  const [activeMenu, setActiveMenu] = useState('home');
  
  // Officer data - in real app this would come from authentication
  const officerData = {
    name: 'Officer Michael Scott',
    rank: 'Sergeant',
    badgeNumber: '4521'
  };

  // Reports state
  const [reports, setReports] = useState<Report[]>([
    { id: 'RPT-2024-001', title: 'Traffic Stop - Speeding', officer: 'Officer Johnson', time: '2 hours ago', status: 'pending' },
    { id: 'RPT-2024-002', title: 'Domestic Disturbance', officer: 'Officer Smith', time: '4 hours ago', status: 'completed' },
    { id: 'RPT-2024-003', title: 'Vandalism - Downtown', officer: 'Officer Williams', time: '6 hours ago', status: 'in-progress' },
    { id: 'RPT-2024-004', title: 'DUI Arrest', officer: 'Officer Brown', time: '8 hours ago', status: 'completed' },
  ]);

  // Bulletins state
  const [bulletins, setBulletins] = useState<Bulletin[]>([
    { id: 'BLT-001', title: 'BOLO: Silver Sedan', priority: 'high', time: '1 hour ago' },
    { id: 'BLT-002', title: 'Missing Person Alert', priority: 'urgent', time: '3 hours ago' },
    { id: 'BLT-003', title: 'Community Event Security', priority: 'medium', time: '5 hours ago' },
    { id: 'BLT-004', title: 'Weather Advisory', priority: 'low', time: '7 hours ago' },
  ]);

  // Warrants state
  const [warrants, setWarrants] = useState<Warrant[]>([
    { id: 'WRT-2024-001', name: 'John Doe', charge: 'Assault', status: 'active', date: '2024-01-15' },
    { id: 'WRT-2024-002', name: 'Jane Smith', charge: 'Theft', status: 'active', date: '2024-01-14' },
    { id: 'WRT-2024-003', name: 'Mike Johnson', charge: 'Drug Possession', status: 'served', date: '2024-01-13' },
    { id: 'WRT-2024-004', name: 'Sarah Williams', charge: 'Fraud', status: 'active', date: '2024-01-12' },
  ]);

  // Active units state
  const [activeUnits] = useState<Unit[]>([
    { id: '101', name: 'John Martinez', rank: 'Sergeant', rankColor: 'primary', status: 'Available' },
    { id: '102', name: 'Sarah Johnson', rank: 'Officer', rankColor: 'secondary', status: 'On Call' },
    { id: '103', name: 'Mike Thompson', rank: 'Lieutenant', rankColor: 'destructive', status: 'Available' },
    { id: '104', name: 'Emily Davis', rank: 'Officer', rankColor: 'secondary', status: 'Busy' },
    { id: '105', name: 'Robert Wilson', rank: 'Captain', rankColor: 'accent', status: 'Available' },
    { id: '106', name: 'Lisa Anderson', rank: 'Officer', rankColor: 'secondary', status: 'On Break' },
    { id: '107', name: 'David Brown', rank: 'Detective', rankColor: 'primary', status: 'On Call' },
    { id: '108', name: 'Jennifer Taylor', rank: 'Officer', rankColor: 'secondary', status: 'Available' },
  ]);

  // Handler functions for adding new items
  const handleAddReport = (report: Omit<Report, 'id' | 'time'>) => {
    const newReport: Report = {
      ...report,
      id: `RPT-${new Date().getFullYear()}-${String(reports.length + 1).padStart(3, '0')}`,
      time: 'Just now'
    };
    setReports([newReport, ...reports]);
  };

  const handleAddBulletin = (bulletin: Omit<Bulletin, 'id' | 'time'>) => {
    const newBulletin: Bulletin = {
      ...bulletin,
      id: `BLT-${String(bulletins.length + 1).padStart(3, '0')}`,
      time: 'Just now'
    };
    setBulletins([newBulletin, ...bulletins]);
  };

  const handleAddWarrant = (warrant: Omit<Warrant, 'id' | 'date'>) => {
    const newWarrant: Warrant = {
      ...warrant,
      id: `WRT-${new Date().getFullYear()}-${String(warrants.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0]
    };
    setWarrants([newWarrant, ...warrants]);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          officerName={officerData.name}
          rank={officerData.rank}
          badgeNumber={officerData.badgeNumber}
        />

        <div className="flex-1 p-6 flex gap-6">
          <ReportsSection 
            reports={reports}
            onAddReport={handleAddReport}
          />
          
          <BulletinSection
            bulletins={bulletins}
            onAddBulletin={handleAddBulletin}
          />
          
          <WarrantsSection
            warrants={warrants}
            onAddWarrant={handleAddWarrant}
          />
          
          <ActiveUnits units={activeUnits} />
        </div>
      </div>
    </div>
  );
};

export default Index;
