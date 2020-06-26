import React, { Component } from 'react';
import { getComments,newComment } from './apiPublication';
import { isAuthenticated } from '../auth';

 class CommentsPublication extends Component {

    constructor(){
        super();
        this.state = {
            text:"",
            error:"",
            loading: false,
            publicationId:""
        }
    }
    componentDidMount = async() =>{
        const { publicationId } = this.props;
        const token = isAuthenticated().token;
        try {
            const result = await getComments(token, publicationId);
            console.log("Result: ",result);
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
            console.log("Response: " + JSON.stringify(response));
        } catch (error) {
            console.log(error)
        }
    }


    render() {

        const {text} = this.state;

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
              separator:{
                border: "1px solid black"
              }
        }
        return (
            <>
            <div className="row" style={{maxHeight:"400px",overflow:"auto"}} >
                <h4>comments</h4>
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