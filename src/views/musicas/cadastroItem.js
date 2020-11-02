import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card';
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import ItemService from '../../app/services/itemService';
import * as messages from '../../components/toastr'
import LocalStorageService from '../../app/services/localStorageService';
import { Editor } from 'primereact/editor'

class CadastroItem extends React.Component {

    state = {
        id: null,
        nome: '',
        urlCifra: '',
        urlVideo: '',
        urlAudio: '',
        categoria: '',
        artista: '',
        letra: '',
        idUsuario: 0
    }


    constructor() {
        super();
        this.service = new ItemService();
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.service.buscarPeloId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                    console.log(response.data)
                }).catch(error => {
                    messages.mensagemErro('item não localizado pelo id ', params.id, error.response.data)
                })
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { nome, urlCifra, urlVideo, urlAudio, categoria, artista, letra } = this.state
        const item = { nome, urlCifra, urlVideo, urlAudio, categoria, artista, letra, idUsuario: usuarioLogado.id }

        try {
            this.service.validar(item)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => { messages.mensagemErro(msg) });
            return false;
        }


        this.service.salvar(item)
            .then(response => {
                this.props.history.push('/repertorios')
                messages.mensagemSucesso('item cadastrado com sucesso')
            }).catch(error => {
                messages.mensagemErro('Erro ao tentar salvar lançamento', error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, mes, ano, valor, tipoLancamento, statusLancamento, idUsuario, id } = this.state
        const item = { descricao, mes, ano, valor, tipoLancamento, statusLancamento, idUsuario, id }
        this.service.atualizar(item)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Alterações realizadas comsucesso')
            }).catch(error => {
                messages.mensagemErro('Erro ao tentar atualizar lançamento', error.response.data)
            })
    }

    handleChange = (evento) => {
        const value = evento.target.value;
        const name = evento.target.name;
        this.setState({ [name]: value })
    }


    render() {

        const categorias = this.service.obterCategorias();
        const header = (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );


        return (
            <Card title={this.state.atualizando ? 'Atualização de item' : 'Cadastro de Músicas'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputNome" label="Nome: *">
                            <input
                                id="inputNome"
                                type="text"
                                name="nome"
                                className="form-control"
                                value={this.state.nome}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputArtista" label="Artista/Banda *">
                            <input
                                id="inputArtista"
                                type="text"
                                className="form-control"
                                name="artista"
                                value={this.state.artista}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">

                        <FormGroup id="inputMes" label="Categoria *">
                            <SelectMenu
                                id="inputMes"
                                lista={categorias}
                                name="categoria"
                                className="form-control"
                                value={this.state.categoria}
                                onChange={this.handleChange}

                            />
                        </FormGroup>

                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputUrlVideo" label="URL Video: ">
                            <input
                                id="inputUrlVideo"
                                type="text"
                                name="urlVideo"
                                className="form-control"
                                value={this.state.urlVideo}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputUrlAudio" label="URL Audio: ">
                            <input
                                id="inputUrlAudio"
                                type="text"
                                name="urlAudio"
                                className="form-control"
                                value={this.state.Audio}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputUrlCifra" label=" URL Cifra: ">
                            <input
                                id="inputUrlCifra"
                                type="text"
                                name="urlCifra"
                                className="form-control"
                                value={this.state.urlCifra}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-12">
                        <FormGroup id="inputLetra" label="Letra ">
                            <Editor
                                style={{ height: '320px' }}
                                value={this.state.letra}
                                id="inputLetra"
                                name="letra"

                                headerTemplate={header}
                                onTextChange={(e) => this.setState({ letra: e.htmlValue })}

                            />
                        </FormGroup>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ? (
                            <button
                                onClick={this.atualizar}
                                className="btn btn-primary">
                                <i className="pi pi-refresh"></i> Atualizar
                            </button>
                        ) : (
                                <button
                                    onClick={this.submit}
                                    className="btn btn-success">
                                    <i className="pi pi-save"></i> Salvar
                                </button>

                            )
                        }

                        <button
                            onClick={e => this.props.history.push('/consulta-lancamentos')}
                            className="btn btn-danger"><i className="pi pi-backward"></i> Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(CadastroItem);