import {Router} from 'express';
import {StatusCodes} from 'http-status-codes'

const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá, dev!');
});

router.get('/teste', (req, res) => {
    return res.send('Testando segunda rota');
});

router.post('/envio', (req, res) => {
    //console.log(req.body);
    //return res.send(req.body); //também funciona
    return res.json(req.body); // Parece funcionar melhor ainda com JSON
});

// FORMAS DE ENVIAR DADOS PELA URL

router.post('/envio1:dado1', (req, res) => {
    //exemplo de uso: /envio1:55 => vai pegar o 55
    console.log(req.params);
    return res.json(req.body); 
});

router.post('/envio2', (req, res) => {
    // exemplo de uso: /envio2?dado2=79 => vai pegar o 79
    console.log(req.query.dado2)
    return res.json(req.body); 
});

router.post('/envio3', (req, res) => {
    // Ainda não aprendemos a usar
    return res.json(req.cookies); 
});

// COMO MANDAR STATUS CODES PARA O FRONT END - EXEMPLOS 
// No lugar do StatusCodes você pode colocar o número referente ao código específico de mensagem. Exemplo: 202 == ACCEPTED

router.get("/bomEnvio", (req, res) => {
    return res.status(StatusCodes.ACCEPTED).json({amanda: "quarenta"});
});

router.post("/mauEnvio", (req, res) => {
    return res.status(StatusCodes.BAD_REQUEST).json({amanda: "infinito"});
});

export {router};