import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { getUser } from './apiUser';
import { isAuthenticated } from '../auth';
import logo from '../logo.svg';
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js';
import es from 'timeago.js/lib/lang/es'
import { Link  } from 'react-router-dom';


   

 class Profile extends Component {


    constructor (){
        super();
        this.state = {
            user:{follwing:[],followers:[],followingGroup:[]}
        }
    }


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
       // console.log(this.props.match.params.userId);
        const userId = this.props.match.params.userId;
        this.init(userId);

        $("#link-profile").addClass('active');
        timeago.register('es',es);


    }

    init = async (userId) =>{
        const token = isAuthenticated().token;

        try {
            const result = await getUser(token,userId);
            if(result.error){

            }else{
                this.setState({user:result});
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { user } = this.state;
        console.log("%c","orange");
        console.log(user);
        let role = user.role;

        switch (role) {
            case 'admin':
                role = 'Administrador'
                break;
            case 'teacher':
                 role = 'Docente'
                 break;    
            case 'user':
                 role = 'Estudiante'
                break;        
            
        }
        
        const styles = {
            avatar:{
                width:"50%",
                margin:"auto",
                borderRadius:"50%",
                border:"2px solid aqua",
                marginTop:"5px"
            },
            separador:{
                borderTop:"1px dashed white"
            },
            div_row:{
                backgroundColor:"gray",
                padding:"10px",
                borderRadius:"20px"
            }
        }
        
        return (
            <>
                <div className="wrapper">

                    <NavBar />

                    <div className="main_body">

                    <SideBar/>

                    <div className="container container-fluid" id="contenedor">
                        <div className="row" style={styles.div_row}>
                            <div className="col-md-6 text-center" style={{backgroundColor:"black", color:"white",borderRadius:"20px"}}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row text-center">
                                            <img src={logo} alt="logo" style={styles.avatar} />
                                        </div>
                                        <h5>{user.name}</h5>
                                        <hr style={styles.separador} />
                                        <span>{role}</span>
                                        <hr/>
                                        <span>Miembro desde{" "}
                                             <TimeAgo
                                            datetime={user.created} 
                                            locale='es'
                                            />
                                         </span>
                                         <p>No control</p>
                                    </div>
                                </div>
                                <div className="row"></div>
                            </div>
                            <div className="col-md-6 text-center">
                                <div className="row" style={{backgroundColor:"black", color:"white",borderRadius:"20px",height:"100%"}}>
                                    <div className="col-md-4">
                                        <button className="btn btn-raised btn-success " >Seguir</button>
                                    </div>
                                    <div className="col-md-4">
                                    <button className="btn btn-raised btn-success" >Mensaje</button>

                                    </div>
                                    <div className="col-md-4">
                                    {isAuthenticated().user._id == user._id ? (<>
                                        <Link to={`/User/edit/${isAuthenticated().user._id}`} className="btn btn-raised btn-warning" ><i className="fas fa-user-edit"></i> Editar</Link>
                                    </>) : (<></>)}

                                    </div> 
                                </div>
                           </div>
                        </div>
                        </div>
                        </div>
                    </div>
            </>
        )
    }
}




export default Profile;