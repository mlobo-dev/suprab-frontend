import React from 'react';
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../../app/services/usuarioService'
import { mensagemErro, mensagemSucesso } from '../../components/toastr'
import { PickList } from 'primereact/picklist';
import { InputTextarea } from 'primereact/inputtextarea';
import ItemService from '../../app/services/itemService';
import LocalStorageService from '../../app/services/localStorageService';
import RepertorioService from '../../app/services/repertorioService';


class CadastroRepertorio extends React.Component {

    state = {
        nome: '',
        observacoes: '',
        dataExecucao: '',
        senha: '',
        senhaRepeticao: '',
        items: [],
        itemsSelecionados: [],
        itemsEncontrados: [],
        textProcura: '',
        sourceList: [],
        targetList: [],
        idUsuario: 0
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
        this.itemService = new ItemService();
        this.service = new RepertorioService();

    }

    cadastrar = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const { nome, observacoes, dataExecucao, items } = this.state
        const repertorio = { nome, observacoes, dataExecucao, items: items, idUsuario: usuarioLogado.id }
        this.service.salvar(repertorio)
            .then(response => {
                this.props.history.push('/repertorios')
                mensagemSucesso("Salvo com Sucesso!")
                this.service.validar(repertorio)
                this.setState({ targetList: [], itemsSelecionados: [], itemsEncontrados: [], sourceList: [] })
            }).catch(error => {
                mensagemErro('Erro ao tentar salvar o repertório', error.response.data)
            })

    }

    coletarItemsSelecionados = (items) => {
        console.log(items)
        items.forEach(item => {
            this.itemService.buscarPeloNome(item)
                .then(response => {

                    this.state.items.push(response.data)
                })
        });
        console.log(this.state.itemsSelecionados)
        return this.state.itemsSelecionados;
    }



    cancelar = () => {
        this.props.history.push('/login')
    }

    handleChange = (evento) => {
        const value = evento.target.value;
        const name = evento.target.name;
        this.setState({ [name]: value })
    }

    procurarItens = (texto) => {

        if (texto === '') {
            this.setState({ textProcura: '', sourceList: [] })
            return false;
        }


        this.itemService.buscar(texto)
            .then(response => {
                this.setState({ textProcura: texto })
                this.state.sourceList.splice(0, this.state.sourceList.length)
                response.data.forEach(item => {
                    this.state.sourceList.push(item.nome)
                });
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    render() {
        return (

            <Card title="Cadastro de Repertório">
                <div className="row">
                    <div className="col-lg-8">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                value={this.state.nome}
                                onChange={this.handleChange}
                                className="form-control"
                                name="nome"
                                id="inputNome"
                                aria-describedby="nameHelp"
                                placeholder="Informe o nome do Repertório"
                            />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Data da Ministração: *" htmlFor="inputDataExecucao">
                            <input type="date"
                                value={this.state.dataExecucao}
                                onChange={this.handleChange}
                                className="form-control"
                                name="dataExecucao"
                                id="inputDataExecucao"
                                aria-describedby="dataExecucaoHelp"
                                placeholder="Informe a data da ministração"
                            />

                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <FormGroup label="Pesquisar: *" htmlFor="inputPesquisar">
                            <input type="text"
                                value={this.state.textProcura}
                                onChange={(e) => this.procurarItens(e.target.value)}
                                className="form-control"
                                name="textProcura"
                                id="inputPesquisar"
                                aria-describedby="nameHelp"
                                placeholder="Pesquise pelo nome da música para atualizar a lista de seleção"
                            />
                        </FormGroup>
                    </div>

                </div>

                <PickList
                    source={this.state.sourceList}
                    target={this.state.targetList}
                    itemTemplate={this.carTemplate}
                    onMoveToTarget={(e) => this.coletarItemsSelecionados(e.value)}
                    onMoveAllToTarget={(e) => console.log(e)}
                    sourceHeader="Disponível" targetHeader="Selecionadas"
                    onChange={(e) => this.setState({ sourceList: e.source, targetList: e.target })} responsive={true}
                />


                <FormGroup label="Observações: *" htmlFor="inputObservacoes">
                    <InputTextarea
                        className="col-lg-12"
                        id="inputObservacoes"
                        rows={5} cols={30}
                        value={this.state.observacoes}
                        name="observacoes"
                        onChange={this.handleChange}
                        autoResize={true}
                    />
                </FormGroup>


                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <button
                            onClick={this.cadastrar}
                            className="btn btn-success">
                            <i className="pi pi-save"></i> Salvar
                            </button>
                        <button
                            onClick={this.cancelar}
                            className="btn btn-danger">
                            <i className="pi pi-times"></i> cancelar
                            </button>
                    </div>
                </div>
            </Card>



        )
    }
}

export default withRouter(CadastroRepertorio)