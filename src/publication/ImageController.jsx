import React, { Component } from 'react'

 class ImageController extends Component {

    constructor(){
        super();
        this.state = {
            loading: false,
            error:"",
            files: []
        }
    }
    componentDidMount =()=>{
        const {files} = this.props;
        this.setState({files});
    }
    
    getLi =(index) => {
        console.log("index",index);
        if(index == 0){
            return(<>
                <li key={index} data-target="#carouselExampleCaptions" data-slide-to={index} className="active"></li>
            </>)
        }else{
        return(<>
            <li key={index} data-target="#carouselExampleCaptions" data-slide-to={index}></li>
        </>)
        }
    }

    renderImages= (file,index,publicationId)=>{
        if(index==0){
            return (<>
                <div class="carousel-item active">
                    <img  src={`${process.env.REACT_APP_API_URL}/publication/file/path/${publicationId}/${file._id}/${file.title}`} alt={file.title} style={{height:"480px",width:"auto"}}/>
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                </div>
            </>)
        }else{
            return(<>
                <div class="carousel-item">
                <img src={`${process.env.REACT_APP_API_URL}/publication/file/path/${publicationId}/${file._id}/${file.title}`} alt={file.title} style={{height:"480px",width:"auto"}}/>
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                 </div>
            </>)
        }
    }

    render() {
        const {files} = this.props;
        const { publicationId } = this.props;

        return (
            <>
            <div className="row">
                <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        {console.log("files:",files)}
                        {files.map((file, index) =>{
                            return(<>{this.getLi(index)}</>)
                        })}
                    </ol>
                    <div class="carousel-inner">
                        {files.map((file, index) =>{
                            return (<>
                            {this.renderImages(file, index,publicationId)}

                            </>)
                        })}

                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>
            

                {/*files.map((file,i)=>{
                    return(<>
                     <img src={`${process.env.REACT_APP_API_URL}/publication/file/path/${publicationId}/${file._id}/${file.title}`} alt={file.title}/>
                    </>)
                })*/}
            </div>
            </>
        )
    }
}

export default ImageController;