import * as yup from "yup";
import {StatusCodes} from "http-status-codes"
import { Express, Request, Response } from "express";

/*

Preciso => req, res para poder usar as paradas do express
        => Tipo genérico T para a interface, e U para objeto para poder fazer as validações

*/

export async function BodyValidator<T>(req: Request<{}, {}, T>, res:Response, requirements: yup.Schema<T>){
    let validatedData: T | undefined = undefined;
    try{
        validatedData = await requirements.validate(req.body, {abortEarly: false});
    }catch(err){
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach( error => {
                if(error.path === undefined) return;
                errors[error.path] = error.message;
            }
        );

        throw res.status(StatusCodes.BAD_REQUEST).json({errors});
    }
};