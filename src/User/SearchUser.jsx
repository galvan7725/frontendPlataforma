import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { searchUser } from './apiUser';
import { isAuthenticated } from '../auth';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { newUser } from '../group/apiGroup';
import Swal from 'sweetalert2';


export default class SearchUser extends Component {

    constructor(){
        super();
        this.state = {
            users:[],
            usersPush:[],
            text:"",
            loading: false,
            error:""
        }
    }





    handleChange = (name) => (event) =>{
        this.setState({[name] : event.target.value});
        this.callSearch(event);
    }

    handleChangeUsers = () => async event =>{
        event.preventDefault();
        console.log(event.target.id);
        const token = isAuthenticated().token;
        const data ={newUserId:event.target.id,
                     groupId:this.props.group._id            
        }
        const aux1 = this.props.group._id;
        const aux2 =event.target.id;

        Swal.fire({
            title: 'Esta seguro?',
            text: "Se agregara un usuario al grupo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0f0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, adelante!'
          }).then(async(result) => {
            if (result.value) {
             //continuar

              try {
                  const result = await newUser(token,aux2,aux1);
                  await console.log("Result",result);
                  if(result.error || !result){
                      console.log("Result error:",result);
                    Swal.fire(
                        'Error!',
                        result.error,
                        'error'
                      )
                  }else{
                    Swal.fire({
                        icon: 'success',
                        title: 'Se añadio el usuario',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      //this.props.group = result;
                      console.log("try result:",result.result);

                      this.props.updateGroup(result);
                  }
              } catch (error) {
                  console.log("Error",error);
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



    }

    callSearch =async(e) =>{
       // e.preventDefault();
        
        const  text = e.target.value;


        if(text ===""){
            this.setState({users:[]})

        }else{
            try {
                const {user} = await searchUser(isAuthenticated().token,text);
                console.log(user.length);
                this.setState({users:user});
            } catch (error) {
                console.log(error);
            }
        }
    }

    checkUser = (userId) =>{
        const { group } = this.props;
        let aux = false;
        for (let index = 0; index < group.users.length; index++) {
            let groupA = group.users[index];

            if(groupA._id == userId){
                aux = true;
            }
            
        }

        return aux;
    }



    render() {

        const { text, users } = this.state;
        const { group } = this.props;

        console.log("Group search:",group.users);
        console.log("Users search",users);

        const styles = {
            form : {
                display:"flex"
            },
            formGroup:{
                flex:"80"
            },
            btnSearch:{
                height:"40px",
                marginTop:"20px"
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
              separator:{
                border: "1px solid black"
              }
        }
    

        return (
            <>
               
                <div className="row">
                   
                    
                    <div className="col-md-12">
                    <form style={styles.form}>
                        
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="exampleInputPassword1">Texto:</label>
                            <input type="text" onChange={this.handleChange("text")} value={text} className="form-control" id="text" placeholder="Texto..." />
                        </div>
                        
                        <button type="submit" className="btn btn-raised btn-primary" style={styles.btnSearch}>
                            <i class="fa fa-search" aria-hidden="true"></i></button>
                        
                        
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
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


                                                {this.checkUser(user._id)  ? (<>
                                                    <small className="text-danger">El usuario ya pertenece al grupo</small>
                                                    
                                                </>) : (<>
                                                    <button className="btn btn-raised btn-primary"  onClick={this.handleChangeUsers()} value="" name={`ch${i}`} id={user._id}>
                                                        <i class="fa fa-user-plus" aria-hidden="true"></i>
                                                    </button>                                                    
                                                </>)}


                                            </div>
                                        </div>

                                        <hr style={styles.separator}/>                     
                                        </>
                                        )
                                        })
                                     }
                            </div>
                            
                    
                </div>




                
            </>
        )
    }
}
