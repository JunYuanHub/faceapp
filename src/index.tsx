import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Login from "./login";
import { Provider } from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import App from "./App";
import PageFrame from "./components/pageFrame";
import Register from "./register";
import Check from "./check";
import {Reducer} from "./redux/reducer";



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducer,composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    (<Provider store={store}>
        <PageFrame>
            <BrowserRouter>
                <Switch>
                    <Route path={'/'} exact component={App}/>
                    <Route path={'/login'} exact component={Login}/>
                    <Route path={'/register'} exact component={Register}/>
                    <Route path={'/check'} exact component={Check}/>
                    <Route path={'/center'} exact component={Register}/>
                    <Route path={'/backend'} exact component={Register}/>
                </Switch>
            </BrowserRouter>
        </PageFrame>
    </Provider>
    )
    , document.getElementById('root'));