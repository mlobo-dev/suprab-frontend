import React from 'react';
export default props => {

    const rows = () => {
        return (
            <tr>

                <td>
                    <button
                        className="btn btn-success"
                        title="Efetivar"

                        type="button">
                        <i className="pi pi-check"></i>

                    </button>
                </td>
            </tr>
        )
    }
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Data</th>
                    <th scope="col">descricao</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}