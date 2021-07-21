import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieDBReducer from "./movieDBReducer";
import appDB from "../duck/appDB";

export default combineReducers({
  auth: authReducer,
  movieDB: movieDBReducer,
  appDB,
});
