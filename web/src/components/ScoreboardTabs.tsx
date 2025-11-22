import React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface ScoreboardTabsProps {
    activeTab: string;
    onTabChange: (id: string) => void;
}

const tabs: Tab[] = [
    { id: 'live', label: 'Live' },
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'report', label: 'Report' },
    { id: 'squads', label: 'Squads' },
];

export const ScoreboardTabs: React.FC<ScoreboardTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
            <div className="flex justify-between px-4 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
              py-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap
              ${activeTab === tab.id
                                ? 'border-[#0052D4] text-[#0052D4]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'}
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
