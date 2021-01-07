import React from 'react';
import CadastroUsuario from '../views/cadastroUsuario';
import Login from '../views/login';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Home from '../views/home/home';
import Repertorio from '../views/repertorio/repertorio';
import CadastroItem from '../views/musicas/cadastroItem';
import { AuthConsumer } from './ProvedorAutenticacao';
import CadastroRepetorio from '../views/repertorio/cadastroRepertorio';
import Funcionario from '../views/funcionarios/funcionario';
import Notificacao from '../views/notificacoes/notificacao';
import CadastroNotificacao from '../views/notificacoes/cadastroNotificacao';
import CadastroFuncionario from '../views/funcionarios/cadastroFuncionario';

function RotaAutenticada({
  component: Component,
  isUsuarioAutenticado,
  ...props
}) {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (isUsuarioAutenticado) {
          return <Component {...componentProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

function Rotas(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro-usuarios" component={CadastroUsuario} />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/"
          component={Login}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/repertorios"
          component={Repertorio}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/cadastro-items"
          component={CadastroItem}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/funcionarios"
          component={Funcionario}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/cadastro-funcionario"
          component={CadastroFuncionario}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/editar-membro/:id?"
          component={CadastroFuncionario}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/notificacoes"
          component={Notificacao}
        />

        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/cadastro/notificacoes"
          component={CadastroNotificacao}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/cadastro-repertorio"
          component={CadastroRepetorio}
        />
      </Switch>
    </HashRouter>
  );
}

export default () => (
  <AuthConsumer>
    {(context) => <Rotas isUsuarioAutenticado={context.isAutenticado} />}
  </AuthConsumer>
);
