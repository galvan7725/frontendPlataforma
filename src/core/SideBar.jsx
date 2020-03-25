import React, { Component } from 'react';
import '../App.css';
import $ from 'jquery';
import Hammer from 'hammerjs';
import logo from '../logo.svg';

 class SideBar extends Component {



    componentDidMount= () =>{
        let window = document.querySelector('#sidebar');
        //console.log(window);
        let hammer = new Hammer(window);
        hammer.get('swipe').set({direction:Hammer.DIRECTION_LEFT});
        hammer.on('swipe',()=>{
            $(".wrapper").toggleClass("active")
            //this.setState({redirectLogin:true});
            console.log("swipe");
        });
        $(document).ready(function(){
			$(".hamburger").click(function(){
			  $(".wrapper").toggleClass("active")
			})
		});
    }

    render() {
        return (
            <>
                 <div className="sidebar_menu" id="sidebar" style={{marginTop:"-9px"}}>
                    <div className="inner__sidebar_menu">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8 text-center">
                                <img className="sidebar_avatar" src={logo} alt="logo"/>
                            </div>
                            <div className="col-md-2"></div>
                            
                        </div>
                        <div className="row">

                        </div>
                        <ul>
                        <li>
                            <a href="#">
                            <span className="icon">
                                <i className="fas fa-border-all"></i></span>
                            <span className="list">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="active">
                            <span className="icon"><i className="fas fa-chart-pie"></i></span>
                            <span className="list">Charts</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fas fa-address-book"></i></span>
                            <span className="list">Contact</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fas fa-address-card"></i></span>
                            <span className="list">About</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fab fa-blogger"></i></span>
                            <span className="list">Blogs</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fas fa-map-marked-alt"></i></span>
                            <span className="list">Maps</span>
                            </a>
                        </li>
                        </ul>

                        <div className="hamburger">
                            <div className="inner_hamburger">
                                <span className="arrow">
                                    <i className="fas fa-long-arrow-alt-left"></i>
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}


export default SideBar;