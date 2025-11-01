'use client';

import { useState } from 'react';
import { 
  FiUsers,
  FiHash,
  FiGlobe,
  FiMessageCircle,
  FiGrid,
  FiCompass,
  FiLayout,
  FiBookOpen,
  FiStar
} from 'react-icons/fi';
import { 
  BsPeople, 
  BsGlobe2, 
  BsCompass 
} from 'react-icons/bs';
import { 
  HiOutlineUserGroup, 
  HiOutlineNewspaper, 
  HiOutlineGlobeAlt 
} from 'react-icons/hi';

interface FilterTab {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface FilterTabsProps {
  onFilterChange: (filterId: string) => void;
}

export default function FilterTabs({ onFilterChange }: FilterTabsProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters: FilterTab[] = [
    { 
      id: 'all', 
      icon: HiOutlineUserGroup,
      label: 'Feeds' 
    },
    { 
      id: 'pages', 
      icon: HiOutlineNewspaper,
      label: 'Pages' 
    },
    { 
      id: 'explore', 
      icon: HiOutlineGlobeAlt,
      label: 'Explore' 
    }
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="px-3 py-1.5 border-b border-gray-100 bg-white">
      <div className="flex gap-1.5">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
              activeFilter === filter.id 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            <filter.icon 
              className="mr-1.5 flex-shrink-0"
              size={14}
            />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 