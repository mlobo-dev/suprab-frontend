import React from 'react'
import UsuarioService from '../../app/services/usuarioService'
import LocalStorageService from '../../app/services/localStorageService'
import { AuthContext } from '../../main/ProvedorAutenticacao'
import AtualizacoesTable from '../home/atualizacoesTable'
class Home extends React.Component {

    state = {
        nome: '',
        urlCifra: '',
        urlVideo: '',
        urlAudio: '',
        categoria: '',
        artista: '',
        letra: ''

    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }


    componentDidMount() {
        // const usuarioLogado = this.context.usuarioAutenticado;
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        this.usuarioService
            .obterSaldoPorIdUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({ saldo: response.data })
            }).catch(error => {
                console.error(error.response)
            });
    }


    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3 text-center">Bem vindo!</h1>
                <hr className="my-4" />
                <p><h2 className="text-center">Últimas atualizações</h2></p>

            </div>
        )
    }
}
Home.contextType = AuthContext
export default Home