import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../errors/database.error.model";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    if (error instanceof DatabaseError) {
        res.send(StatusCodes.BAD_REQUEST);      
    }else{

        res.send(StatusCodes.INTERNAL_SERVER_ERROR); 
    }    
}

export default errorHandler;