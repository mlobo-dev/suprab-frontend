import ApiService from '../apiservice'
import ErroValidacao from '../exceptions/ErroValidacao'
class RepertorioService extends ApiService {
    constructor() {
        super('/repertorios')
    }



    salvar(repertorio) {
        return this.post('/', repertorio)
    }

    listar() {
        return this.get('/')
    }

    buscarPeloId(id) {
        return this.get(`/${id}`)
    }


    deletar(id) {
        return this.delete(`/${id}`)
    }


    validar(repertorio) {
        const erros = []

        if (!repertorio.nome) {
            erros.push('O campo nome é obrigatório')
        }
        if (!repertorio.dataExecucao) {
            erros.push('O campo Artista é obrigatório')
        }
        if (!repertorio.items) {
            erros.push('O campo nome é obrigatório')
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }

}
export default RepertorioService;