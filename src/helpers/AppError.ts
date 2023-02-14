export class AppError extends Error {
    statusCode: Number;
    status: any;
    errors: any = null;
    isOperationalError: boolean;
    details: string;

    constructor(message: string, statusCode: Number, errors: any = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = false;
        this.errors = errors;
        this.details = message;
        this.isOperationalError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
