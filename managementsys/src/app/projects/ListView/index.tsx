import Header from '@/(components)/Header';
import { Task, useGetTasksQuery } from '@/state/api';
import TaskCard from '@/(components)/TaskCard';
import React, { useMemo } from 'react'
import { PlusSquare } from 'lucide-react';
import { FilterState } from '@/(components)/ModalFilter';

type Props = {
    id:string;
    setIsModalNewTaskOpen:(isOpen:boolean)=>void;
    searchTerm?: string;
    filters?: FilterState;
}

const ListView = ({id,setIsModalNewTaskOpen, searchTerm = "", filters}: Props) => {
  const {data:tasks,error,isLoading}=useGetTasksQuery({projectId:Number(id)})
  
  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    
    return tasks.filter((task) => {
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
    });
  }, [tasks, searchTerm, filters]);

  if(isLoading) return <div>Loading...</div>;
  if(error){
         return <div>An error occurred while fetching tasks</div>}
  return (
    <div className="px-4 pb-8 xl:px-6">
        <div className="pt-5">
            <Header name="List"
            buttonComponent={
              <button className="flex items-center rounded-md bg-pink-400 px-3 py-2 text-white hover:bg-pink-600"
              onClick={()=>setIsModalNewTaskOpen(true)}
              >
                <PlusSquare className="mr-2 h-5 w-5"/> Add Task
              </button>
            }
            isSmallText
            />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filteredTasks?.map((task:Task)=>
                <TaskCard key={task.id} task={task} />
            )}
        </div>
        {filteredTasks.length === 0 && tasks && tasks.length > 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-neutral-400">
            No tasks match your search or filter criteria.
          </div>
        )}
        </div>
  )
}

export default ListView