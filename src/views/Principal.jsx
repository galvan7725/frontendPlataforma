import React, { Component } from 'react'
import NavBar from '../core/NavBar';

 class Principal extends Component {
    render() {
        return (
            <>
                <div className="container-fluid">
                    <NavBar />
                    <div className="row">
                        <h1>Principal</h1>
                    </div>
                </div>
            </>
        )
    }
}

export default Principal;