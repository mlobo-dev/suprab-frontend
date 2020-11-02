import React from 'react';
export default props => {

    const rows = props.repertorios.map(repertorio => {
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
                        onClick={e => props.editarAction(repertorio.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>

                    <button
                        type="button"
                        title="Deletar"
                        className="btn btn-danger"
                        onClick={e => props.deleteAction(repertorio.id)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Data Ministração</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}