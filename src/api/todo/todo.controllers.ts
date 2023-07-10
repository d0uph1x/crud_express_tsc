import { NextFunction, Request, Response } from "express";
import { Todo, TodoWithId, Todos } from "./todo.model";
import {ObjectId} from 'mongodb';
import { paramsWithId } from "../interfaces/paramsWithId";

export const getTodos = async (req:Request, res:Response<TodoWithId []>, next:NextFunction)=>{
    try {
        const result = await Todos.find();
        const todos = await result.toArray();
        res.status(200).json(todos)
    } catch (error) {
        next(error);
    }
}

export const createTodo = async (req:Request<{},Todo>, res:Response<TodoWithId>, next:NextFunction)=>{
    try {
        const insertedResult = await Todos.insertOne(req.body);
        res.status(201).json({
            _id:insertedResult.insertedId,
            ...req.body
        });
    } catch (error) {
        next(error);
    }
}


export const getTodo = async (req:Request<paramsWithId, TodoWithId, {}>, res:Response<TodoWithId>, next:NextFunction)=>{
    try {
        const todo = await Todos.findOne({
            _id: new ObjectId(req.params.id)
        })
        console.log(todo)
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404);
            throw new Error(`Todo with id ${req.params.id} not found`);
        }
        
    } catch (error) {
        next(error);
    }
}


export const updateTodo = async (req:Request<paramsWithId, TodoWithId, Todo>, res:Response<TodoWithId>, next:NextFunction)=>{
    try {
        const updatedTodo = await Todos.findOneAndUpdate(
            {_id: new ObjectId(req.params.id)},
            { $set: req.body },
            { returnDocument:'after' }
        );
        if (updatedTodo.value) {
            res.status(200).json(updatedTodo.value);
        } else {
            res.status(404);
            throw new Error(`Error updating todo`);
        }
        
    } catch (error) {
        next(error);
    }
}

export const deleteTodo = async (req:Request<paramsWithId, {} >, res:Response<{}>, next:NextFunction)=>{
    try {
        const deletedTodo = await Todos.findOneAndDelete(
            {_id: new ObjectId(req.params.id)}
        );
        
        if (deletedTodo.value) {
            res.status(200).json({});
        } else {
            res.status(404);
            throw new Error(`Error deleting todo`);
        }
        
    } catch (error) {
        next(error);
    }
}