import React, { Component } from 'react'
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { newGroup, allGroups } from './apiGroup';



 class NewGroup extends Component {
     constructor(){
         super();
         this.state = {
             redirect:false,
             name:"",
             description:"",
             teacher:"",
             error:"",
             fileSize:0,
             loading:false,
             newImage:false,
             carrer:"ISC"

         }
     }
     
    componentDidMount = async()  =>{
        this.groupData = new FormData();
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
        if(isAuthenticated().user.role == "teacher" || isAuthenticated().user.role == "admin"){
            this.setState({teacher:isAuthenticated().user._id});
            this.groupData.set('teacher',isAuthenticated().user._id);
        }else{
            this.setState({redirect:true});
        }

        try {
            
            const groups = await allGroups(isAuthenticated().token);
            console.log(groups);
        } catch (error) {
            console.log(error);
        }


    }

    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;
    
        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        if(name === "photo"){
            this.loadFile(event);
        }
        this.groupData.set(name, value);
        this.setState({ [name]: value, fileSize });
      };

      loadFile = (event) =>{
        
            var reader = new FileReader();
            reader.onload = function(){
              var output = document.getElementById('output');
              output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({newImage:true});
            //this.setState({fileSize:event.target.files[0].size});

          
      }

    isValid = () => {
        const { name, fileSize } = this.state;
        if (fileSize > 1000000) {
          this.setState({
            error: "La imagen no debe pesar mas de  100kb",
            loading: false
          });
          return false;
        }
        if (name.length === 0) {
          this.setState({ error: "El nombre es obligatorio", loading: false });
          return false;
        }
        // email@domain.com
        /*
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          this.setState({
            error: "Es necesario un email valido",
            loading: false
          });
          return false;
        }*/
        return true;
      };

      clickSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true });
        console.log(this.groupData);
        const token = isAuthenticated().token;
        if(this.isValid()){

         try {
            const result = await newGroup(token,this.groupData);
            if(result.error){
                console.log(result.error);
            }else{
                console.log(result);
            }
         } catch (error) {
             console.log(error);
             
         }

        }else{

        }
    
    
    }



    render() {
        const { redirect, name , description, newImage, error, carrer } = this.state;

        if(redirect){
            return (<Redirect to={`/Grupos/${isAuthenticated().user._id}`} />)
        }
        
        const styles = {
            input_group : {
                textAlign:"initial"
            },
            avatar:{
                width:"50%",
                margin:"auto",
                borderRadius:"50%",
                border:"2px solid aqua",
                marginTop:"5px"
            }
        }

        return (
            <>
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

           <SideBar/>

        <div className="container" id="contenedor">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                               
                <form>
                        <label>Nuevo Grupo de trabajo</label>
                        <hr/>
                        
                        <input name="file" id="file" className="inputfile" type="file" accept="image/*"onChange={this.handleChange("photo")} />
                        <label htmlFor="file">Selecciona una imagen</label>
                            <hr/>
                        {newImage ? (<>
                            <img id="output"style={styles.avatar} />
                        </>) : (<></>)}

                        <div className="form-group" style={styles.input_group}>
                            <label htmlFor="userName">Nombre del grupo:</label>
                            <input type="text" onChange={this.handleChange("name")} value={name} className="form-control" id="groupName" placeholder="Nombre" />
                        </div>
                        <div className="form-group text-center" style={styles.input_group}>
                            <label htmlFor="groupDescription">Descripcion:</label>
                            <input type="text" onChange={this.handleChange("description")} value={description} className="form-control" id="groupDescription" placeholder="Ingresa una descripcion"/>
                        </div>
                        <div className="form-group text-center" style={styles.input_group}>
                            <label htmlFor="carrer">Carrera:</label>
                            <select className="form-control" id="carrer" onChange={this.handleChange("carrer")} value={carrer}>
                                <option select>ISC</option>
                                <option>TICS</option>
                                <option>II</option>
                                <option>IIA</option>
                                <option>IGE</option>
                                <option>GASTRONOMIA</option>
                            </select>
                        </div>
                        
                        
                        <button type="submit" onClick={this.clickSubmit} className="btn btn-raised btn-primary">Aceptar</button>
                        <Link to={`/Grupos/${isAuthenticated().user._id}`} className="btn btn-raised btn-danger ml-2">Cancelar</Link>
                        </form>
                        { error != "" ? (<div className="alert alert-danger" role="alert">
                                            {`error : ${error}`}
                                        </div>):(<></>)}
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

export default NewGroup;