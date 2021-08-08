import { combineReducers } from "redux";
import appDB from "./actions/actionCreator";
import movie from "../ducks/movie";
import auth from "../ducks/auth";

export default combineReducers({ appDB, auth, movie });
