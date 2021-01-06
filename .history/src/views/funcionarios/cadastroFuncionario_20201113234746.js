import React from 'react';
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../../app/services/usuarioService'
import { mensagemErro, mensagemSucesso } from '../../components/toastr'
import SelectMenu from '../../components/select-menu'
import ItemService from '../../app/services/itemService';
import FuncionarioService from '../../app/services/funcionarioService';


class CadastroFuncionario extends React.Component {

    state = {
        id: 0,
        status: '',
        cgp: '',
        cpf: '',
        nome: '',
        dataNascimento: '',
        cidade: '',
        uf: '',
        cargo: '',
        tituloHonorifico: '',
        grau: '',
        dataGrau: '',
        corpoFilosofico: '',

    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
        this.itemService = new ItemService();
        this.service = new FuncionarioService();

    }

    cadastrar = () => {

        // const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const { status, cgp, cpf, nome, dataNascimento, cidade, uf, cargo, tituloHonorifico, grau, dataGrau, corpoFilosofico } = this.state

        const repertorio = { status, cgp, cpf, nome, dataNascimento, cidade, uf, cargo, tituloHonorifico, grau, dataGrau, corpoFilosofico }
        this.service.salvar(repertorio)
            .then(response => {
                this.props.history.push('/funcionarios')
                mensagemSucesso("Salvo com Sucesso!")
            }).catch(error => {
                mensagemErro('Erro ao tentar salvar o Funcioário', error.response.data)
            })

    }

    obterStatus() {
        return [
            { label: 'Selecione', value: '' },
            { label: 'ATIVO', value: 'ATIVO' },
            { label: 'INATIVO', value: 'INATIVO' },
            { label: 'PENDENTE', value: 'PENDENTE' }
        ]
    }


    cancelar = () => {
        this.props.history.push('/login')
    }

    handleChange = (evento) => {
        const value = evento.target.value;
        const name = evento.target.name;
        this.setState({ [name]: value })
    }

    render() {
        return (


            <Card title="Cadastro de Membros">
                <div className="row">
                    <div className="col-lg-4">
                        <FormGroup label="Status: *" htmlFor="inputStatus">

                            <SelectMenu
                                id="inputStatus"
                                lista={this.obterStatus()}
                                name="status"
                                className="form-control"
                                value={this.state.status}
                                onChange={this.handleChange}
                            />

                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="CGP: *" htmlFor="inputCGP">
                            <input type="text"
                                value={this.state.cgp}
                                onChange={this.handleChange}
                                className="form-control"
                                name="cgp"
                                id="inputCGP"
                                aria-describedby="cgpHelp"
                                placeholder="Informe o CGP"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="CPF: *" htmlFor="inputCPF">
                            <input type="text"
                                value={this.state.cpf}
                                onChange={this.handleChange}
                                className="form-control"
                                name="cpf"
                                id="inputCPF"
                                aria-describedby="cpfHelp"
                                placeholder="Informe o CPF"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Data da Nascimento: *" htmlFor="inputDataNascimento">
                            <input type="date"
                                value={this.state.dataNascimento}
                                onChange={this.handleChange}
                                className="form-control"
                                name="dataNascimento"
                                id="inputDataNascimento"
                                aria-describedby="dataNascimentoHelp"
                                placeholder="Informe a data de nascimento"
                            />

                        </FormGroup>
                    </div>
                    <div className="col-lg-8">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                value={this.state.nome}
                                onChange={this.handleChange}
                                className="form-control"
                                name="nome"
                                id="inputNome"
                                aria-describedby="nameHelp"
                                placeholder="Informe o nome"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Cidade: *" htmlFor="inputCidade">
                            <input type="text"
                                value={this.state.cidade}
                                onChange={this.handleChange}
                                className="form-control"
                                name="cidade"
                                id="inputCidade"
                                aria-describedby="cidadeHelp"
                                placeholder="Informe a Cidade"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="UF: *" htmlFor="inputUf">
                            <input type="text"
                                value={this.state.uf}
                                onChange={this.handleChange}
                                className="form-control"
                                name="uf"
                                id="inputUf"
                                aria-describedby="ufHelp"
                                placeholder="Informe o nome"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Cargo: *" htmlFor="inputCargo">
                            <input type="text"
                                value={this.state.cargo}
                                onChange={this.handleChange}
                                className="form-control"
                                name="cargo"
                                id="inputCargo"
                                aria-describedby="cargoHelp"
                                placeholder="Informe o cargo"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Título Honorífico: *" htmlFor="inputTitulo">
                            <input type="text"
                                value={this.state.tituloHonorifico}
                                onChange={this.handleChange}
                                className="form-control"
                                name="tituloHonorifico"
                                id="inputTitulo"
                                aria-describedby="tituloHelp"
                                placeholder="Informe o título"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Grau: *" htmlFor="inputGrau">
                            <input type="text"
                                value={this.state.grau}
                                onChange={this.handleChange}
                                className="form-control"
                                name="grau"
                                id="inputGrau"
                                aria-describedby="grauHelp"
                                placeholder="Informe o grau"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Data do Grau: *" htmlFor="inputDataGrau">
                            <input type="date"
                                value={this.state.dataGrau}
                                onChange={this.handleChange}
                                className="form-control"
                                name="dataGrau"
                                id="inputDataGrau"
                                aria-describedby="dataGrauHelp"
                                placeholder="Informe a data do Grau"
                            />

                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label="Corpo Filosófico: *" htmlFor="inputCorpoFilosofico">
                            <input type="text"
                                value={this.state.corpoFilosofico}
                                onChange={this.handleChange}
                                className="form-control"
                                name="corpoFilosofico"
                                id="inputCorpoFilosofico"
                                aria-describedby="corpoHelp"
                                placeholder="Informe o corpo filosófico"
                            />
                        </FormGroup>
                    </div>

                </div>


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

export default withRouter(CadastroFuncionario)