import { Request, RequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR, StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

// Request e Response são do express

//INTERFACES 

interface IQueryProps{
    page?: number;
    limit?: number;
    filter?: string;
}

//BODY VALIDATION

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
    
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

    //const data:IQueryProps = req.query;

    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};