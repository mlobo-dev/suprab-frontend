import React from 'react';
export default (props) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome Completo</th>
          <th scope="col">Cargo</th>
          <th scope="col">Titulo Honorifico</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {props.repertorios.map((value) => (
          <tr>
            <td>{value.nome}</td>
            <td>{value.cargo}</td>
            <td>{value.tituloHonorifico}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
