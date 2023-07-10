import {Request, Response, NextFunction} from 'express';


const notFound = (req:Request,res:Response,next:NextFunction) => {
    res.status(404);
    const error = new Error(` Not Found - ${req.originalUrl}`)
    next(error);
}

const errorHandler = (error:Error,req:Request,res:Response,next:NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        error: error.message,
        stackTrace: process.env.NODE_ENV === 'development' ? error.stack : null
    })
};

export {errorHandler, notFound };