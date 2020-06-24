import React, { Component } from 'react';
import {FileViewer} from 'react-file-viewer';
import {getPublicationFile} from './apiPublication';
import { isAuthenticated } from '../auth';

 class FileController extends Component {

    constructor(){
        super();
        this.state = {
            error:"",
            loading:false,
            File:null,
            fileId:"",
            publicationId:"",
            fileType:""
        }
    }
    componentDidMount = ()=>{
        const {File,fileId,publicationId} = this.props;
        this.setState({fileId,publicationId});
        const token = isAuthenticated().token;
       
        this.init(token,publicationId,fileId);

    }

    /*
    componentWillReceiveProps =() =>{
        const {fileId, publicationId} = this.props;
        if(fileId == this.state.fileId && publicationId == this.state.publicationId){

        }else{
            this.init();

        }
    }
    */

    init = async (token,publicationId,fileId)=>{
       
        try {
            const result = await getPublicationFile(token,publicationId,fileId);
            if(result.error || !result){
                console.log("Error");
            }
            this.setState({File:result});
            //const fields = result.file.cotentType.split("/");
            //this.setState({fileType:fields[1]});

            console.log("Result",result);
        } catch (error) {
            console.log(error);
        }
    }
    
    renderSwitch = (type) => {
        switch (String(type)) {
            case "application/pdf":
              return(
                <>
                 <i className ="fa fa-file-pdf" style={{color:"red"}}></i>
                </>
              )
              break;
            case "application/msword":  
               return(
                <>
                    <i className="fa fa-file-word" style={{color:"blue"}}></i>
                </>
               )       
            break;
            case  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" :  
            return(
                <>
                <i className="fa fa-file-word" style={{color:"blue"}}></i>
            </>
            )       
         break;
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation" :
            return(
             <>
                <i className="fa fa-file-powerpoint" style={{color:"orange"}}></i>
           </>
            )       
         break;
               case "application/vnd.ms-powerpoint":
         return(
            <>
                <i className="fa fa-file-powerpoint" style={{color:"orange"}}></i>
           </>
          )       
       break;
         case "application/vnd.ms-excel" :
          return(
           <>
            <i className="fa fa-file-excel" style={{color:"green"}}></i>
           </>
          )       
       break;
       case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :
          return(
           <>
            <i className="fa fa-file-excel" style={{color:"green"}}></i>
           </>
          )       
       break;
        case "image/jpeg" :    
       return(
         <>
          <i className="fa fa-file-image" style={{color:"green"}}></i>
         </>
        )       
     break;
          
            default:
              return(
                <>
                <i className="fa fa-file-download"></i>
                </>
              )
              }
    }
    

    render() {
        const {File,fileId,publicationId,fileType} = this.state;
       
        return (
            <div>
               {File == null ? (<>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
               </>) : (<>
               {console.log("File is not null",File.file.contentType)}
               {File.file.contentType == "image/jpeg" ? (<>
                
               </>) : (<>
                <a style={{color:"black"}} href={`${process.env.REACT_APP_API_URL}/publication/file/path/${publicationId}/${fileId}/${File.title}`} target="_blank" rel="noopener noreferrer">
                        {File.title}{" "}{this.renderSwitch(File.file.contentType)}
               </a>
               </>)}
               
               {
                   /*
                <FileViewer
                    fileType={fileType}
                    filePath={`${process.env.REACT_APP_API_URL}/publication/file/path/${publicationId}/${fileId}`}
                    errorComponent={()=>{console.log("error component")}}
                    onError={()=>{console.log("Error file viewer")}}/>
               }
            */}
               </>)}
            </div>
        )
    }

}

export default FileController;