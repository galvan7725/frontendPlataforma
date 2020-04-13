import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { getGroup } from './apiGroup';
import { isAuthenticated } from '../auth';
import './Test.css';
import logo from '../logo.svg';
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js';
import es from 'timeago.js/lib/lang/es';
import { Link, Redirect } from 'react-router-dom';



 class SingleGroup extends Component {

    constructor(){
        super();
        this.state = {
            group:{users:[],publications:[],teacher:{}},
            error: "",
            loading: false,
            redirect:false
        }
    }

    componentDidMount = async() =>{
        this.setState({loading:true});
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
        timeago.register('es',es);
        

    }

    init = async(groupId)  => {
        console.log(groupId);
        
        try {
            const result = await getGroup(isAuthenticated().token,groupId);

            if(result.error || !result){
                this.setState({loading: false});
                console.log(result.error)
            }else{
                this.setState({group:result});
                this.setState({loading: false});

            }
        } catch (error) {
            this.setState({loading: false});
            console.log(error);
            
        }
      
    }



    render() {
        const { group, error,loading } = this.state;

        const styles = {
            imgGroup : {
                width: "100px"
            }
        }

        console.log("Grupo: ",group);

        return (
            <>
            <div className="wrapper">

            <NavBar />

            <div className="main_body">

           <SideBar/>

        <div className="container" id="contenedor">

                {loading ? (<>
                    <div className="row">
                        <div className="col-md-12" style={{color:"black"}}>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                     </div>
                </>) : (<>
                    <div className="row">
                        <div className="col-md-2">
                            <img style={styles.imgGroup} src={`${process.env.REACT_APP_API_URL}/group/photo/${group._id}`} onError={i => (i.target.src = `${logo}`)} alt="logo"/>
                            <hr/>
                            <small>
                                Creado:{" "}
                                <TimeAgo
                             datetime={group.created} 
                              locale='es'
                            />
                            </small>
                            <hr/>

                            {/*<small>
                                {group.users.length}{" "}Usuarios
                            </small>*/}
                            
                        </div>
                        <div className="col-md-8">
                         <h5>{group.name}</h5>
                         <hr/>
                            <p>{group.description}</p>
                            <hr/>
                            <small>
                                Docente:{" "}{group.teacher.name}, Carrera: {" ",group.career}
                            </small>
                        </div>

                        {isAuthenticated().user._id === group.teacher._id ? (<>
                            <div className="col-md-2">
                            <button className="btn btn-block btn-raised btn-success">
                                Editar
                            </button>
                            <Link to={`/Usuario/buscar`} className="btn btn-raised btn-success">
                                <i class="fa fa-user-plus" aria-hidden="true"></i>
                            </Link>
                        </div>
                        </>) : (<></>)}

                    </div>
                    <div className="row">

                        <div className="tabs">
                            <div className="tab-2">
                                <label style={{color:"black"}} htmlFor="tab2-1">Todas</label>
                                <input id="tab2-1" name="tabs-two" type="radio" defaultChecked={true}/>
                                <div>
                                <h4 style={{color:"black"}} >Tab One</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat id velit quis vestibulum. Nam id orci eu urna mollis porttitor. Nunc nisi ante, gravida at velit eu, aliquet sodales dui. Sed laoreet condimentum nisi a egestas.</p><p>Donec interdum ante ut enim consequat, quis varius nulla dapibus. Vivamus mollis fermentum augue a varius. Vestibulum in sapien at lectus gravida lobortis vulputate sed metus. Duis scelerisque justo et maximus efficitur. Donec eu eleifend quam. Curabitur aliquet commodo sapien eget vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum vel aliquet nunc, finibus posuere lorem. Suspendisse consectetur volutpat est ut ornare.</p>
                                </div>
                            </div>
                            <div className="tab-2">
                                <label style={{color:"black"}} htmlFor="tab2-2">Realizadas</label>
                                <input id="tab2-2" name="tabs-two" type="radio" />
                                <div>
                                <h4>Tab Two</h4>
                                <p>Quisque sit amet turpis leo. Maecenas sed dolor mi. Pellentesque varius elit in neque ornare commodo ac non tellus. Mauris id iaculis quam. Donec eu felis quam. Morbi tristique lorem eget iaculis consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean at tellus eget risus tempus ultrices. Nam condimentum nisi enim, scelerisque faucibus lectus sodales at.</p>
                                </div>
                            </div>
                        </div>    
                    </div> 

                
                </>)}

                

            
                   


        </div>
</div>
</div>
            
        </>
        )
    }
}



export default SingleGroup;