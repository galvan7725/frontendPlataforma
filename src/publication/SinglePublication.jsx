import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { getGroup } from '../group/apiGroup';
import { getPublication } from './apiPublication';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import FileController from './FileController';


export default class SinglePublication extends Component {


    constructor(props){
        super(props);
        this.state = {
            redirect:false,
            publication:{comments:[],items:[],group:{users:[]}},
            groupId:"",
            groupName :""
            
        }
    }

    componentDidMount = () =>{
        let window = document.querySelector('#contenedor');
        //console.log(window);
        /*
        let hammer = new Hammer(window);
        hammer.get('swipe').set({direction:Hammer.DIRECTION_RIGHT});
        hammer.on('swipe',()=>{
            $(".wrapper").toggleClass("active")
            //this.setState({redirectLogin:true});
            console.log("swipe");
        });
        */
        
        const publicationId = this.props.location.state.params.idPublication;
        const groupId = this.props.location.state.params.idGroup;
        const groupName = this.props.location.state.params.groupName;
        console.log("idPublication: ",publicationId,groupId,groupName);
        $("#link_grupos").addClass('active');
        if(publicationId === undefined || groupId === undefined || groupName === undefined){
            this.setState({redirect:true});
        }
        this.init(publicationId,groupId,groupName);        

    }

    init = async (publicationId,groupId,groupName)=>{
        const token = isAuthenticated().token;
        try {
            const result = await getPublication(token, publicationId);
            this.setState({publication:result,groupId,groupName});
            //comprobamos si el usuario puede ver la publicacion
            if(!this.comprobation(result.group.users) && result.group.teacher !== isAuthenticated().user._id){
                this.setState({redirect:true});
            }
            
            console.log("result", result);

        } catch (error) {
            console.log(error);
        }

    }

    comprobation = (users)=>{
        let aux = false;
        const userId = isAuthenticated().user._id;
        for (let index = 0; index < users.length; index++) {
            if(users[index] === userId){
                aux = true;
            }
            
        }

        return aux;

    }


    render() {

        const { redirect,publication, groupId,groupName } = this.state;

        if(redirect){
            return(
                <Redirect to={`/Grupos/${isAuthenticated().user._id}`}/>
            )
        }
        return (
            <>
                <div className="wrapper active">

                <NavBar />

                <div className="main_body">
    
               <SideBar/>

            <div className="container" id="contenedor">
                <div className="row">
                    <div className="col-md-4">
                        <p>{groupName}</p>
                    </div>
                    <div className="col-md-4">
                        <h4>{publication.title}</h4>
                    </div>
                    <div className="col-md-4">
                            {isAuthenticated().user._id === publication.group.teacher ? (<>
                                <button className="btn btn-raised btn-warning">Editar</button>
                            </>) : (<></>)}
                            
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                            <p>{publication.description}</p>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {publication.items.map((item, index) =>{
                            return (<>
                                {console.log("Item: ",item)}
                                <FileController fileId={item._id} publicationId ={publication._id} ></FileController>
                                {/*
                                <a style={{color:"black"}} href={`${process.env.REACT_APP_API_URL}/publication/file/${publication._id}/${item._id}`} target="_blank" rel="noopener noreferrer">
                                    Item {index}
                                </a>
                                */}
                            </>)
                        }

                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {publication.mode === "activity" ? (<>
                            <form>
                                <input type="file" name="aa" id="aa" />
                            </form>
                        </>) : (<></>)}
                    </div>
                    <div className="col-md-6">
                        <p>comments</p>
                    </div>
                </div>
               
                
            </div>
</div>
</div>
                
            </>
        )
    }
}
