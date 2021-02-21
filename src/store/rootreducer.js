import { combineReducers } from "redux";
import Reducer from "./reducer";


const RootReducer = combineReducers({ reducer1: Reducer })


export default RootReducer