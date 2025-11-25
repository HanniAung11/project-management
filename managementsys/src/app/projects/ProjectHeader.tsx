"use client"
import { Clock, Filter, Grid3x3, List, PlusSquare, Search, Share2, Table } from 'lucide-react';
import Header from '../../(components)/Header';
import React,{useState} from 'react'
import ModalNewProject from './ModalNewProject'
import ModalFilter, { FilterState } from '@/(components)/ModalFilter';
import { useGetUsersQuery } from '@/state/api';

type Props = {
    activeTab:string;
    setActiveTab:(tabName:string)=>void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
}

function ProjectHeader({activeTab,setActiveTab, searchTerm, onSearchChange, filters, onFiltersChange}: Props) {
  console.log("ProjectHeader rendering");
  const [isModalNewProjectOpen,setIsModalNewProjectOpen]=useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { data: users } = useGetUsersQuery();

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert('Project URL copied to clipboard!');
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Project URL copied to clipboard!');
      } catch {
        alert('Failed to copy URL. Please copy manually: ' + url);
      }
      document.body.removeChild(textArea);
    }
  };

  const hasActiveFilters = filters.priority || filters.status || filters.assigneeId || filters.tag;

    return (
    <div className="px-4 xl:px-6">
      <ModalNewProject isOpen={isModalNewProjectOpen} onClose={()=>setIsModalNewProjectOpen(false)}/>
      <ModalFilter 
        isOpen={isFilterModalOpen} 
        onClose={()=>setIsFilterModalOpen(false)}
        onApplyFilters={onFiltersChange}
        currentFilters={filters}
        availableUsers={users || []}
      />

        <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
            <Header name="Product Design Development"
            buttonComponent={
              <button className="flex items-center rounded-md bg-pink-400 px-3 py-2 text-white hover:bg-pink-600"
              onClick={()=>setIsModalNewProjectOpen(true)}
              >
                <PlusSquare className="mr-2 h-5 w-5"/>New Board
              </button>
            }/>
        </div>
        {/* TABS */}
        <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
          <div className="flex flex-1 items-center gap-2 md:gap-4">
            <TabButton name="Board" icon={<Grid3x3 className="h-5 w-5" />} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <TabButton name="List" icon={<List className="h-5 w-5" />} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <TabButton name="Timeline" icon={<Clock className="h-5 w-5" />} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <TabButton name="Table" icon={<Table className="h-5 w-5" />} setActiveTab={setActiveTab} activeTab={activeTab}/>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className={`text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 relative ${
                hasActiveFilters ? 'text-pink-500 dark:text-pink-400' : ''
              }`}
              title="Filter tasks"
            >
              <Filter className="h-5 w-5"/>
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-pink-500 rounded-full"></span>
              )}
            </button>
            <button 
              onClick={handleShare}
              className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300"
              title="Share project"
            >
              <Share2 className="h-5 w-5"/>
            </button>
            <div className="relative">
              <input 
                type='text' 
                placeholder="Search Task" 
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500"/>
            </div>
          </div>
        </div>
    </div>
  );
};
type TabButtonProps={
  name:string;
  icon:React.ReactNode;
  setActiveTab:(tabName:string)=>void;
  activeTab:string;
};
const TabButton=({name,icon,setActiveTab,activeTab}:TabButtonProps)=>{
  const isActive= (activeTab===name);
  return (
    <button 
      className={`
        relative flex items-center gap-2 px-1 py-2 sm:px-2 lg:px-4
        transition-all duration-200
        after:absolute after:-bottom-[9px] after:left-0 after:h-[3px] after:w-full 
        after:transition-all after:duration-200
        ${isActive 
          ? "text-gray-500 hover:text-pink-400  after:bg-pink-400 dark:text-white font-semibold" 
          : "text-gray-500 hover:text-pink-400 hover:bg-pink-50 dark:text-neutral-500 dark:hover:text-white dark:hover:bg-neutral-800 after:bg-transparent"
        }
      `}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  )
}
export default ProjectHeader