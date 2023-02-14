export default class HttpException extends Error {
    statusCode?: number;
    status?: number;
    message: string;
    error?: any = null;

    constructor(message: string, statusCode: number, error: any = null) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
