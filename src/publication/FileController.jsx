import React, { Component } from 'react';
import {FileViewer} from 'react-file-viewer';

 class FileController extends Component {

    constructor(){
        super();
        this.state = {
            error:"",
            loading:false,
            file:null
        }
    }

    render() {
        const {File} = this.props;

        return (
            <div>
                <FileViewer
                    fileType={File.type}
                    filePath={File.file}
                    errorComponent={()=>{console.log("error component")}}
                    onError={()=>{console.log("Error file viewer")}}/>
            </div>
        )
    }

}

export default FileController;