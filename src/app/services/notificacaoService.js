import { mensagemErro } from '../../components/toastr';
import ApiService from '../apiservice';
import ErroValidacao from '../exceptions/ErroValidacao';
class notificacaoService extends ApiService {
  constructor() {
    super('/v1/notificacoes');
  }

  salvar(notificacao) {
    this.validar(notificacao);
    return this.post('/', notificacao);
  }

  editar(notificacao) {
    this.validar(notificacao);
    return this.put('/', notificacao);
  }

  listar() {
    return this.get('/v1/notificacoes');
  }

  deletarPeloId(id) {
    return this.delete(`/${id}`);
  }

  buscarPeloId(id) {
    return this.get(`/v1/membros/${id}`);
  }

  validar(notificacao) {
    const erros = [];

    if (!notificacao.mensagem) {
      erros.push('O campo mensagem é obrigatório');
    }
    if (!notificacao.titulo) {
      erros.push('O campo titulo é obrigatório');
    }

    if (erros && erros.length > 0) {
      erros.forEach((e) => mensagemErro(e));
      throw new ErroValidacao(erros);
    }
  }
}
export default notificacaoService;
