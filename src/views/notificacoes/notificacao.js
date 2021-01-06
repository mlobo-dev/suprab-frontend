import React from 'react';
import { AuthContext } from '../../main/ProvedorAutenticacao';
import Card from '../../components/card';
import Table from './table';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import NotificacaoService from '../../app/services/notificacaoService';
class Home extends React.Component {
  state = {
    notificacoes: [],
    showConfirmDialog: false,
    idNotificacao: 0,
    notificacao: {},
    data: [],
  };

  constructor() {
    super();
    this.service = new NotificacaoService();
  }

  async componentDidMount() {
    this.data = await this.service
      .listar()
      .then((response) => this.setState({ notificacoes: response.data }));
    debugger;
  }

  deletar = async () => {
    this.service
      .deletarPeloId(this.state.notificacao.id)
      .then(() => {
        const notificacoes = this.state.notificacoes;
        const index = notificacoes.findIndex(
          (r) => r.id === this.state.notificacao.id
        );
        notificacoes.splice(index, 1);
        this.setState({ notificacoes: notificacoes, showConfirmDialog: false });
        mensagemSucesso('Deletado com sucesso!');
      })
      .catch((error) => {
        mensagemErro(error);
      });
  };

  abrirConfirmacao = (notificacao) => {
    this.setState({ showConfirmDialog: true, notificacao: notificacao });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, notificacao: {} });
  };

  render() {
    const confirmDialogFooter = (
      <div>
        <Button
          label="Sim"
          icon="pi pi-check"
          className="p-button-danger"
          onClick={this.deletar}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelarDelecao}
        />
      </div>
    );
    return (
      <Card title="Mensagens">
        <div className="jumbotron">
          <button
            className="btn btn-primary"
            onClick={(e) => this.props.history.push('/cadastro/notificacoes')}
          >
            Cadastrar
          </button>
        </div>

        {this.state.notificacoes.length > 0 && (
          <Table
            values={this.state.notificacoes}
            deletarAction={this.abrirConfirmacao}
            editarAction={this.editar}
            data={this.data}
          ></Table>
        )}

        <div>
          <Dialog
            header="Deletar notificacao"
            visible={this.state.showConfirmDialog}
            style={{ width: '30vw' }}
            modal={true}
            footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false })}
          >
            <p>
              Confirma a exclusão do notificacao{' '}
              <strong>{this.state.notificacao.titulo}</strong> ? essa ação não
              poderá ser desfeita.
            </p>
          </Dialog>
        </div>
      </Card>
    );
  }
}
Home.contextType = AuthContext;
export default Home;
