import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { groupsByUser } from './apiGroup';
import GroupsTab from './GroupsTab';

 class GropusByUser extends Component {

    constructor(){
        super();
        this.state = {
            error:"",
            groups:[]
        }
    }

    componentDidMount = async() =>{
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
        const user = isAuthenticated().user;

        if(user.role == "admin" || user.role == "teacher"){
           await this.init("teacher");
        }else{
            await this.init("student");
        }

        

    }

    init = async (role) =>{
        try {
            const token = isAuthenticated().token;
            const {result} = await groupsByUser(token,isAuthenticated().user._id);
            if(result.error){
                console.log(result.error);
            }else{
                this.setState({groups:result});
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        const { error, groups } = this.state;

        console.log(groups);
        

        return (
            <>
            <div className="wrapper">

            <NavBar />

            <div className="main_body">

           <SideBar/>

        <div className="container" id="contenedor">
            <div className="row">
               <div className="col-md-10">
                <h4>Grupos</h4>
               </div>
               <div className="col-md-2">
                   {isAuthenticated().user.role == "teacher" || isAuthenticated().user.role == "admin" ? (<>
                    <Link to={`/Grupo/nuevo`} className="btn btn-raised btn-block btn-success">Nuevo <i className="fa fa-plus-circle" aria-hidden="true"></i></Link>
                   </>) :(<></>)}
               </div>
            </div>
            <div className="row">
                
                <div className="col-md-12">
                   <GroupsTab groups={groups} />
                </div>
                
            </div>
        </div>
</div>
</div>
            
        </>
        )
    }
}

export default GropusByUser;