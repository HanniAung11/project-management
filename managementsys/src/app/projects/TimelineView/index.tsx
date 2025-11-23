import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import React, { useMemo, useState } from 'react';
import {DisplayOption, Gantt, ViewMode} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { FilterState } from '@/(components)/ModalFilter';

type Props = {
    id:string;
    setIsModalNewTaskOpen:(isOpen:boolean)=>void;
    searchTerm?: string;
    filters?: FilterState;
}
type TaskTypeItems="task"| "milestone"| "project";
const Timeline = ({id,setIsModalNewTaskOpen, searchTerm = "", filters}: Props) => {
    const isDarkMode=useAppSelector((state)=>state.global.isDarkMode);
    const {
            data:tasks,
            isLoading,
            error,
        }=useGetTasksQuery({projectId:Number(id)});
    const [displayOptions,setDisplayOptions]=useState<DisplayOption>({
        viewMode:ViewMode.Month,
        locale:"en-US"
    })
    const ganttTasks=useMemo(()=>{
        if (!tasks) return [];
        
        return tasks
            .filter((task) => {
                // Filter out tasks without dates
                if (!task.startDate || !task.dueDate) return false;
                
                // Validate that dates are actually valid
                const startDate = new Date(task.startDate as string);
                const endDate = new Date(task.dueDate as string);
                
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return false;

                // Search filter
                if (searchTerm) {
                  const searchLower = searchTerm.toLowerCase();
                  const matchesSearch = 
                    task.title?.toLowerCase().includes(searchLower) ||
                    task.description?.toLowerCase().includes(searchLower) ||
                    task.tags?.toLowerCase().includes(searchLower);
                  if (!matchesSearch) return false;
                }

                // Priority filter
                if (filters?.priority && task.priority !== filters.priority) {
                  return false;
                }

                // Status filter
                if (filters?.status && task.status !== filters.status) {
                  return false;
                }

                // Assignee filter
                if (filters?.assigneeId && task.assignedUserId !== filters.assigneeId) {
                  return false;
                }

                // Tag filter
                if (filters?.tag) {
                  const tagLower = filters.tag.toLowerCase();
                  const taskTags = task.tags?.toLowerCase() || '';
                  if (!taskTags.includes(tagLower)) {
                    return false;
                  }
                }
                
                return true;
            })
            .map((task)=>({
                start:new Date(task.startDate as string),
                end:new Date(task.dueDate as string),
                name:task.title,
                id:`Task-${task.id}`,
                type:"task" as TaskTypeItems,
                progress:task.points ? (task.points /10) * 100 : 0,
                isDisable:false
            }));
    },[tasks, searchTerm, filters]);

    const handleViewModeChange=(
        event:React.ChangeEvent<HTMLSelectElement>,
    )=>{
        setDisplayOptions((prev)=>({
            ...prev,
            viewMode:event.target.value as ViewMode,
        }))
    }

    if(isLoading) return <div>Loading...</div>;
    if(error){
         return <div>An error occurred while fetching tasks</div>}
    return (
    <div className="px-4 xl:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 py-5">
            <h1 className="me-2 text-lg font-bold dark:text-white">
                Project Tasks Timeline
            </h1>
            <div className="relative inline-block w-64">
                <select className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:bg-dark-secondary dark:text-white"
                    value={displayOptions.viewMode}
                    onChange={handleViewModeChange}>
                        <option value={ViewMode.Day}>Day</option>
                        <option value={ViewMode.Week}>Week</option>
                        <option value={ViewMode.Month}>Month</option>
                </select>
            </div>
        </div>
        <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
            <div className="timeline">
                {ganttTasks.length > 0 ? (
                    <Gantt 
                    tasks={ganttTasks}
                    {...displayOptions}
                    columnWidth={displayOptions.viewMode === ViewMode.Month ? 150:100}
                    listCellWidth="100px"
                    barBackgroundColor={isDarkMode ? "#101214":"#aeb8c2"}
                    barBackgroundSelectedColor={isDarkMode ? "#000":"#9ba1a6"}
                    />
                ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No tasks with valid dates to display. Please add tasks with start and due dates.
                    </div>
                )}
            </div>
            <div className="px-4 pb-5 pt-1">
                <button className="flex items-center rounded bg-pink-400 px-3 py-2 text-white hover:bg-pink-600"
                onClick={()=> setIsModalNewTaskOpen(true)}
                >
                    Add New Task
                </button>
            </div>
        </div>
    </div>
  )
}

export default Timeline