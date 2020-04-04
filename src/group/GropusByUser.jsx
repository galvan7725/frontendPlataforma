import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

 class GropusByUser extends Component {

    componentDidMount = () =>{
        let window = document.querySelector('#contenedor');
        //console.log(window);
        let hammer = new Hammer(window);
        hammer.get('swipe').set({direction:Hammer.DIRECTION_RIGHT});
        hammer.on('swipe',()=>{
            $(".wrapper").toggleClass("active")
            //this.setState({redirectLogin:true});
            console.log("swipe");
        });
        console.log(this.props.location.pathname);
        $("#link_grupos").addClass('active');

    }

    render() {
        return (
            <>
            <div className="wrapper">

            <NavBar />

            <div className="main_body">

           <SideBar/>

        <div className="container" id="contenedor">
            <div className="row">
               <div className="col-md-10">
                <h3>Grupos</h3>
               </div>
               <div className="col-md-2">
                   {isAuthenticated().user.role == "teacher" || isAuthenticated().user.role == "admin" ? (<>
                    <Link to={`/Grupo/nuevo`} className="btn btn-raised btn-block btn-success">Nuevo <i className="fa fa-plus-circle" aria-hidden="true"></i></Link>
                   </>) :(<></>)}
               </div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h1>Todos los grupos</h1>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
</div>
</div>
            
        </>
        )
    }
}

export default GropusByUser;