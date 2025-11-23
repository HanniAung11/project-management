import type {Request,Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async(
    req:Request,
    res:Response
):Promise<void> => {
    const {query}=req.query;
    
    if(!query || typeof query !== 'string' || query.trim().length === 0){
        res.json({tasks:[],projects:[],users:[]});
        return;
    }
    
    const searchTerm = query as string;
    
    try{
        const tasks=await prisma.task.findMany({
            where:{
                OR:[
                    {title:{contains:searchTerm, mode:'insensitive'}},
                    {description:{contains: searchTerm, mode:'insensitive'}},
                    {tags:{contains: searchTerm, mode:'insensitive'}}
                ]
            },
            include:{
                author:true,
                assignee:true,
                project:true
            }
        })

        const projects=await prisma.project.findMany({
            where:{
                OR:[
                    {name:{contains:searchTerm, mode:'insensitive'}},
                    {description:{contains: searchTerm, mode:'insensitive'}}
                ]
            }
        })
        
        const users=await prisma.user.findMany({
            where:{
                username:{contains:searchTerm, mode:'insensitive'}
            }
        })
        
        res.json({tasks,projects,users});
    }catch(error:any){
        console.error('Search error:', error);
        res.status(500).json({message:`Error performing search:${error.message}`});
        
    }
};