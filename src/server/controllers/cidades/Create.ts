import { Request, Response } from "express";

// Request e Response são do express
interface Icidade{
    nome:string;
}

export const create = (req: Request<{}, {}, Icidade>, res: Response) => {

    const data:Icidade = req.body;

    console.log(data);

    return res.send('Create!');
};