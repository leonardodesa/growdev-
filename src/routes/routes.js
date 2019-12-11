
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Mural from '../pages/Mural';

export default function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={ Login } />
            <Route path="/mural" component={ Mural } />
        </BrowserRouter>   
    );
}

