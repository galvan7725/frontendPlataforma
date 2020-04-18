import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { getGroup, newUser, deleteUser } from './apiGroup';
import { isAuthenticated } from '../auth';
import './Test.css';
import logo from '../logo.svg';
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js';
import es from 'timeago.js/lib/lang/es';
import { Link, Redirect } from 'react-router-dom';
import SearchUser from '../User/SearchUser';
import Swal from 'sweetalert2';




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

    removeUser = async(userId)=>{
        console.log(userId);
        const { group } = this.state;
        const token = isAuthenticated().token;
        const groupId = this.state.group._id;
        const teacherId = isAuthenticated().user._id;
        let { users } = group;



        Swal.fire({
            title: 'Esta seguro?',
            text: "Se eliminara el usuario del grupo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0f0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, adelante!'
          }).then(async(result) => {
            if (result.value) {
             //continuar

              try {
                  const result = await deleteUser(token,userId,groupId,teacherId);
                  if(result.error || !result){
                    Swal.fire(
                        'Error!',
                        result.error,
                        'error'
                      )
                  }else{

                    Swal.fire({
                        icon: 'success',
                        title: 'Se elimino el usuario',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.setState({group:result});
                  }
              } catch (error) {
                  console.log(error);
                  Swal.fire(
                    'Error!',
                     error,
                    'error'
                  )
              }  

              
            }else{
                //calcel

            }
          })

          //this.setState({group});
    }
    updateGroup = (group) => {
        this.setState({group:group});
    }



    render() {
        const { group, error,loading } = this.state;
        const { users } = group;

        const styles = {
            imgGroup : {
                width: "100px"
            },
            separator:{
                border: "1px solid black"
              },
              cardTitle:{
                display: "flex",
                alignItems:"center"
              },
              cardBody:{
                maxHeight: "400px",
                overflow:"auto"
              },
              imgGroup:{
                width:"100px"
              },
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

                            {<small style={{color:"black",cursor:"pointer"}} data-toggle="modal" data-target="#exampleModal2">
                                {group.users.length}{" "}Usuarios
                            </small>}
                            <hr/>
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
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                 <i class="fa fa-user-plus" aria-hidden="true"></i>
                            </button>
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

        


                                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        
                                        <h5 class="modal-title" id="exampleModalLongTitle">Agregar usuarios</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <SearchUser group={group} updateGroup={this.updateGroup}/>
                                    </div>
                                    <div class="modal-footer">

                                        <button type="button" class="btn btn-raised btn-warning" data-dismiss="modal">Cerrar</button>
                                        <button type="button" class="btn btn-raised btn-primary">Agregar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                {//Modal usuarios del grupo
                                }

                                <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModal2" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        
                                        <h5 class="modal-title" id="exampleModalLongTitle">Usuarios del grupo</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                    <div className="row" style={{height:"400px",maxHeight:"400px"}}>
                                                    <div className="col-md-2"></div>
                                                    <div className="col-md-8">
                                                            
                                                                    { users.map((user,i)=>{
                                                                        return(
                                                                        <>
                                                                            <hr style={styles.separator}/>

                                                                        
                                                                            <div className="row"  >
                                                                            <div className="col-md-2">
                                                                            <img style={styles.imgGroup} src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src = `${logo}`)} alt="logo"/>
                                                                            </div>
                                                                            <div className="col-md-10">
                                                                                <h6>{user.name}</h6>
                                                                                <hr/>
                                                                                <p>{user.noControl}</p>
                                                                                <small>{user.email}</small>
                                                                                { isAuthenticated().user._id === group.teacher._id ? (<>
                                                                                    <button className="btn btn-danger" onClick={() =>this.removeUser(user._id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                                                                </>) : (<></>)}
                                                                                


                                                                            </div>
                                                                        </div>

                                                                        <hr style={styles.separator}/>                     
                                                                        </>
                                                                        )
                                                                        })
                                                                    }
                                                            </div>
                                                            
                                                    
                                                </div>
                                    </div>
                                    <div class="modal-footer">

                                        <button type="button" class="btn btn-raised btn-warning" data-dismiss="modal">Cerrar</button>
                                        
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