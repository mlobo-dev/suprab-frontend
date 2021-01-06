import ApiService from '../apiservice';
import ErroValidacao from '../exceptions/ErroValidacao';
class FuncionarioService extends ApiService {
  constructor() {
    super('/v1/membros');
  }

  salvar(funcionario) {
    return this.post('/', funcionario);
  }

  editar(funcionario) {
    return this.put('/', funcionario);
  }

  listar() {
    return this.get('/v1/membros');
  }

  deletarPeloId(id) {
    return this.delete(`/${id}`);
  }

  buscarPeloId(id) {
    return this.get(`/v1/membros/${id}`);
  }

  validar(funcionario) {
    const erros = [];

    if (!funcionario.nome) {
      erros.push('O campo nome é obrigatório');
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }
}
export default FuncionarioService;
