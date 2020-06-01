import React from 'react';
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

            {/* Ruta por defecto (Error 404) */}
            <Route component={NotFound}/>
        </Switch>
    </div>
);

export default MainRouter;