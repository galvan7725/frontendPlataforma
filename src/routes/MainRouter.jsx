import React from 'react';
import {Route , Switch} from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';
import PrivateRoute from '../auth/PrivateRoute';
import Principal from '../views/Principal';


const MainRouter = () => (
 

    <div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Acceso" component={SignIn}></Route>
            <Route exact path="/Registro" component={SignUp}></Route>
            <PrivateRoute exact path="/Principal" component={Principal}></PrivateRoute>
            
            {/* Ruta por defecto (Error 404) */}
            <Route component={NotFound}/>
        </Switch>
    </div>
);

export default MainRouter;