import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

// Request e Response são do express

//INTERFACES 

interface Icidade{
    nome:string;
    estado: string;
    // nomes?: string; Exemplo, caso nome não fosse obrigatorio 
}

//BODY VALIDATION

const bodyValidation: yup.Schema<Icidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
});

export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {

    const data:Icidade = req.body;
    let validatedData: Icidade | undefined = undefined;
/*
    if(data.nome === undefined){
        return res.status(StatusCodes.BAD_REQUEST).send("Informe o nome corretamente");
    }
*/
    try{
        validatedData = await bodyValidation.validate(req.body, {abortEarly: false});
    }catch(err){
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach( error => {
                if(error.path === undefined) return;
                errors[error.path] = error.message;
            }
        );

        return res.status(StatusCodes.BAD_REQUEST).json({errors});
    }


    //console.log(data);

    return res.send('Create!');
};