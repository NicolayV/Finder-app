import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieDBReducer from "./movieDBReducer";

export default combineReducers({
  auth: authReducer,
  movieDB: movieDBReducer,
});
