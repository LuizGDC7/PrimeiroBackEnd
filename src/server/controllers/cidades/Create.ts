import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

// Request e Response são do express

//INTERFACES 

interface Icidade{
    nome:string;
    estado: string;
    // nomes?: string; Exemplo, caso nome não fosse obrigatorio 
}

interface IFilter{
    tipo: string;
    quantidade?: number;
}

//BODY VALIDATION

//const bodyValidation: yup.Schema<Icidade> = ;

//const queryValidation: yup.Schema<IFilter> = ;

export const createValidation = validation((getSchema) => ({

    body: getSchema<Icidade>(yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(2),
    })),
    query: getSchema<IFilter>(yup.object().shape({
        tipo: yup.string().required().min(4),
        quantidade: yup.number().min(2),
    })),

}));

/*
export const cidadeValidator: RequestHandler = async (req, res, next) => {
    try{
        await BodyValidator<Icidade>(req, res, bodyValidation);
        return next();
    } catch(err){
        return err;
    }
}
*/

//export const createBodyValidator = validation('body', bodyValidation);

//export const createQueryValidation = validation('query', queryValidation)

export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {

    const data:Icidade = req.body;

    return res.send('Create!');
};