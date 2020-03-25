import React, { Component } from 'react'
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';

 class Principal extends Component {

    componentDidMount = () =>{
        $(document).ready(function(){
			$(".hamburger").click(function(){
			  $(".wrapper").toggleClass("active")
			})
		});
    }
    render() {
        return (
            <>
                <div class="wrapper">

                <NavBar />

                <div class="main_body">
    
                <div class="sidebar_menu" style={{marginTop:"-9px"}}>
                    <div class="inner__sidebar_menu">
                        
                        <ul>
                        <li>
                            <a href="#">
                            <span class="icon">
                                <i class="fas fa-border-all"></i></span>
                            <span class="list">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="active">
                            <span class="icon"><i class="fas fa-chart-pie"></i></span>
                            <span class="list">Charts</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span class="icon"><i class="fas fa-address-book"></i></span>
                            <span class="list">Contact</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span class="icon"><i class="fas fa-address-card"></i></span>
                            <span class="list">About</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span class="icon"><i class="fab fa-blogger"></i></span>
                            <span class="list">Blogs</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span class="icon"><i class="fas fa-map-marked-alt"></i></span>
                            <span class="list">Maps</span>
                            </a>
                        </li>
                        </ul>

                        <div class="hamburger">
                            <div class="inner_hamburger">
                                <span class="arrow">
                                    <i class="fas fa-long-arrow-alt-left"></i>
                                    <i class="fas fa-long-arrow-alt-right"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            <div class="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>c1</h1>
                    </div>
                    <div className="col-md-4">
                        <h1>c2</h1>
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

export default Principal;