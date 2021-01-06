import React from 'react';
import { Link } from 'react-router-dom';
import './table.css';
export default (props) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Título</th>
          <th scope="col">Mensagem</th>
          <th scope="col">dataNotificacao</th>
          <th scope="col" className="text-center">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {props.values.map((notificacao) => (
          <tr>
            <td>{notificacao.titulo}</td>
            <td>{notificacao.mensagem}</td>
            <td>{notificacao.dataNotificacao}</td>
            <td>
              <div className="action-itens">
                <Link
                  className="icon"
                  onClick={() => props.deletarAction(notificacao)}
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
