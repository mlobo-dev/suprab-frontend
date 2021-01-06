import React from 'react';
import { Link } from 'react-router-dom';
import './table.css';
export default (props) => {
  const rows = props.membros.map((repertorio) => {
    return (
      <tr key={repertorio.id}>
        <td>{repertorio.nome}</td>
        <td>{repertorio.dataExecucao}</td>
        <td>
          <button
            type="button"
            title="Editar"
            className="btn btn-primary"
            disabled={true}
            onClick={(e) => props.editarAction(repertorio.id)}
          >
            <i className="pi pi-pencil"></i>
          </button>

          <button
            type="button"
            title="Deletar"
            className="btn btn-danger"
            onClick={(e) => props.deleteAction(repertorio.id)}
          >
            <i className="pi pi-trash"></i>
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome Completo</th>
          <th scope="col">Cargo</th>
          <th scope="col">Titulo Honorifico</th>
          <th scope="col" className="text-center">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {props.membros.map((membro) => (
          <tr>
            <td>{membro.nome}</td>
            <td>{membro.cargo}</td>
            <td>{membro.tituloHonorifico}</td>
            <td>
              <div className="action-itens">
                <Link to={`/editar-membro/${membro.id}`} className="icon">
                  <i class="pi pi-pencil"></i>
                </Link>
                <Link className="icon">
                  <i class="pi pi-trash"></i>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
