import Header from '@/(components)/Header';
import { Task, useGetTasksQuery } from '@/state/api';
import TaskCard from '@/(components)/TaskCard';
import React from 'react'
import { PlusSquare } from 'lucide-react';

type Props = {
    id:string;
    setIsModalNewTaskOpen:(isOpen:boolean)=>void;

}

const ListView = ({id,setIsModalNewTaskOpen}: Props) => {
  const {data:tasks,error,isLoading}=useGetTasksQuery({projectId:Number(id)})
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
            {tasks?.map((task:Task)=>
                <TaskCard key={task.id} task={task} />
            )}
        </div>
        </div>
  )
}

export default ListView