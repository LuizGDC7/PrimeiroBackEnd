"use strict";
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
exports.BodyValidator = BodyValidator;
const http_status_codes_1 = require("http-status-codes");
/*

Preciso => req, res para poder usar as paradas do express
        => Tipo genérico T para a interface, e U para objeto para poder fazer as validações

*/
function BodyValidator(req, res, requirements) {
    return __awaiter(this, void 0, void 0, function* () {
        let validatedData = undefined;
        try {
            validatedData = yield requirements.validate(req.body, { abortEarly: false });
        }
        catch (err) {
            const yupError = err;
            const errors = {};
            yupError.inner.forEach(error => {
                if (error.path === undefined)
                    return;
                errors[error.path] = error.message;
            });
            throw res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors });
        }
    });
}
;
