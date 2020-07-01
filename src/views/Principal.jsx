import React, { Component } from 'react'
import NavBar from '../core/NavBar';
import Wrapper from '../core/Wrapper';
import Body from '../core/Body';
import Container from '../core/Container';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';

 class Principal extends Component {

    componentDidMount = () =>{

        console.log(this.props.location.pathname);
        $("#link_principal").addClass('active');

    }
    render() {
        return (
            <>

                    <div className="wrapper active">

                    <NavBar />

                    <div className="main_body">

                    <SideBar/>

                    <div className="container" id="contenedor">
                        <div className="row">
                            <div className="col-md-4">
                                <h1>c1</h1>
                            </div>
                            <div className="col-md-4">
                                <h1>c2</h1>
                            </div>
                            <div className="col-md-4">
                                <h1>c3</h1>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
         
            </>
        )
    }
}

export default Principal;