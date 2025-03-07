import Sidebar from '../../components/Sidebar/Sidebar';
import React, { useState } from 'react';
import Helplines from './support';
import Rights from './rights';
import Hospitals from './hospital';

const Helps = () => {
  const [activeTab, setActiveTab] = useState('helplines');

  const tabs = [
    { id: 'helplines', label: 'Helplines' },
    { id: 'rights', label: 'Know Your Rights' },
    { id: 'hospitals', label: 'Nearby Hospitals' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'helplines':
        return <Helplines />;
      case 'rights':
        return <Rights />;
      case 'hospitals':
        return <Hospitals />;
      default:
        return null;
    }
  };

  return (
    <div className="flex pt-2">
      {/* Sidebar Component */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="mb-6 border-b">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-4 focus:outline-none ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Helps;
