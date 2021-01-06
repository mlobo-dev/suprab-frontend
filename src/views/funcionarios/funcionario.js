import React from 'react';
import { AuthContext } from '../../main/ProvedorAutenticacao';
import Card from '../../components/card';
import FuncionarioTable from './table';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import FuncionarioService from '../../app/services/funcionarioService';
class Home extends React.Component {
  state = {
    membros: [],
    showConfirmDialog: false,
    idMembro: 0,
    membro: {},
    data: [],
  };

  constructor() {
    super();
    this.service = new FuncionarioService();
  }

  async componentDidMount() {
    this.data = await this.service
      .listar()
      .then((response) => this.setState({ membros: response.data }));
  }

  deletar = async () => {
    this.service
      .deletarPeloId(this.state.membro.id)
      .then(() => {
        const membros = this.state.membros;
        const index = membros.findIndex((r) => r.id === this.state.membro.id);
        membros.splice(index, 1);
        this.setState({ membros: membros, showConfirmDialog: false });
        mensagemSucesso('Deletado com sucesso!');
      })
      .catch((error) => {
        mensagemErro(error);
      });
  };

  abrirConfirmacao = (membro) => {
    this.setState({ showConfirmDialog: true, membro: membro });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, membro: {} });
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
      <Card title="Membros">
        <div className="jumbotron">
          <button
            className="btn btn-primary"
            onClick={(e) => this.props.history.push('/cadastro-funcionario')}
          >
            Cadastrar
          </button>

          {/* <button
                        className="btn btn-primary"
                        onClick={e => this.props.history.push('/cadastro-repertorio')}
                    >
                        Consultar
                    </button> */}
        </div>

        {}
        <FuncionarioTable
          membros={this.state.membros}
          deletarAction={this.abrirConfirmacao}
          editarAction={this.editar}
          data={this.data}
        ></FuncionarioTable>
        <div>
          <Dialog
            header="Deletar Membro"
            visible={this.state.showConfirmDialog}
            style={{ width: '30vw' }}
            modal={true}
            footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false })}
          >
            <p>
              Confirma a exclusão do membro{' '}
              <strong>{this.state.membro.nome}</strong> ? essa ação não poderá
              ser desfeita.
            </p>
          </Dialog>
        </div>
      </Card>
    );
  }
}
Home.contextType = AuthContext;
export default Home;
