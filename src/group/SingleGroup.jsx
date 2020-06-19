import React, { Component } from "react";
import NavBar from "../core/NavBar";
import "../App.css";
import $ from "jquery";
import SideBar from "../core/SideBar";
import Hammer from "hammerjs";
import { getGroup, newUser, deleteUser } from "./apiGroup";
import { isAuthenticated } from "../auth";
import "./Test.css";
import logo from "../logo.svg";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import es from "timeago.js/lib/lang/es";
import { Link, Redirect } from "react-router-dom";
import SearchUser from "../User/SearchUser";
import Swal from "sweetalert2";
import PublicationsTabs from "./PublicationsTabs";
import PublicationsAdminTabs from "./PublicationsAdminTabs";

class SingleGroup extends Component {
    constructor() {
        super();
        this.state = {
            group: { users: [], publications: [], teacher: {} },
            error: "",
            loading: false,
            redirect: false,
        };
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
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
        timeago.register("es", es);
    };

    init = async (groupId) => {
        console.log(groupId);

        try {
            const result = await getGroup(isAuthenticated().token, groupId);

            if (result.error || !result) {
                this.setState({ loading: false });
                console.log(result.error);
            } else {
                this.setState({ group: result });
                this.setState({ loading: false });
            }
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
    };

    removeUser = async (userId) => {
        console.log(userId);
        const { group } = this.state;
        const token = isAuthenticated().token;
        const groupId = this.state.group._id;
        const teacherId = isAuthenticated().user._id;
        let { users } = group;

        Swal.fire({
            title: "Esta seguro?",
            text: "Se eliminara el usuario del grupo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0f0",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, adelante!",
        }).then(async (result) => {
            if (result.value) {
                //continuar

                try {
                    const result = await deleteUser(token, userId, groupId, teacherId);
                    await console.log("Result:",result);
                    if (result.error || !result) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar el usuario',
                          })
                        console.log("Result: " + result);
                    } else {
                        Swal.fire({
                            type: "success",
                            title: "Se elimino el usuario",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.setState({ group: result.result });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'No se pudo eliminar el usuario',
                      })
                }
            } else {
                //calcel
            }
        });

