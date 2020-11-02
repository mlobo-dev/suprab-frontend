import ApiService from '../apiservice'
import ErroValidacao from '../exceptions/ErroValidacao'
class UsuarioService extends ApiService {
    constructor() {
        super('/v1/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorIdUsuario(id) {
        return this.get(`/saldo/${id}`)
    }

    salvar(usuario) {
        return this.post('/', usuario)
    }

    validar(usuario) {
        const erros = []

        if (!usuario.nome) {
            erros.push('O campo nome é obrigatório')
        }

        if (!usuario.login) {
            erros.push('O campo login é obrigatório')
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Os campos de senha são obrigatórios')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas não conferem')
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }

}
export default UsuarioService;