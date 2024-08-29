import * as create from './Create' // estamos usando alias
import * as getAll from './GetAll'
import * as deleteById from './DeleteById'
import * as updateById from './UpdateById'
import * as getById from './GetById'
// ... é o spread, estamos basicamente inserindo diretamente um elemento aqui
export const CidadesController = {
    ...create, 
    ...getAll,
    ...deleteById,
    ...getById,
    ...updateById,
};