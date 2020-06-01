import React, { Component } from "react";
import NavBar from "../core/NavBar";
import "../App.css";
import $ from "jquery";
import SideBar from "../core/SideBar";
import Hammer from "hammerjs";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import FileViewer from "react-file-viewer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import logo from "../logo.svg";
import logoPDF from "../images/pdf.png";
import logoWord from "../images/doc.png";

class AdminSingleGroup extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      error: "",
      files: [],
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
    await this.init(groupId);
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });

    if (name === "file") {
      this.loadFile(event);
    } else {
      const value = event.target.value;
      this.setState({ [name]: value });
      this.publicationData.set(name, value);
      //aux = event.target.files;
    }
    console.log("Form", this.publicationData);
  };

  init = async (groupId) => {};

  clickSubmit = async (event) => {};

  loadFile = (event) => {
    let aux = [];

    console.log(event.target.files.length);
    for (let index = 0; index < event.target.files.length; index++) {
      aux.push(event.target.files[index]);
    }
    this.setState({ files: aux });
    this.publicationData.set("files", aux);

    for (let index = 0; index < event.target.files.length; index++) {
      this.readImage(event, index);
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
    const { redirect, files, error } = this.state;

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
                <h5>Administrar grupo x</h5>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <button
                    className="btn btn-success btn-outline"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Nueva Publicacion
                  </button>
                </div>
                <div className="col-md-8">tab2</div>
                <div className="col-md-2">tab3</div>
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
          tabindex="-1"
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
                    <form encType="multipart/form-data">
                      <input
                        name="files"
                        id="files"
                        className="inputfile"
                        type="file"
                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                        onChange={this.handleChange("file")}
                        multiple
                        webkitdirectory
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

                      <div className="form-group" style={styles.input_group}>
                        <label htmlFor="userName">Nombre del grupo:</label>
                        <input
                          type="text"
                          onChange={this.handleChange("name")}
                          className="form-control"
                          id="groupName"
                          placeholder="Nombre"
                        />
                      </div>
                      <div
                        className="form-group text-center"
                        style={styles.input_group}
                      >
                        <label htmlFor="groupDescription">Descripcion:</label>
                        <input
                          type="text"
                          onChange={this.handleChange("description")}
                          className="form-control"
                          id="groupDescription"
                          placeholder="Ingresa una descripcion"
                        />
                      </div>
                      <div
                        className="form-group text-center"
                        style={styles.input_group}
                      >
                        <label htmlFor="carrer">Carrera:</label>
                        <select
                          className="form-control"
                          id="carrer"
                          onChange={this.handleChange("carrer")}
                        >
                          <option select="true">ISC</option>
                          <option>TICS</option>
                          <option>II</option>
                          <option>IIA</option>
                          <option>IGE</option>
                          <option>GASTRONOMIA</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        onClick={this.clickSubmit}
                        className="btn btn-raised btn-primary"
                      >
                        Aceptar
                      </button>
                      <Link
                        to={`/Grupos/${isAuthenticated().user._id}`}
                        className="btn btn-raised btn-danger ml-2"
                      >
                        Cancelar
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
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
