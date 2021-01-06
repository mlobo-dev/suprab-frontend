import React, { useState } from 'react';
import Card from '../../components/card';
import Masks from '../../utils/masks';
import FormGroup from '../../components/form-group';
import { withRouter } from 'react-router-dom';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import SelectMenu from '../../components/select-menu';

import NotificacaoService from '../../app/services/notificacaoService';

class CadastroFuncionario extends React.Component {
  state = {
    id: 0,
    titulo: '',
    mensagem: '',
  };

  constructor() {
    super();
    this.service = new NotificacaoService();
  }

  cadastrar = () => {
    // const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    const { titulo, mensagem } = this.state;

    const notificacao = {
      titulo,
      mensagem,
    };

    this.service
      .salvar(notificacao)
      .then(() => {
        this.props.history.push('/notificacoes');
        mensagemSucesso('Salvo com Sucesso!');
      })
      .catch((error) => {
        mensagemErro(
          'Erro ao tentar salvar o Notificação',
          error.response.data
        );
      });
  };

  cancelar = () => {
    this.props.history.push('/notificacoes');
  };

  handleChange = (evento) => {
    const value = evento.target.value;
    const name = evento.target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Card title="Cadastro de Mensagens">
        <div className="col-lg-4 mx-auto">
          <FormGroup label="Título: *" htmlFor="inputTitulo">
            <input
              type="text"
              value={this.state.titulo}
              onChange={this.handleChange}
              className="form-control"
              name="titulo"
              id="inputTitulo"
              aria-describedby="nameHelp"
              placeholder="Informe o título"
            />
          </FormGroup>
        </div>

        <div className="col-lg-4 mx-auto">
          <FormGroup label="Mensagem: *" htmlFor="inputMensagem">
            <textarea
              rows="4"
              value={this.state.mensagem}
              onChange={this.handleChange}
              className="form-control"
              name="mensagem"
              id="inputMensagem"
              aria-describedby="inputMensagem"
              placeholder="Informe a mensagem"
            ></textarea>
          </FormGroup>
        </div>

        <br />
        <div className="row">
          <div className="col-lg-4 mx-auto">
            <button
              onClick={this.state.id > 0 ? this.editar : this.cadastrar}
              className="btn btn-success"
            >
              <i className="pi pi-save"></i> Salvar
            </button>
            <button onClick={this.cancelar} className="btn btn-danger">
              <i className="pi pi-times"></i> cancelar
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroFuncionario);
