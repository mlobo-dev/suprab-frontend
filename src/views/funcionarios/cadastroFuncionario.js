import React, { useState } from 'react';
import Card from '../../components/card';
import Masks from '../../utils/masks';
import FormGroup from '../../components/form-group';
import { withRouter, useParams } from 'react-router-dom';
import UsuarioService from '../../app/services/usuarioService';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import SelectMenu from '../../components/select-menu';
import ItemService from '../../app/services/itemService';
import FuncionarioService from '../../app/services/funcionarioService';
import './funcionario.css';

class CadastroFuncionario extends React.Component {
  state = {
    id: 0,
    status: '',
    cgp: '',
    cep: '',
    cpf: '',
    nome: '',
    dataNascimento: '',
    cidade: '',
    uf: '',
    cargo: '',
    tituloHonorifico: '',
    corposFilosoficos: [
      {
        grau: '',
        dataGrau: '',
        corpo: '',
      },
    ],
  };

  constructor(props) {
    super();
    console.log(props);
    this.usuarioService = new UsuarioService();
    this.itemService = new ItemService();
    this.service = new FuncionarioService();
  }

  componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      this.buscarPeloId(params.id);
    }
  }

  buscarPeloId = (id) => {
    this.service.buscarPeloId(id).then((response) => {
      this.setState(response.data);
      this.setState({
        cep: response.data.endereco.cep,
        cidade: response.data.endereco.cidade,
        uf: response.data.endereco.uf,
      });
    });
  };

  cadastrar = () => {
    // const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    const {
      status,
      cgp,
      nome,
      dataNascimento,
      cidade,
      uf,
      cargo,
      tituloHonorifico,
      corposFilosoficos,
    } = this.state;

    const membro = {
      status,
      cgp,
      cpf: Masks.cpfRemove(this.state.cpf),
      cep: Masks.cepRemove(this.state.cep),
      nome,
      dataNascimento,
      cidade,
      uf,
      cargo,
      tituloHonorifico,
      corposFilosoficos,
    };

    this.service
      .salvar(membro)
      .then((response) => {
        this.props.history.push('/funcionarios');
        mensagemSucesso('Salvo com Sucesso!');
      })
      .catch((error) => {
        mensagemErro('Erro ao tentar salvar o Funcioário', error.response.data);
      });
  };

  editar = () => {
    const {
      id,
      status,
      cgp,
      cep,
      nome,
      dataNascimento,
      cidade,
      uf,
      cargo,
      tituloHonorifico,
      corposFilosoficos,
    } = this.state;

    const membro = {
      id,
      status,
      cgp,
      cpf: Masks.cpfRemove(this.state.cpf),
      cep: Masks.cepRemove(this.state.cep),
      nome,
      dataNascimento,
      cidade,
      uf,
      cargo,
      tituloHonorifico,
      corposFilosoficos,
    };

    this.service
      .editar(membro)
      .then((response) => {
        this.props.history.push('/funcionarios');
        mensagemSucesso('Salvo com Sucesso!');
      })
      .catch((error) => {
        mensagemErro('Erro ao tentar salvar o Funcioário', error.response.data);
      });
  };

  obterStatus() {
    return [
      { label: 'Selecione', value: '' },
      { label: 'ATIVO', value: 'ATIVO' },
      { label: 'INATIVO', value: 'INATIVO' },
      { label: 'PENDENTE', value: 'PENDENTE' },
    ];
  }

  cancelar = () => {
    this.props.history.push('/funcionarios');
  };

  handleChange = (evento) => {
    const value = evento.target.value;
    const name = evento.target.name;

    this.setState({ [name]: value });
    console.log(this.state.corposFilosoficos);
  };

  handleCorpoFilosoficoChange = (value, index, attribute) => {
    let corposFilosoficos = this.state.corposFilosoficos;

    switch (attribute) {
      case 'corpo':
        corposFilosoficos[index].corpo = value;
        break;
      case 'grau':
        corposFilosoficos[index].grau = value;
        break;
      default:
        corposFilosoficos[index].dataGrau = value;
    }
    this.setState({ listCorpoFilosofico: corposFilosoficos });
  };

  addCorpoFilosofico = () => {
    const {
      grau,
      dataGrau,
      corpoFilosofico,
      corposFilosoficos: listCorpoFilosofico,
    } = this.state;
    const list = { grau, dataGrau, corpoFilosofico };

    listCorpoFilosofico.push(list);

    this.setState({ listCorpoFilosofico: listCorpoFilosofico });
  };

  renderizarCorposFilosoficos = () => {
    let { corposFilosoficos: listCorpoFilosofico } = this.state;
    let list = [];
    for (let index = 0; index < listCorpoFilosofico.length; index++) {
      list.push(
        <>
          <div className="col-lg-4">
            <FormGroup
              label={
                index === 0
                  ? 'Corpo Filosófico: *'
                  : `Corpo Filosófico ${index + 1}: *`
              }
              htmlFor="inputCorpoFilosofico"
            >
              <input
                type="text"
                value={this.state.corposFilosoficos[index].corpo}
                onChange={(e) =>
                  this.handleCorpoFilosoficoChange(
                    e.target.value,
                    e.target.id,
                    'corpo'
                  )
                }
                className="form-control"
                name={this.state.corposFilosoficos[index].corpo}
                id={index}
                aria-describedby="corpoHelp"
                placeholder="Informe o corpo filosofico"
              />
            </FormGroup>
          </div>

          <div className="col-lg-5">
            <FormGroup
              label={index === 0 ? 'Grau: *' : `Grau ${index + 1}: *`}
              htmlFor="inputGrau"
            >
              <input
                type="text"
                value={this.state.corposFilosoficos[index].grau}
                onChange={(e) =>
                  this.handleCorpoFilosoficoChange(
                    e.target.value,
                    e.target.id,
                    'grau'
                  )
                }
                className="form-control"
                name={this.state.corposFilosoficos[index].grau}
                id={index}
                aria-describedby="grauHelp"
                placeholder="Informe o grau"
              />
            </FormGroup>
          </div>

          <div className="col-lg-3">
            <FormGroup
              label={index === 0 ? 'Data Grau: *' : `Data Grau ${index + 1}: *`}
              htmlFor="inputDataGrau"
            >
              <input
                type="date"
                value={this.state.corposFilosoficos[index].dataGrau}
                onChange={(e) =>
                  this.handleCorpoFilosoficoChange(
                    e.target.value,
                    e.target.id,
                    'dataGrau'
                  )
                }
                className="form-control"
                name={this.state.corposFilosoficos[index].dataGrau}
                id={index}
                aria-describedby="dataGrauHelp"
                placeholder="Informe a data do grau"
              />
            </FormGroup>
          </div>
        </>
      );
    }

    return list;
  };

  render() {
    return (
      <Card title="Cadastro de Membros">
        <div className="row">
          <div className="col-lg-6">
            <FormGroup label="Nome: *" htmlFor="inputNome">
              <input
                type="text"
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

          <div className="col-lg-3">
            <FormGroup label="CGP: *" htmlFor="inputCGP">
              <input
                type="text"
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

          <div className="col-lg-3">
            <FormGroup label="CPF: *" htmlFor="inputCPF">
              <input
                type="text"
                value={Masks.cpf(this.state.cpf)}
                onChange={this.handleChange}
                className="form-control"
                name="cpf"
                id="inputCPF"
                aria-describedby="cpfHelp"
                placeholder="Informe o CPF"
              />
            </FormGroup>
          </div>

          <div className="col-lg-3">
            <FormGroup
              label="Data da Nascimento: *"
              htmlFor="inputDataNascimento"
            >
              <input
                type="date"
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

          <div className="col-lg-3">
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

          <div className="col-lg-6">
            <FormGroup label="Título Honorífico: *" htmlFor="inputTitulo">
              <input
                type="text"
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
            <FormGroup label="Cidade: *" htmlFor="inputCidade">
              <input
                type="text"
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

          <div className="col-lg-2">
            <FormGroup label="UF: *" htmlFor="inputUf">
              <input
                type="text"
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

          <div className="col-lg-2">
            <FormGroup label="CEP: *" htmlFor="inputCEP">
              <input
                type="text"
                value={Masks.cep(this.state.cep)}
                onChange={this.handleChange}
                className="form-control"
                name="cep"
                id="inputCEP"
                aria-describedby="tituloHelp"
                placeholder="Informe o cep"
              />
            </FormGroup>
          </div>

          <div className="col-lg-4">
            <FormGroup label="Cargo: *" htmlFor="inputCargo">
              <input
                type="text"
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

          {this.renderizarCorposFilosoficos()}
          <div className="col-lg-6">
            <button
              onClick={this.addCorpoFilosofico}
              className="btn btn-success"
            >
              <i className="pi pi-plus"></i> Adicionar novo corpo filosofico
            </button>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col-lg-12">
            <button
              onClick={this.state.id > 0 ? this.editar : this.cadastrar}
              className="btn btn-success"
            >
              <i className="pi pi-save"></i> Salvar
            </button>
            <button onClick={this.cancelar} className="btn btn-danger">
              <i className="pi pi-times"></i> cancelar
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroFuncionario);
