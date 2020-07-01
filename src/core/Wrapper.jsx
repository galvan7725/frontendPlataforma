import React, { Component } from 'react';
import NavBar from './NavBar';
import Body from './Body';
import SideBar from './SideBar';
import Container from './Container';
import '../App.css';


export default class Wrapper extends Component {
    render() {
        return (
            <div className="wrapper active">
                 <NavBar />

                <div className="main_body">

                <SideBar/>

                <div className="container" id="contenedor">
                    </div>
                </div>    
            </div>
        )
    }
}
