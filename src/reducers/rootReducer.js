import { combineReducers } from "redux";
import movie from "../ducks/movie";
import auth from "../ducks/auth";

export default combineReducers({ auth, movie });
