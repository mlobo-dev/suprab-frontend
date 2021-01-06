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
    idMembro: 1,
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
      .deletar(this.state.idMembro.id)
      .then((response) => {
        const repertorios = this.state.membros;
        const index = repertorios.findIndex(
          (r) => r.id === this.state.idMembro.id
        );

        repertorios.splice(index, 1);
        this.setState({ repertorios: repertorios, showConfirmDialog: false });

        mensagemSucesso('Deletado com sucesso!');
      })
      .catch((error) => {
        mensagemErro(error);
      });
  };

  abrirConfirmacao = async (repertorio) => {
    this.setState({
      showConfirmDialog: true,
      repertorioDeletar: await (await this.service.buscarPeloId(repertorio))
        .data,
    });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, repertorioDeletar: [] });
  };

  render() {
    const confirmDialogFooter = (
      <div>
        <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
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
          deleteAction={this.abrirConfirmacao}
          editarAction={this.editar}
          data={this.data}
        ></FuncionarioTable>
        <div>
          <Dialog
            header="Deletar Repertório"
            visible={this.state.showConfirmDialog}
            style={{ width: '50vw' }}
            modal={true}
            footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false })}
          >
            Confirma a exclusão desse repertório? essa ação não poderá ser
            desfeita.
          </Dialog>
        </div>
      </Card>
    );
  }
}
Home.contextType = AuthContext;
export default Home;
