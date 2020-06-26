import React, { Component } from 'react';
import logoPDF from "../images/pdf.png";
import logoWord from "../images/doc.png";
import logoPower from '../images/power.png';
import logoExcel from '../images/excel.png';
import { Carousel } from "react-responsive-carousel";

 class PublicationEvaluation extends Component {

    constructor(){
        super();
        this.state = {
            redirect:false,
            error:"",
            files:[],
            countFiles:0,
            filesE:[],
            countFilesE:0
        }
    }
    componentDidMount =() =>{
        this.activityData = new FormData();
        const {filesE} = this.props;
        this.setState({filesE});

    }
    handleChange = (name) => (event) => {
        this.setState({ error: "" });
    
        if (name === "file") {
          //this.clearFiles();
          this.loadFile(event);
        } else {
          const value = event.target.value;
          this.setState({ [name]: value });
          this.activityData.set(name, value);
          //aux = event.target.files;
        }
        //console.log("Form", this.publicationData);
      };

      loadFile = (event) => {
        let aux = [];
    
        console.log(event.target.files.length);
        for (let index = 0; index < event.target.files.length; index++) {
          aux.push(event.target.files[index]);
        }
        this.setState({ files: aux,countFiles:aux.length });
        this.activityData.set("files", aux);
    
    
        for (let index = 0; index < event.target.files.length; index++) {
          this.readImage(event, index);
          this.activityData.append("file"+(index+1),aux[index]);
        }
    
        this.setState({ newImage: true });
        //this.setState({fileSize:event.target.files[0].size});
      };

      readImage = (event, index) => {
        let reader = new FileReader();
        switch (event.target.files[index].type) {
          case "application/pdf":
            console.log("Archivo pdf");
            break;
          case "application/msword" :
            console.log("Archivo word");
            break;  
            case  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" :
              console.log("Archivo word");
              break;  
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation" :
            console.log("Archivo powerpoint");
            break;
            case "application/vnd.ms-powerpoint":
              console.log("Archivo powerpoint");
              break;  
          case "application/vnd.ms-excel" || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :
              console.log("Archivo excel");
            break;
          default:
            reader.onload = function () {
              var output = document.getElementById("img" + index);
              output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[index]);
            break;
        }
    
        /*
        if (event.target.files[index].type == "application/pdf") {
          console.log("Archivo pdf");
        } else if (event.target.files[index].type == "application/msword" || event.target.files[index].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          console.log("Archivo word");
        } else {
          reader.onload = function () {
            var output = document.getElementById("img" + index);
            output.src = reader.result;
          };
          reader.readAsDataURL(event.target.files[index]);
        }
        */
      };
    
      renderSwitch = (type,i) => {
        switch (String(type)) {
          case "application/pdf":
            return(
              <>
                <img
                  id={`img${i}`}
                  src={logoPDF}
                  alt="loading..."
                  style={{
                    height: "300px",
                    maxHeight: "300px",
                    width: "auto",
                  }}
                />
              </>
            )
            break;
          case "application/msword":  
             return(
              <>
              <img
                id={`img${i}`}
                src={logoWord}
                alt="loading..."
                style={{
                  height: "400px",
                  maxHeight: "400px",
                  width: "auto",
                }}
              />
            </>
             )       
          break;
          case  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" :  
          return(
           <>
           <img
             id={`img${i}`}
             src={logoWord}
             alt="loading..."
             style={{
               height: "400px",
               maxHeight: "400px",
               width: "auto",
             }}
           />
         </>
          )       
       break;
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation" :
          return(
           <>
           <img
             id={`img${i}`}
             src={logoPower}
             alt="loading..."
             style={{
               height: "400px",
               maxHeight: "400px",
               width: "auto",
             }}
           />
         </>
          )       
       break;
             case "application/vnd.ms-powerpoint":
       return(
         <>
         <img
           id={`img${i}`}
           src={logoPower}
           alt="loading..."
           style={{
             height: "400px",
             maxHeight: "400px",
             width: "auto",
           }}
         />
       </>
        )       
     break;
       case "application/vnd.ms-excel" || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :
        return(
         <>
         <img
           id={`img${i}`}
           src={logoExcel}
           alt="loading..."
           style={{
             height: "400px",
             maxHeight: "400px",
             width: "auto",
           }}
         />
       </>
        )       
     break;
        
          default:
            return(
              <>
            <img
              id={`img${i}`}
              alt="loading..."
              style={{
                height: "400px",
                maxHeight: "400px",
                width: "auto",
              }}
            />
          </>
            )
            }
            
      }

      resetNew = (event) => {
        event.preventDefault();
        const form = document.querySelector("#formP");
        form.reset();
        this.setState({files:[],countFiles:0});
      }
    
      clearFiles = () =>{
        const { countFiles } = this.state;
         for (let index = 0; index < countFiles.length; index++) {
          this.publicationData.delete("file"+(index+1));
         }
    
        
      }

      
  clickSubmit = async (event) => {
    event.preventDefault();
    console.log("clickSubmit");
  }
    
    render() {
        const {files,countFiles} = this.state;

        return (
            <>
              <form encType="multipart/form-data" id="formP">
                            <input
                                name="files"
                                id="files"
                                className="inputfile"
                                type="file"
                                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/* .xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                onChange={this.handleChange("file")}
                                multiple
                            />    
                            <label htmlFor="files">Selecciona archivos</label>
                      <br />
                      <small className="text-danger">
                        {files.length} Archivos seleccionados
                      </small>
                      <hr />
                      <Carousel style={{ width: "200px" }}>
                        {files.map((file, i) => {
                          console.log("File: ", file.type);
                          return (
                            <div key={i}>
                              
                               {
                                 this.renderSwitch(file.type,i)    
                               }
                              
                                  

                              <p className="legend">{file.name}</p>
                            </div>
                          );
                        })}
                      </Carousel>
                      {countFiles === 0 ? (<></>):(<>
                        <button
                        type="submit"
                        onClick={this.clickSubmit}
                        className="btn btn-raised btn-primary"
                      >
                        Enviar
                      </button>
                      <button
                        type="button"
                        id="btnModalCancel"
                        className="btn btn-raised btn-danger ml-2"
                        data-dismiss="modal"
                        onClick={this.resetNew}
                      >
                        Cancelar
                      </button>
                      </>)}
                      
                 </form>  
            </>
        )
    }
}

export default PublicationEvaluation;