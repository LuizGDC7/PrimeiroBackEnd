import * as yup from "yup";
import {StatusCodes} from "http-status-codes"
import { Express, Request, RequestHandler, Response } from "express";

/*

Preciso => req, res para poder usar as paradas do express
        => Tipo genérico T para a interface, e U para objeto para poder fazer as validações

*/

/* MINHA SOLUÇÃO PARA VALIDAÇÃO GENÉRICA

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

*/

// Definimos aqui o tipo de parâmetro que estamos recebendo na requisição
type TProperty = 'body' | 'header' | 'params' | 'query';

// Associamos a cada tipo de parâmetro um schema genérico
type TAllScheamas = Record<TProperty, yup.Schema<any>>;

// Criamos um request handler que recebe qualquer tipo de esquema
type Tvalidation = (schemas: Partial<TAllScheamas>) => RequestHandler;

// Objeto funcional que valida um conjunto de schemas
export const validation: Tvalidation = (schemas) => async (req, res, next) => {
    
    const errorsResult: Record<TProperty, Record<string, string>> = {};

    Object.entries(schemas).forEach(async ([key, schema]) => {
        try{
            /* ValidateSync executa a função para depois retornar erro ou outra coisa,  Validate retorna uma promise */
            await schema.validateSync(req[key as TProperty], {abortEarly: false});
            //return next();
        }catch(err){
            const yupError = err as yup.ValidationError;
            const errors: Record<string, string> = {};
    
            yupError.inner.forEach( error => {
                    if(error.path === undefined) return;
                    errors[error.path] = error.message;
                }
            );
            errorsResult[key as TProperty] = errors;
        }
        
        if(Object.entries(errorsResult).length === 0){
            return res.status(StatusCodes.BAD_REQUEST).json({errorsResult});
        }else{
            next();
        }
    }
    
);

}