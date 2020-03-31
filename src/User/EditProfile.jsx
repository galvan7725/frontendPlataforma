import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { isAuthenticated } from '../auth';
import { getUser } from './apiUser';

 class EditProfile extends Component {

    constructor(){
        super();
        this.state = {
            redirect:false,
            name:"",
            emil:"",
            error:"",
            fileSize:0,
            loading:false,
            about:""
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
        const userId = isAuthenticated().user._id;
        this.init(userId);


    }

    init = async (userId) =>{
        const token = isAuthenticated().token;
         try {
             const result = await getUser(token,userId);
             console.log(result);
         } catch (error) {
             console.log(error);
             
         }

    }

    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;
    
        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
      };

    render() {

            const { name, email, about , error, redirect, loading } = this.state;

        const styles = {
            input_group : {
                textAlign:"initial"
            }
        }
        return (
            <>
                <div className="wrapper">

                <NavBar />

                <div className="main_body">
    
               <SideBar/>

            <div className="container" id="contenedor">
                <div className="row">
                <div className="col-md-2"></div>
                    <div className="col-md-8 text-center">
                        
                    <form>
                        <div className="form-group" style={styles.input_group}>

                        <div className="form-group" style={styles.input_group}>
                            <label htmlFor="exampleInputPassword1">Nombre</label>
                            <input type="text" onChange={this.handleChange("name")} value={name} className="form-control" id="userName" placeholder="Nombre" />
                        </div>
                            
                            <label htmlFor="exampleInputEmail1">Email:</label>
                            <input type="email" onChange={this.handleChange("email")} value={email} className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Ingresa tu email"/>
                            <small id="emailHelp" className="form-text text-muted">Ingresa una direccion de correo valida.</small>
                        </div>
                        
                        
                        <button type="submit" onClick={this.clickSubmit} className="btn btn-raised btn-primary">Aceptar</button>
                        </form>
                        { error != "" ? (<div className="alert alert-danger" role="alert">
                                            {`error : ${error}`}
                                        </div>):(<></>)}

                    </div>
                    <div className="col-md-2">

                    </div>
                </div>
            </div>
</div>
</div>
                
            </>
        )
    }
}

export default EditProfile;