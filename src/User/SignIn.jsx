import React, { Component } from 'react'
import NavBar from '../core/NavBar';

 class SignIn extends Component {
    render() {
        return (
            <div className="container-fluid" >
            <NavBar />
            <div className="row">
                
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h1>Form</h1>
                    </div>
                    <div className="col-md-2"></div>    
                </div>   
                            
            </div>
        )
    }
}


export default SignIn;