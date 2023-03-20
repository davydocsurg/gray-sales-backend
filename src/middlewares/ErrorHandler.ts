import { Request, Response, NextFunction } from "express";
import HttpException from "../commons/httpException";

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    // console.log(message, ' cast error');

    return new HttpException(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `${value} is already in use. Please enter another value!`;
    return new HttpException(message, 400);
};

const handleValidationErrorDB = (err: any) => {
    let errArr: Array<{}> = [];
    Object.keys(err.errors).forEach((key, index) => {
        errArr.push({ [key]: { message: err.errors[key]["message"] } });
    });
    return new HttpException("validation error", 422, errArr);
};

const sendErrorDev = (err: any, res: Response) => {
    res.status(err.statusCode || 500).json({
        error: err,
        errors: err.errors,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err: any, res: Response) => {
    // logger.error(err.details);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        errors: err.errors,
    });
};

export const errorHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    error.statusCode = error.statusCode;
    error.errors = error.errors || null;
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(error, response);
    } else if (process.env.NODE_ENV === "production") {
        let err = JSON.parse(JSON.stringify(error));
        if (err.name === "CastError") err = handleCastErrorDB(err);
        if (err.code === 11000) err = handleDuplicateFieldsDB(err);
        if (err.name === "ValidationError") err = handleValidationErrorDB(err);

        sendErrorProd(err, response);
    }
};
