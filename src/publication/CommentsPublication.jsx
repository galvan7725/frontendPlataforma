import React, { Component } from 'react';
import { getComments,newComment } from './apiPublication';
import { isAuthenticated } from '../auth';
import Swal from 'sweetalert2';
import logo from '../logo.svg';
import moment from 'moment';
import 'moment/locale/es-us';

 class CommentsPublication extends Component {

    constructor(){
        super();
        this.state = {
            text:"",
            error:"",
            loading: false,
            publicationId:"",
            comments:[]
        }
    }
    componentDidMount = async() =>{
        moment().locale('es-us');
        moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        this.setState({loading:true});
        const { publicationId } = this.props;
        const token = isAuthenticated().token;
        try {
            const comments = await getComments(token, publicationId);
            this.setState({ comments:comments.comments,loading: false});
            console.log("Result: ",comments);
            
        } catch (error) {
            console.log(error);
        }

    }

    handleChange = (name) => (event) =>{
        this.setState({[name] : event.target.value});
       
    }

    clickSubmit = async event =>{
        event.preventDefault();
        const {text} = this.state
        const {publicationId} = this.props;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const body = {
            text,publicationId,userId
        }
        try {
            const response = await newComment(body,token);
            if(response.error || !response){
                Swal.fire({
                    type: "Error",
                    title:"Error",
                    message: "No se pudo agregar el comentario"
                });

            }else{
                Swal.fire({
                    type: "success",
                    title:"Correcto",
                    message: "Se agrego el comentario"
                })
                this.setState({comments:response.comments,text:""})
            }
            
            console.log("Response: " + JSON.stringify(response));
        } catch (error) {
            console.log(error)
        }
    }


    render() {

        const {text, comments,loading} = this.state;

        const styles = {
            form : {
                display:"flex"
            },
            formGroup:{
                flex:"80"
            },
            btnSearch:{
                height:"40px",
                marginTop:"-6px"
            },
            cardTitle:{
                display: "flex",
                alignItems:"center"
              },
              cardBody:{
                maxHeight: "400px",
                overflow:"auto"
              },
              separator:{
                border: "1px solid black"
              }
        }
        return (
            <>
            <h3>Comentarios</h3>
            <div className="row" style={{maxHeight:"380px",overflow:"auto"}} >
                {loading ? (<></>) : (<>
                    {comments.length === 0 ? (<>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p>No hay comentarios.</p>
                        </div>
                    </div>
                </>) : (<>
                    {comments.map((comment, index)=>{
                        return (
                            <div className="comment-container" key={index}>
                                <div className="comment-image">
                                    <img  src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`} onError={i => (i.target.src = `${logo}`)} alt="logo" />
                                </div>
                                <div className="comment-content">
                                <small>{comment.postedBy.name}</small>
                                <p>{comment.text}</p>
                                <div className="comment-footer">
                                <strong><i className="fa fa-comment-dots"></i>{moment(comment.created).fromNow()}</strong>
                                <i class="icon-t fa fa-trash-alt"></i>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </>)}
                </>)}
            </div>
            <form style={styles.form}>
            <div className="form-group" style={styles.formGroup}>
                            <input type="text" onChange={this.handleChange("text")} value={text} className="form-control" id="text" placeholder="Texto..." />
                        </div>
                        
                        <button type="submit" onClick={this.clickSubmit}className="btn btn-raised btn-primary" style={styles.btnSearch}>
                            <i class="fa fa-paper-plane" aria-hidden="true"></i></button>

            </form>
            </>
        )
    }
}


export default CommentsPublication;