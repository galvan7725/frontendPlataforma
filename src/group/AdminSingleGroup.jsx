import React, { Component } from "react";
import NavBar from "../core/NavBar";
import "../App.css";
import $ from "jquery";
import SideBar from "../core/SideBar";
import Hammer from "hammerjs";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getGroup,newPublication } from "./apiGroup";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import logo from "../logo.svg";
import logoPDF from "../images/pdf.png";
import logoWord from "../images/doc.png";
import Swal from 'sweetalert2';

class AdminSingleGroup extends Component {
  constructor() {
    super();
    this.state = {
      idGroup:"",
      redirect: false,
      error: "",
      files: [],
      name:"",
      description:"",
      teacher:{},
      carrer:"",
      users:[],
      title:"",
      descriptionN:"",
      type:"activity",
      expiration:"",
      countFiles:0
    };
  }

  componentDidMount = async () => {
    this.publicationData = new FormData();
    let window = document.querySelector("#contenedor");
    //console.log(window);
    let hammer = new Hammer(window);
    hammer.get("swipe").set({ direction: Hammer.DIRECTION_RIGHT });
    hammer.on("swipe", () => {
      $(".wrapper").toggleClass("active");
      //this.setState({redirectLogin:true});
      console.log("swipe");
    });
    //console.log(this.props.location.pathname);
    $("#link_grupos").addClass("active");
    const groupId = this.props.match.params.groupId;
    if(isAuthenticated().user.role === "admin" || isAuthenticated().user.role === "teacher"){
      await this.init(groupId);
    }else{
      this.setState({redirect:true});
    }
  };

  init = async (groupId) => {
    //console.log(groupId);

    try {
      const result = await getGroup(isAuthenticated().token, groupId);
      if(result.error || !result){
        console.log("Error fetch group");
      }else{
        const { name, description,career,teacher,users,_id} = result;
        this.setState({name,description,carrer:career,teacher,users,idGroup:_id});
       if(!teacher._id === isAuthenticated().user._id){
          this.setState({redirect:true});
       }
       console.log("Result: ",result);
      }
      
    } catch (error) {
      console.log(error);
    }

  };


  handleChange = (name) => (event) => {
    this.setState({ error: "" });

    if (name === "file") {
      //this.clearFiles();
      this.loadFile(event);
    } else {
      const value = event.target.value;
      this.setState({ [name]: value });
      this.publicationData.set(name, value);
      //aux = event.target.files;
    }
    //console.log("Form", this.publicationData);
  };


  clickSubmit = async (event) => {
    event.preventDefault();
    const {idGroup,files,type,countFiles} = this.state;
    this.publicationData.append("type",type);
    this.publicationData.append("countFiles",countFiles);
    const token = isAuthenticated().token;

    console.log(files);

    

    Swal.fire({
      title: 'Esta seguro?',
      text: "Se creara la plublicacion",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Adelante'
    }).then(async(result) => {
      if (result.value) {
        try {
          
          const result = await newPublication(token,idGroup,this.publicationData);
          if(result.error || !result){
            console.log("Error fetch newPublication");
          }else{
            console.log("Result: ",result);
            this.publicationData = new FormData();
            const btnD = document.querySelector("#btnModalCancel");
            btnD.click();
            //modal.classList.remove("show");
            
          }


        } catch (error) {
          console.log(error);
        }
        /*
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        */
      }else{

      }
    })

  };

  resetNew = (event) => {
    event.preventDefault();
    const form = document.querySelector("#formP");
    form.reset();
    this.setState({files:[],title:"",descriptionN:"",type:"activity",expiration:""});
  }

  clearFiles = () =>{
    const { countFiles } = this.state;
     for (let index = 0; index < countFiles.length; index++) {
      this.publicationData.delete("file"+(index+1));
     }

    
  }

