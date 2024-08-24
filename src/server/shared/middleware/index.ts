import * as yup from "yup";
import {StatusCodes} from "http-status-codes"
import { Express, Request, RequestHandler, Response } from "express";



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

// Função para pegar qualquer tipo de esquema e forçar o typescript a notificar erro
type TGetSchema = <T extends object>(schema: yup.ObjectSchema<T>) => yup.ObjectSchema<T>;

// Essa função pode retornar todos os esquemas de uma vez, mas não só isso, podemos trabalhar com mais de um esquema ou partes de um esquema 
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllScheamas>;

// Criamos um request handler que recebe qualquer tipo de esquema
type Tvalidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

// Objeto funcional que valida um conjunto de schemas
export const validation: Tvalidation = (getAllSchemas) => async (req, res, next) => {

    const schemas = getAllSchemas((schema) => schema);
    
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try{
            /* ValidateSync executa a função para depois retornar erro ou outra coisa,  Validate retorna uma promise */
            schema.validateSync(req[key as TProperty], {abortEarly: false});
        }catch(err){
            const yupError = err as yup.ValidationError;
            const errors: Record<string, string> = {};
    
            yupError.inner.forEach( error => {
                    if(error.path === undefined) return;
                    errors[error.path] = error.message;
                }
            );
            errorsResult[key] = errors;
        }
    });
    
    if(Object.entries(errorsResult).length === 0){
        next();
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({errorsResult});
    }
    
}