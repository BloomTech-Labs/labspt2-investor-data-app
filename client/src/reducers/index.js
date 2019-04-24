import { combineReducers } from "redux";

import SettingsReducer from "./settingsReducers.js";
import ReportsReducer from "./reportsReducers";

export default combineReducers({
  SettingsReducer,
  ReportsReducer
});
