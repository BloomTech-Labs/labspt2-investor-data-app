import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers/index';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Create Material UI theme
const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: 'rgb(146, 28, 36, 0.96)',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#f9f9f9',
            main: '#e2e2e2',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#c1c1c1',
        },
        // error: will use the default color
    },
});

// Middleware for error logging and dispatching
const middleware = applyMiddleware(logger, thunk);

// Create Redux store
const store = createStore(rootReducer, middleware);

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </MuiThemeProvider>,
document.getElementById('root'));

