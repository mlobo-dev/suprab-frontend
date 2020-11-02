import React from 'react'
import { AuthContext } from '../../main/ProvedorAutenticacao'

class Home extends React.Component {



    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3 text-center">Bem vindo!</h1>

            </div>
        )
    }
}
Home.contextType = AuthContext
export default Home