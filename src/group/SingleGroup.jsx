import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { getGroup } from './apiGroup';
import { isAuthenticated } from '../auth';

 class SingleGroup extends Component {

    constructor(){
        super();
        this.state = {
            group:{users:[],publications:[],teacher:{}},
            error: ""
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
        //console.log(this.props.location.pathname);
        $("#link_principal").addClass('active');
        const groupId = this.props.match.params.groupId;
        await this.init(groupId);
    }

    init = async(groupId)  => {
        console.log(groupId);
        
        const result = await getGroup(isAuthenticated().token,groupId);

        if(result.error || !result){
            console.log(result.error)
        }else{
            this.setState({group:result});
        }
      
    }



    render() {
        const { group, error } = this.state;

        console.log(group);

        return (
            <>
            <div className="wrapper">

            <NavBar />

            <div className="main_body">

           <SideBar/>

        <div className="container" id="contenedor">
            <div className="row">
                <h1>{group.teacher.name}</h1>
            </div>
        </div>
</div>
</div>
            
        </>
        )
    }
}



export default SingleGroup;