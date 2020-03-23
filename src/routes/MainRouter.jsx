import React from 'react';
import {Route , Switch} from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';


const MainRouter = () => (
 

    <div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Acceso" component={SignIn}></Route>
            <Route exact path="/Registro" component={SignUp}></Route>
            {/* Ruta por defecto (Error 404) */}
            <Route component={NotFound}/>
        </Switch>
    </div>
);

export default MainRouter;