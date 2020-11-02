import ApiService from '../apiservice'
import ErroValidacao from '../exceptions/ErroValidacao'
class FuncionarioService extends ApiService {
    constructor() {
        super('/v1/funcionarios')
    }


    salvar(funcionario) {
        return this.post('/', funcionario)
    }

    listar() {
        return this.get('/')
    }

    validar(funcionario) {
        const erros = []

        if (!funcionario.nome) {
            erros.push('O campo nome é obrigatório')
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }

}
export default FuncionarioService;