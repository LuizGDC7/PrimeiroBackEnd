"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.createQueryValidation = exports.createBodyValidator = void 0;
const yup = __importStar(require("yup"));
const middleware_1 = require("../../shared/middleware");
//BODY VALIDATION
const bodyValidation = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
});
const queryValidation = yup.object().shape({
    tipo: yup.string().required().min(4),
});
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
exports.createBodyValidator = (0, middleware_1.validation)('body', bodyValidation);
exports.createQueryValidation = (0, middleware_1.validation)('query', queryValidation);
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    return res.send('Create!');
});
exports.create = create;
