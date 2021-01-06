import React from 'react';
import { Link } from 'react-router-dom';
import './table.css';
export default (props) => {
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
                <Link
                  className="icon"
                  onClick={() => props.deletarAction(membro)}
                >
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
