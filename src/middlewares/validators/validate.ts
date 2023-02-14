import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import HttpException from "../../commons/httpException";

const validate = async (
    validations: ValidationChain[],
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
    };
    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }
    let firstError = errors.mapped()[Object.keys(errors.mapped())[0]],
        remainingErrors = Object.keys(errors.mapped()).length - 1;
    return next(
        new HttpException(
            `${firstError}.${remainingErrors ? " (and more errors(s))" : ""}`,
            422,
            errors.mapped()
        )
    );
};
export default validate;
