"use client";
import React,{useState,use} from 'react'
import ProjectHeader from "../ProjectHeader";
import Board from '../BoardView';
import List from '../ListView';
import Timeline from '../TimelineView';
import Table from '../TableView';
import ModalNewTask from '@/(components)/ModalNewTask';
import { FilterState } from '@/(components)/ModalFilter';

type Props = {
    params:Promise<{id: string}>
}

const Project = ({params}: Props) => {
    const {id}=use(params);
    console.log("Project component rendering, id:", id);
    const [activeTab,setActiveTab]=useState("Board");
    const [isModalNewTaskOpen,setIsModalNewTaskOpen]=useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<FilterState>({
        priority: '',
        status: '',
        assigneeId: '',
        tag: ''
    });

  return (
    <div>
        {/* modal new tasks */}
        <ModalNewTask isOpen={isModalNewTaskOpen} onClose={()=>setIsModalNewTaskOpen(false)} id={id}/>
        <ProjectHeader 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
        />
        {activeTab==="Board" && (
            <Board 
                id={id} 
                setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                searchTerm={searchTerm}
                filters={filters}
            />
        )}
        {activeTab==="List" && (
            <List 
                id={id} 
                setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                searchTerm={searchTerm}
                filters={filters}
            />
        )}
        {activeTab==="Timeline" && (
            <Timeline 
                id={id} 
                setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                searchTerm={searchTerm}
                filters={filters}
            />
        )}
        {activeTab==="Table" && (
            <Table 
                id={id} 
                setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                searchTerm={searchTerm}
                filters={filters}
            />
        )}
    </div>
  )
}

export default Project;