import { combineReducers } from "redux";

import SettingsReducer from "./settingsReducers.js";
import ReportsReducer from "./reportsReducers";

const appReducer = combineReducers({
  SettingsReducer,
  ReportsReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