        //this.setState({group});
    };
    updateGroup = (group) => {
        console.log("updateGroup:",group);
        this.setState({ group: group.result });
    };

    render() {
        const { group, error, loading } = this.state;
        const { users } = group;

        const styles = {
            imgGroup: {
                width: "100px",
            },
            separator: {
                border: "1px solid black",
            },
            cardTitle: {
                display: "flex",
                alignItems: "center",
            },
            cardBody: {
                maxHeight: "400px",
                overflow: "auto",
            },
            imgGroup: {
                width: "100px",
            },
        };

        console.log("Grupo: ", group);

        return (
            <>
                <div className="wrapper active">
                    <NavBar />

                    <div className="main_body">
                        <SideBar />

                        <div className="container" id="contenedor">
                            {loading ? (
                                <>
                                    <div className="row">
                                        <div className="col-md-12" style={{ color: "black" }}>
                                            <div className="lds-ellipsis">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                    <>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <img
                                                    style={styles.imgGroup}
                                                    src={`${process.env.REACT_APP_API_URL}/group/photo/${group._id}`}
                                                    onError={(i) => (i.target.src = `${logo}`)}
                                                    alt="logo"
                                                />
                                                <hr />
                                                <small>
                                                    Creado: <TimeAgo datetime={group.created} locale="es" />
                                                </small>
                                                <hr />

                                                {
                                                    <small
                                                        style={{ color: "black", cursor: "pointer" }}
                                                        data-toggle="modal"
                                                        data-target="#exampleModal2"
                                                    >
                                                        {group.users.length} Usuarios
                        </small>
                                                }
                                                <hr />
                                            </div>
                                            <div className="col-md-8">
                                                <h5>{group.name}</h5>
                                                <hr />
                                                <p>{group.description}</p>
                                                <hr />
                                                <small>
                                                    Docente: {group.teacher.name}, Carrera:{" "}
                                                    {(" ", group.career)}
                                                </small>
                                            </div>

                                            {isAuthenticated().user._id === group.teacher._id ? (
                                                <>
                                                    <div className="col-md-2">
                                                        <Link to={`/Grupo/editar/${group._id}`} className="btn btn-block btn-raised btn-success">
                                                            Editar
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary"
                                                            data-toggle="modal"
                                                            data-target="#exampleModalCenter"
                                                        >
                                                            <i class="fa fa-user-plus" aria-hidden="true"></i>
                                                        </button>
                                                        <Link
                                                            to={`/Grupo/Administrador/${group._id}`}
                                                            className="btn btn-success"
                                                        >
                                                            Administrar
                                                        </Link>
                                                    </div>
                                                </>
                                            ) : (
                                                    <></>
                                                )}
                                        </div>
                                        <div className="row">
                                            {group.publications.length === 0 ? (<>
                                                <h2>No se han creado publicaciones</h2>
                                            </>) : (<>
                                                {isAuthenticated().user.role === 'admin' || isAuthenticated().user.role === 'teacher' ? (<>
                                                    <PublicationsAdminTabs publications={group.publications} />
                                                    
                                                </>) : (<>
                                                    <PublicationsTabs publications={group.publications} />
                                                </>) }
                                                
                                            </>)}
                                        </div>

                                        <div
                                            class="modal fade"
                                            id="exampleModalCenter"
                                            tabindex="-1"
                                            role="dialog"
                                            aria-labelledby="exampleModalCenterTitle"
                                            aria-hidden="true"
                                        >
                                            <div
                                                class="modal-dialog modal-dialog-centered"
                                                role="document"
                                            >
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLongTitle">
                                                            Agregar usuarios
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
                                                        <SearchUser
                                                            group={group}
                                                            updateGroup={this.updateGroup}
                                                        />
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button
                                                            type="button"
                                                            class="btn btn-raised btn-warning"
                                                            data-dismiss="modal"
                                                        >
                                                            Cerrar
                          </button>
                                                        <button
                                                            type="button"
                                                            class="btn btn-raised btn-primary"
                                                        >
                                                            Agregar
                          </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            //Modal usuarios del grupo
                                        }

                                        <div
                                            class="modal fade"
                                            id="exampleModal2"
                                            tabindex="-1"
                                            role="dialog"
                                            aria-labelledby="exampleModal2"
                                            aria-hidden="true"
                                        >
                                            <div
                                                class="modal-dialog modal-dialog-centered"
                                                role="document"
                                            >
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLongTitle">
                                                            Usuarios del grupo
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
                                                        <div
                                                            className="row"
                                                            style={{ height: "400px", maxHeight: "400px", overflow:"auto" }}
                                                        >
                                                            <div className="col-md-2"></div>
                                                            <div className="col-md-8">
                                                                {users.map((user, i) => {
                                                                    return (
                                                                        <>
                                                                            <hr style={styles.separator} />

                                                                            <div className="row">
                                                                                <div className="col-md-2">
                                                                                    <img
                                                                                        style={styles.imgGroup}
                                                                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                                                                                        onError={(i) =>
                                                                                            (i.target.src = `${logo}`)
                                                                                        }
                                                                                        alt="logo"
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-10">
                                                                                    <h6>{user.name}</h6>
                                                                                    <hr />
                                                                                    <p>{user.noControl}</p>
                                                                                    <small>{user.email}</small>
                                                                                    {isAuthenticated().user._id ===
                                                                                        group.teacher._id ? (
                                                                                            <>
                                                                                                <button
                                                                                                    className="btn btn-danger"
                                                                                                    onClick={() =>
                                                                                                        this.removeUser(user._id)
                                                                                                    }
                                                                                                >
                                                                                                    <i
                                                                                                        class="fa fa-trash"
                                                                                                        aria-hidden="true"
                                                                                                    ></i>
                                                                                                </button>
                                                                                            </>
                                                                                        ) : (
                                                                                            <></>
                                                                                        )}
                                                                                </div>
                                                                            </div>

                                                                            <hr style={styles.separator} />
                                                                        </>
                                                                    );
                                                                })}
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
                                )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SingleGroup;
