import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';

export default class SinglePublication extends Component {
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
        console.log("idPublication: ",this.props.location.state.params.idPublication);
        $("#link_grupos").addClass('active');
        //comprobar si el usuario puede ver la publicacion
        

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
                        <h1>SinglePublication</h1>
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
