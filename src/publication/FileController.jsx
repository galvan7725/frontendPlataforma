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
    

    render() {
        const {File,fileId,publicationId,fileType} = this.state;
       
        return (
            <div>
               {File == null ? (<>
                <h2>Loading...</h2>
               </>) : (<>
               {console.log("File is not null")}
               <a style={{color:"black"}} href={`${process.env.REACT_APP_API_URL}/publication/file/path/${publicationId}/${fileId}`} target="_blank" rel="noopener noreferrer">
                   file
               </a>
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