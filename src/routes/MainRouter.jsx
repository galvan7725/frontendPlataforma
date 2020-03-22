import React from 'react';
import {Route , Switch} from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

const MainRouter = () => (
 

    <div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            {/* Ruta por defecto (Error 404) */}
            <Route component={NotFound}/>
        </Switch>
    </div>
);

export default MainRouter;