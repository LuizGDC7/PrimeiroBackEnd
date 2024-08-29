import { Request, RequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR, StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

// Request e Response são do express

//INTERFACES 

interface IParamProps{
    id?:number; 
}

export const deleteByIdValidation = validation((getSchema) => ({

    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    
}));

export const deleteById = async (req: Request<{}, {}, IParamProps>, res: Response) => {

    const data:IParamProps = req.body;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};