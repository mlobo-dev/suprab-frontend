import { mensagemErro } from '../../components/toastr';
import ApiService from '../apiservice';
import ErroValidacao from '../exceptions/ErroValidacao';
class FuncionarioService extends ApiService {
  constructor() {
    super('/v1/membros');
  }

  salvar(funcionario) {
    this.validar(funcionario);
    return this.post('/', funcionario);
  }

  editar(funcionario) {
    this.validar(funcionario);
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
    if (!funcionario.cgp) {
      erros.push('O campo CGP é obrigatório');
    }
    if (!funcionario.cep) {
      erros.push('O campo cep é obrigatório');
    }

    if (!funcionario.cpf) {
      erros.push('O campo cep é obrigatório');
    }

    if (!funcionario.dataNascimento) {
      erros.push('O campo data de nascimento é obrigatório');
    }

    if (!funcionario.cidade) {
      erros.push('O campo cidade é obrigatório');
    }

    if (!funcionario.uf) {
      erros.push('O campo uf é obrigatório');
    }

    if (!funcionario.cargo) {
      erros.push('O campo cargo é obrigatório');
    }

    if (!funcionario.tituloHonorifico) {
      erros.push('O campo Título Honorífico é obrigatório');
    }

    if (funcionario.corposFilosoficos.length !== 0) {
      funcionario.corposFilosoficos.forEach((corpoFilosofico) => {
        if (!corpoFilosofico.corpo) {
          erros.push('Corpo filosófico deve ser informado');
        }

        if (!corpoFilosofico.grau) {
          erros.push('O Grau deve ser informado');
        }

        if (!corpoFilosofico.corpo) {
          erros.push('A Data do Grau deve ser informada');
        }
      });
    }

    if (erros && erros.length > 0) {
      erros.forEach((e) => mensagemErro(e));
      throw new ErroValidacao(erros);
    }
  }
}
export default FuncionarioService;
