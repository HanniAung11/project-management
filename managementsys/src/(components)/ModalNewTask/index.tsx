import Modal from '@/(components)/Modal';
import {  Priority, Status, useCreateTaskMutation } from '@/state/api';
import React, { useState, useEffect } from 'react'
import {formatISO} from "date-fns";
type Props = {
    isOpen:boolean;
    onClose:()=>void;
    id?:string | null;
}

const ModalNewTask = ({isOpen,onClose,id=null}: Props) => {
  const [createTask,{isLoading, isSuccess}]=useCreateTaskMutation();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [status,setStatus]=useState<Status>(Status.ToDo);
  const [priority,setPriority]=useState<Priority>(Priority.Backlog);
  const [tags,setTags]=useState("");
  const [startDate,setStartDate]=useState("");
  const [dueDate,setDueDate]=useState("");
  const [points,setPoints]=useState("");
  const [authorUserId,setAuthorUserId]=useState("");
  const [assignedUserId,setAssignedUserId]=useState("");
  const [projectId,setProjectId]=useState("");
  // Reset form and close modal on success
  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setStatus(Status.ToDo);
      setPriority(Priority.Backlog);
      setTags("");
      setStartDate("");
      setDueDate("");
      setPoints("");
      setAuthorUserId("");
      setAssignedUserId("");
      onClose();
    }
  }, [isSuccess, onClose]);

  const handleSubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    if(!title || !authorUserId || (id === null && !projectId)) return;
    
    try {
      const taskData: any = {
        title,
        description: description || undefined,
        status: status || Status.ToDo, // Ensure status is always set
        priority,
        tags: tags || undefined,
        authorUserId: parseInt(authorUserId),
        projectId: id!==null ?Number(id):Number(projectId)
      };

      // Only add dates if they are provided
      if (startDate) {
        taskData.startDate = formatISO(new Date(startDate), {representation:"complete"});
      }
      if (dueDate) {
        taskData.dueDate = formatISO(new Date(dueDate), {representation:"complete"});
      }
      
      // Only add points if provided and valid
      if (points && !isNaN(Number(points))) {
        taskData.points = Number(points);
      }
      
      // Only add assignedUserId if provided and valid
      if (assignedUserId && !isNaN(parseInt(assignedUserId))) {
        taskData.assignedUserId = parseInt(assignedUserId);
      }
      
      await createTask(taskData).unwrap();
    } catch (error) {
      console.error('Failed to create task:', error);
      // You might want to show an error message to the user here
    }
  };
  const isFormValid=()=>{
    return title && authorUserId && (id !== null || projectId);
  };
  const selectStyles="mb-4 block w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  const inputStyles="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
        <form
            className="mt-4 space-y-6" onSubmit={handleSubmit}
        >
            <input type="text" className={inputStyles} placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <textarea className={inputStyles} placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <select className={selectStyles} value={status} onChange={(e)=>setStatus(Status[e.target.value as keyof typeof Status])}>
                    <option value={Status.ToDo}>To Do</option>
                    <option value={Status.WorkInProgress}>Work In Progress</option>
                    <option value={Status.UnderReview}>Under Review</option>
                    <option value={Status.Completed}>Completed</option>
                </select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <select className={selectStyles} value={priority} onChange={(e)=>setPriority(Priority[e.target.value as keyof typeof Priority])}>
                    <option value={Priority.Backlog}>Backlog</option>
                    <option value={Priority.Urgent}>Urgent</option>
                    <option value={Priority.High}>High</option>
                    <option value={Priority.Medium}>Medium</option>
                    <option value={Priority.Low}>Low</option>
                </select>
            </div>
            <input type="text" className={inputStyles} placeholder="Tags(comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)}/>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
            <input type="date" className={inputStyles} value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
            <input type="date" className={inputStyles} value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/>
            </div>
            <input type="number" className={inputStyles} placeholder="Points" value={points} onChange={(e)=>setPoints(e.target.value)}/>
            <input type="number" className={inputStyles} placeholder="Author User ID *" value={authorUserId} onChange={(e)=>setAuthorUserId(e.target.value)} required/>
            <input type="number" className={inputStyles} placeholder="Assigned User ID (optional)" value={assignedUserId} onChange={(e)=>setAssignedUserId(e.target.value)}/>
            {
              id===null && (
                <input type="number" className={inputStyles} placeholder="ProjectId" value={projectId} onChange={(e)=>setProjectId(e.target.value)}/>
              )
            }
            <button type="submit" className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-pink-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus-offset-2 
            ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50":""}`}
            disabled={!isFormValid() || isLoading}>
                {isLoading ? "Creating...":"Create Task"}
            </button>
        </form>
    </Modal>
  )
}

export default ModalNewTask