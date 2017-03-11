import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import { Router, Route, Switch, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/98891
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//render(
//        <ReactRouter.Router>
//            <ReactRouter.Route path="/" component={Main}>
        
//            </ReactRouter.Route>
//        </ReactRouter.Router>,
//        document.getElementById('app')
//    );
render(
        <Router history={browserHistory} >
            <Route path="/" component={Main}>
        
            </Route>
        </Router>,
        document.getElementById('app')
    );
    //render(<Main />, document.getElementById('app'));
