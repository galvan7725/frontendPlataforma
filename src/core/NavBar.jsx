import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import '../App.css';
import { isAuthenticated } from '../auth';

 class NavBar extends Component {
    render() {

        const styles = {
            bg_nav:{
                backgroundColor:"black"
            },
            label_nav :{
                color:"white"
            }
        }

        return (
            <>
              <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={styles.bg_nav}>
              <a className="navbar-brand separador_nav" href="#" style={styles.label_nav}>
                    Plataforma
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                </a>
                        
                            <ul className="navbar-nav mr-auto" style={{flexDirection:"row"}}>
                            
                            {!isAuthenticated() && (<>
                                <li className="nav-item separador_nav">
                                <Link className="nav-link link_nav" to={"/Acceso"}><span className="span_nav" >Acceso</span><i className="fas fa-sign-in-alt icon_nav"></i></Link>
                            </li>
                            <li className="nav-item separador_nav" style={{marginLeft:"5px"}} >
                                <Link className="nav-link link_nav" to={"/Registro"}><span className="span_nav" >Registro</span><i className="fas fa-user-plus icon_nav"></i></Link>
                            </li>
                            </>)}
                            
                            </ul>
                            
                        
                        </nav>  
                                    </>
        )
    }
}


export default NavBar;