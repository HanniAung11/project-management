import type {Request,Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async(
    req:Request,
    res:Response
):Promise<void> => {
    const {projectId}=req.query;
    try{
        const tasks=await prisma.task.findMany(
            {
                where:{
                    projectId:Number(projectId),
                },
                include:{
                    author:true,
                    assignee:true,
                    comments:{
                        include:{
                            user:true
                        }
                    },
                    attachments:true,
                },
            }
        );
        res.json(tasks);
    }catch(error:any){
        res.status(500).json({message:`Error retrieving tasks:${error.message}`});
        
    }
};



export const createTask = async(
    req:Request,
    res:Response
):Promise<void> => {
    const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
    }=req.body;
    try{
        // Build data object with only defined values
        const taskData: any = {
            title,
            projectId: Number(projectId),
            authorUserId: Number(authorUserId),
        };
        
        // Add optional fields only if they are provided
        if (description !== undefined && description !== null && description !== '') {
            taskData.description = description;
        }
        if (status !== undefined && status !== null) {
            taskData.status = status;
        }
        if (priority !== undefined && priority !== null) {
            taskData.priority = priority;
        }
        if (tags !== undefined && tags !== null && tags !== '') {
            taskData.tags = tags;
        }
        if (startDate !== undefined && startDate !== null && startDate !== '') {
            taskData.startDate = new Date(startDate);
        }
        if (dueDate !== undefined && dueDate !== null && dueDate !== '') {
            taskData.dueDate = new Date(dueDate);
        }
        if (points !== undefined && points !== null && points !== '') {
            taskData.points = Number(points);
        }
        if (assignedUserId !== undefined && assignedUserId !== null && assignedUserId !== '' && !isNaN(Number(assignedUserId))) {
            taskData.assignedUserId = Number(assignedUserId);
        }
        
        const newTask=await prisma.task.create({
            data: taskData
        })
       
        res.status(201).json(newTask);
    }catch(error:any){
        res.status(500).json({message:`Error creating a task:${error.message}`});
        
    }
}

export const updateTaskStatus = async(
    req:Request,
    res:Response
):Promise<void> => {
    const {taskId}=req.params;
    const {status}=req.body;

    try{
        const updatedTask=await prisma.task.update(
            {
                where:{
                   id:Number(taskId),
                },
                data:{
                    status:status,
                }
                
            }
        );
        res.json(updatedTask);
    }catch(error:any){
        res.status(500).json({message:`Error updatin tasks:${error.message}`});
        
    }
};

export const getUserTasks = async(
    req:Request,
    res:Response
):Promise<void> => {
    const {userId}=req.params;
    try{
        const tasks=await prisma.task.findMany(
            {
                where:{
                    OR:[
                        {authorUserId:Number(userId)},
                        {assignedUserId:Number(userId)}
                    ],
                },
                include:{
                    author:true,
                    assignee:true,
                
                },
            }
        );
        res.json(tasks);
    }catch(error:any){
        res.status(500).json({message:`Error retrieving tasks:${error.message}`});
        
    }
};



