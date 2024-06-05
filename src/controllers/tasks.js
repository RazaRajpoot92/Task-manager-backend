import { Task } from "../models/task.js"
import { asyncWraper } from "../middlewares/asynWrapper.js"
import { createCustomError } from "../custom-errors/custom-error.js"

export const getAllTask = asyncWraper( async (req,res)=>{
        const tasks = await Task.find({})
        res.status(200).json(tasks)
})

export const createNewTask = asyncWraper( async (req,res)=>{

    const {body} = req
    const newTask = new Task(body)
    await newTask.save()
    res.status(201).send(newTask)           
    
})

export const getTaskById = asyncWraper(async (req,res,next)=>{
    
    const {id:taskID} = req.params 
    const task = await Task.findById(taskID)
    if(!task){
     return next(createCustomError("Not Found",404) )  
    }
    res.status(200).json(task)
})

export const deleteTaskById = asyncWraper( async (req,res)=>{
    
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task) return res.status(404).json({msg:`task not found with ID: ${taskID}`})
    res.status(200).json(task)    
   
})
    
export const updateTaskById = asyncWraper(async (req,res)=>{
        
    const {id:taskID} = req.params
    const task = await Task.findByIdAndUpdate(taskID, req.body,{new:true, runValidators:true})
    if(!task) return res.status(404).json({msg:`Task not found with id: ${taskID}`})
    res.status(200).json(task)    
       
})