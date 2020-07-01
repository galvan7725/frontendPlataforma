import React from 'react';
import SideBar from '../core/SideBar';
import NavBar from '../core/NavBar';
import Wrapper from '../core/Wrapper';
import Body from '../core/Body';
import Container from '../core/Container';
import '../App.css';
import {Route , Switch} from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';
import PrivateRoute from '../auth/PrivateRoute';
import Principal from '../views/Principal';
import Profile from '../User/Profile';
import EditProfile from '../User/EditProfile';
import GropusByUser from '../group/GropusByUser';
import NewGroup from '../group/NewGroup';
import SingleGroup from '../group/SingleGroup';
import SearchUser from '../User/SearchUser';
import AdminSingleGroup from '../group/AdminSingleGroup';
import EditGroup from '../group/EditGroup';
import SinglePublication from '../publication/SinglePublication';


const MainRouter = () => (
    <div>
        
    <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Acceso" component={SignIn}></Route>
            <Route exact path="/Registro" component={SignUp}></Route>
            <PrivateRoute exact path="/Principal" component={Principal}></PrivateRoute>
            <PrivateRoute exact path="/User/:userId" component={Profile} ></PrivateRoute>
            <PrivateRoute exact path="/User/edit/:userId" component={EditProfile} ></PrivateRoute>
            <PrivateRoute exact path="/Grupos/:userId" component={GropusByUser} ></PrivateRoute>
            <PrivateRoute exact path="/Grupo/nuevo" component={NewGroup} ></PrivateRoute>
            <PrivateRoute exact path="/Grupo/:groupId" component={SingleGroup} ></PrivateRoute>
            <PrivateRoute exact path="/Usuario/buscar" component={SearchUser} ></PrivateRoute>
            <PrivateRoute exact path="/Grupo/Administrador/:groupId" component={AdminSingleGroup}></PrivateRoute>
            <PrivateRoute exact path="/Grupo/editar/:groupId" component={EditGroup}></PrivateRoute>
            <PrivateRoute exact path="/Grupo/publicaciones/publicacion/" component={SinglePublication}></PrivateRoute>

            {/* Ruta por defecto (Error 404) */}
            <Route component={NotFound}/>
        </Switch>
    </div>
);

export default MainRouter;