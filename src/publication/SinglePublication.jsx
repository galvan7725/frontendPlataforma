import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import { getPublication } from './apiPublication';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import FileController from './FileController';
import ImageController from './ImageController';
import PublicationEvaluation from './PublicationEvaluation';
import moment from 'moment';
import 'moment/locale/es-us';
import CommentsPublication from './CommentsPublication';
import LinkController from './LinkController';




export default class SinglePublication extends Component {


    constructor(props){
        super(props);
        this.state = {
            redirect:false,
            publication:{comments:[],items:[],group:{users:[]},itemLinks:[]},
            groupId:"",
            groupName :"",
            imageFiles:[],
            error:"",
            filesE:[],
            countFilesE:0,
            isBefore:true
            
        }
    }

    componentDidMount = () =>{
        this.activityData = new FormData();
        moment().locale('es-us');
        moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
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
           //this.setState({imageFiles:this.getImageFiles(result.items)});
           const res =  this.getImageFiles(result.items);
           this.setState({imageFiles:res});
            console.log("result", result);

        } catch (error) {
            console.log(error);
        }

    }

   

    getImageFiles =(files)=>{
        //console.log("Files",files);
        let aux = [];
        for (let index = 0; index < files.length; index++) {
            if(files[index].file.contentType == "image/jpeg" || files[index].file.content=="image/png"){
                aux.push(files[index]);
            }
        }
        //console.log("ImageFiles:",aux);
        return aux;
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

    getColorDate =(date) =>{
        if(moment().isBefore(date)){
            console.log("true");
            return "alert alert-primary";
        }else{
            console.log("false");
            return "alert alert-danger";
            
        }
    }


    render() {

        const { redirect,publication,groupName,imageFiles,filesE } = this.state;
        console.log("Comments",publication.comments);

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
                            {publication.mode === "activity" ? (<>
                                <p>Publicado :{" "}{moment(publication.created).format("dddd, MMMM Do YYYY, h:mm:ss a")}{". "}({moment(publication.created).fromNow()})</p>
                                <p className={this.getColorDate(publication.expiration)} >Fecha de entrega:{" "}{moment(publication.expiration).format("dddd, MMMM Do YYYY, h:mm:ss a")}{". "}({moment(publication.expiration).fromNow()})</p>
                            </>) : (<>
                                <p>Publicado :{" "}{moment(publication.created).format("dddd, MMMM Do YYYY, h:mm:ss a")}{". "}({moment(publication.created).fromNow()})</p>
                            </>)}
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {imageFiles.length != 0 ? (<>
                            <ImageController files={imageFiles} publicationId ={publication._id}/>
                        </>) : (<></>)}
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
                        {publication.itemLinks.length === 0 ? (<></>) : (<>
                        
                            {publication.itemLinks.map((item,i)=>{
                                return (<div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8">
                                        <LinkController link ={item.url} />
                                    </div>
                                    <div className="col-md-2"></div>
                                </div>

                                )
                        })}       

                        </>)
                        
                        
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {isAuthenticated().user.role != "admin" && isAuthenticated().user.role != "teacher" ? (<>
                            {publication.mode === "activity" ? (<>
                                {moment().isBefore(publication.expiration) ? (<>
                                    <h4>Entrega:</h4>
                                    <PublicationEvaluation filesE={filesE} />   
                                </>) : (<>
                                    <p className="alert alert-danger">La fecha limite de entrega ha expirado. <span>&#128546;</span></p>
                                </>)}
                                
                            </>) : (<>
                            
                            </>)}
                            
                        </>) : (<>
                        {publication.mode === "activity" ? (<>
                            <h4>Entregas</h4>
                        </>) : (<></>)}
                        
                        </>)}
                    </div>
                    <div className="col-md-6">
                        {publication._id === undefined ? (<>
                            <p>loading...</p>
                        </>) : (<>
                            <CommentsPublication publicationId={publication._id} comments={publication.comments}/>
                        </>) }
                    </div>
                </div>
               
                
            </div>
</div>
</div>
                
            </>
        )
    }
}
