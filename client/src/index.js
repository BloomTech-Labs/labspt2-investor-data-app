import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers/index";
import { ToastProvider } from "react-toast-notifications";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
require("dotenv").config("/.env");

// Create Material UI theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#EFEFEF"
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#E1E1E1",
      main: "#7407a7",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#FFFF"
    }
    // error: will use the default color
  }
});

// Middleware for error logging and dispatching
/* const middleware = applyMiddleware(logger, thunk); */
const middleware = [thunk, logger];
const initialState = {};
// Create Redux store
/* const store = createStore(rootReducer, middleware); */
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // *******Commented out to address deployment error*******
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