  loadFile = (event) => {
    let aux = [];

    console.log(event.target.files.length);
    for (let index = 0; index < event.target.files.length; index++) {
      aux.push(event.target.files[index]);
    }
    this.setState({ files: aux,countFiles:aux.length });
    this.publicationData.set("files", aux);


    for (let index = 0; index < event.target.files.length; index++) {
      this.readImage(event, index);
      this.publicationData.append("file"+(index+1),aux[index]);
    }

    this.setState({ newImage: true });
    //this.setState({fileSize:event.target.files[0].size});
  };

  readImage = (event, index) => {
    let reader = new FileReader();
    if (event.target.files[index].type == "application/pdf") {
      console.log("Archivo pdf");
    } else if (event.target.files[index].type == "application/msword") {
      console.log("Archivo word");
    } else {
      reader.onload = function () {
        var output = document.getElementById("img" + index);
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[index]);
    }
  };

  render() {
    const { redirect, files,name, description,carrer,type, error } = this.state;

    if(redirect){
      return (<Redirect to={`/Grupos/${isAuthenticated().user._id}`} />)
  }

    const styles = {
      input_group: {
        textAlign: "initial",
      },
      avatar: {
        width: "50%",
        margin: "auto",
        borderRadius: "50%",
        border: "2px solid aqua",
        marginTop: "5px",
      },
    };

    return (
      <>
        <div className="wrapper active">
          <NavBar />

          <div className="main_body">
            <SideBar />

            <div className="container" id="contenedor">
              <div className="row">
              <h5>Administrar grupo {name} , {carrer}</h5>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <button
                    className="btn btn-success btn-block btn-outline"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Nueva Publicacion
                  </button>
                </div>
                <div className="col-md-4">tab2</div>
                <div className="col-md-4">tab3</div>
              </div>
            </div>
          </div>
        </div>
        {
          //Modal nueva publicacion
        }

        <div
          class="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Nueva publicacion
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <form encType="multipart/form-data" id="formP">
                      <div className="form-group" style={styles.input_group}>
                          <label htmlFor="titleNew">Titulo:</label>
                          <input
                            type="text"
                            onChange={this.handleChange("title")}
                            className="form-control"
                            id="titleNew"
                            placeholder="Titulo..."
                          />
                        </div>
                        <div className="form-group" style={styles.input_group}>
                          <label htmlFor="descriptionN">Descripcion:</label>
                          <textarea
                            
                            onChange={this.handleChange("descriptionN")}
                            className="form-control"
                            id="descriptionN"
                            rows="5" cols="50"
                            placeholder="Agrega una descripcion..."
                          ></textarea>
                        </div>
                      <input
                        name="files"
                        id="files"
                        className="inputfile"
                        type="file"
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
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
                          console.log("File: ", file);
                          return (
                            <div key={i}>
                              {file.type == "application/pdf" ||
                              file.type == "application/msword" ? (
                                <>
                                  {file.type == "application/pdf" ? (
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
                                  ) : (
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
                                  )}
                                </>
                              ) : (
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
                              )}

                              <p className="legend">{file.name}</p>
                            </div>
                          );
                        })}
                      </Carousel>
                      <div
                        className="form-group text-center"
                        style={styles.input_group}
                      >
                        <label htmlFor="type">Tipo:</label>
                        <select className="form-control" id="type" onChange={this.handleChange("type")}>
                                <option value ="activity">Actividad entregable</option>
                                <option value ="support">Material de apoyo</option>
                                <option value="notice">Aviso</option>
                            </select>
                      </div>

                     {type === "activity" ? (<>
                      <div className="form-group" style={styles.input_group}>
                        <label htmlFor="expiration">Fecha limite:</label>
                        <input
                          type="datetime-local"
                          onChange={this.handleChange("expiration")}
                          className="form-control"
                          id="expiration"
                        />
                      </div>
                     </>) : (<></>)}
                    

                      <button
                        type="submit"
                        onClick={this.clickSubmit}
                        className="btn btn-raised btn-primary"
                      >
                        Aceptar
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
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  id="btnD"
                  type="button"
                  class="btn btn-raised btn-warning"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminSingleGroup;
