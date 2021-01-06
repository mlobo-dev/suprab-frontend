import React from 'react'
import { AuthContext } from '../../main/ProvedorAutenticacao'
import Card from '../../components/card'
import RepertorioService from '../../app/services/repertorioService';
import RepertorioTable from '../repertorio/repertorios-table'
import { mensagemSucesso, mensagemErro } from '../../components/toastr';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
class Home extends React.Component {

    state = {
        repertorios: [],
        showConfirmDialog: false,
        repertorioDeletar: [],
        data: []

    }

    constructor() {
        super();
        this.service = new RepertorioService();
    }

    async componentDidMount() {
        this.data = await this.service.listar();
            // .then(response => this.setState({ repertorios: response.data }));
        debugger;
    }

    deletar = async () => {


        this.service.deletar(this.state.repertorioDeletar.id)
            .then(response => {
                const repertorios = this.state.repertorios
                const index = repertorios.findIndex((r) => r.id === this.state.repertorioDeletar.id)

                repertorios.splice(index, 1)
                this.setState({ repertorios: repertorios, showConfirmDialog: false })

                mensagemSucesso('Deletado com sucesso!')
            }).catch(error => {
                mensagemErro(error)
            })

    }

    abrirConfirmacao = async (repertorio) => {
        this.setState({ showConfirmDialog: true, repertorioDeletar: await (await this.service.buscarPeloId(repertorio)).data })

    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, repertorioDeletar: [] })
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        return (
            <Card title="Membros">

                <div className="jumbotron">
                    <button
                        className="btn btn-primary"
                        onClick={e => this.props.history.push('/cadastro-funcionario')}
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
                
                <RepertorioTable
                    repertorios={this.state.repertorios}
                    deleteAction={this.abrirConfirmacao}
                    data={this.data.data}
                >
                </RepertorioTable>
                <div>
                    <Dialog
                        header="Deletar Repertório"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Confirma a exclusão desse repertório? essa ação não poderá ser desfeita.
                    </Dialog>


                </div>



            </Card>
        )
    }
}
Home.contextType = AuthContext
export default Home