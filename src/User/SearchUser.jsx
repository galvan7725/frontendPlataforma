import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { searchUser } from './apiUser';
import { isAuthenticated } from '../auth';

export default class SearchUser extends Component {

    constructor(){
        super();
        this.state = {
            users:[],
            text:"",
            loading: false,
            error:""
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
        console.log(this.props.location.pathname);
        $("#link_principal").addClass('active');

    }



    handleChange = (name) => (event) =>{
        this.setState({[name] : event.target.value});
    }

    callSearch =async(e) =>{
        e.preventDefault();
        const { text } = this.state;

        try {
            const result = await searchUser(isAuthenticated().token,text);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }











    render() {

        const { text } = this.state;

        const styles = {
            form : {
                display:"flex"
            },
            formGroup:{
                flex:"80"
            },
            btnSearch:{
                height:"50px",
                marginTop:"11px"
            }
        }

        return (
            <>
                <div className="wrapper">

                <NavBar />

                <div className="main_body">
    
               <SideBar/>

            <div className="container" id="contenedor">
                <div className="row text-center">
                    <div className="col-md-12">
                    <h1>SearchUser</h1>

                    </div>
                </div>
                <div className="row">
                   
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <form style={styles.form}>
                        
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="text" onChange={this.handleChange("text")} value={text} className="form-control" id="text" placeholder="Texto..." />
                        </div>
                        
                        <button type="submit" className="btn btn-raised btn-primary" onClick={this.callSearch} style={styles.btnSearch}>
                            <i class="fa fa-search" aria-hidden="true"></i></button>
                        
                        
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">

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
