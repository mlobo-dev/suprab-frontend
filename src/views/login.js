import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/services/usuarioService';
import { mensagemErro } from '../components/toastr';
import { AuthContext } from '../main/ProvedorAutenticacao';
class Login extends React.Component {
  state = {
    login: '',
    senha: '',
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  entrar = () => {
    this.service
      .autenticar({
        login: this.state.login,
        senha: this.state.senha,
      })
      .then((response) => {
        this.context.iniciarSessao(response.data);
        this.props.history.push('/home');
      })
      .catch((erro) => {
        mensagemErro('usuário não cadastrado');
      });
  };

  prepareCadastrar = () => {
    this.props.history.push('/cadastro-usuarios');
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: 'relative', left: '300px' }}
        >
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Usuário: *" htmlFor="exampleInputEmail">
                        <input
                          type="email"
                          value={this.state.login}
                          onChange={(e) =>
                            this.setState({ login: e.target.value })
                          }
                          className="form-control"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Digite o Email"
                        />
                      </FormGroup>
                      <FormGroup label="Senha: *" htmlFor="exampleInputSenha">
                        <input
                          type="password"
                          value={this.state.senha}
                          onChange={(e) =>
                            this.setState({ senha: e.target.value })
                          }
                          className="form-control"
                          id="exampleInputSenha"
                          placeholder="password"
                        />
                      </FormGroup>
                      <button onClick={this.entrar} className="btn btn-success">
                        <i className="pi pi-sign-in"></i> Entrar
                      </button>
                      <button
                        onClick={this.prepareCadastrar}
                        className="btn btn-primary"
                      >
                        <i className="pi pi-user-plus"></i> Cadastra-se
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
