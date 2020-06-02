import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { isAuthenticated } from '../auth';
import { getGroup,updateGroup } from './apiGroup';
import { Redirect,Link } from 'react-router-dom';
import logo from '../logo.svg';

export default class EditGroup extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false,
            group: { users: [], publications: [], teacher: {} },
            error: "",
            loading: false,
            name:"",
            description:"",
            carrer:"",
            newImage:false
        }
    }


    componentDidMount = () =>{
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
        if(isAuthenticated().user.role === "admin" || isAuthenticated().user.role === "teacher"){
            const groupId = this.props.match.params.groupId;
            this.init(groupId);
        }else{
            this.setState({redirect:true});
        }
        

    }

    init = async (groupId)=>{
        try {
            const result = await getGroup(isAuthenticated().token, groupId);
            
            if (result.error || !result) {
                this.setState({ loading: false });
                console.log(result.error);
            } else {
                const { name,description,career } = result;
                console.log(result);
                this.setState({group:result});
                this.setState({name,description,carrer:career});
                this.setState({ loading: false });
            }
        } catch (error) {
            this.setState({ loading: false });
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

        return true;
      };

      clickSubmit = async event => {
        event.preventDefault();
        const {group,name, description,carrer} = this.state;


        this.groupData.set("name",name);
        this.groupData.set("description",description);
        this.groupData.set("carrer",carrer);
        this.setState({ loading: true });
        console.log(this.groupData);
        const token = isAuthenticated().token;

        if(this.isValid()){

         try {
            const result = await updateGroup(token,this.groupData,group._id);

            if(result.error || !result){
                console.log(result.error);
            }else{
                console.log("Result edit group: ",result);
            }
         } catch (error) {
             console.log(error);
             
         }

        }else{
            console.log("Isnt valid");
        }
    
    
    }


    render() {
        const { group, error, redirect, newImage, name, description, carrer } = this.state;
        //console.log("group: ",group);

        if(redirect){
            return (<Redirect to={`/Grupos/${isAuthenticated().user._id}`} />)
        }
        
        const styles = {
            input_group : {
                textAlign:"initial"
            },
            avatar:{
                width:"40%",
                height: "auto",
                maxHeight: "300px",
                overflow: "auto",
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
                    <div className="col-md-2">
                        
                    </div>
                    <div className="col-md-8">
                    <form>
                        <label>Editar Grupo de trabajo</label>
                        <hr/>
                        {newImage ? (<></>) : (<>
                            <img src={`${process.env.REACT_APP_API_URL}/group/photo/${group._id}`} onError={i => (i.target.src = `${logo}`)}  alt="logo" style={styles.avatar}/> 
                         </>)}
                        
                        <input name="file" id="file" className="inputfile" type="file" accept="image/*"onChange={this.handleChange("photo")} />
                        <label htmlFor="file">Selecciona una imagen</label>
                            <hr/>
                        {newImage ? (<>
                            <img id="output"style={styles.avatar} alt="logo"/>
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
                                <option value ="ISC">ISC</option>
                                <option value ="TICS">TICS</option>
                                <option value="IIA">II</option>
                                <option value="IIA">IIA</option>
                                <option value="IGE">IGE</option>
                                <option value="GASTRONOMIA">GASTRONOMIA</option>
                            </select>
                        </div>
                        
                        
                        <button type="submit" onClick={this.clickSubmit} className="btn btn-raised btn-primary">Aceptar</button>
                        <Link to={`/Grupos/${isAuthenticated().user._id}`} className="btn btn-raised btn-danger ml-2">Cancelar</Link>
                            
                    </form>
                        { error != "" ? (<div className="alert alert-danger" role="alert">
                                            {`error : ${error}`}
                                        </div>):(<></>)}
                    </div>
                    <div className="col-md-2">
                    
                    </div>
                </div>
            </div>
</div>
</div>
                
            </>
        )
    }
}
