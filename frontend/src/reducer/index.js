import { combineReducers } from "redux";
import selectedOption from "./selectedOption";
import admin from "./admin";
import validator from "./validator";
import analysisData from "./analysisData";
import emptyIt from "./emptyIt";
const reducer= combineReducers({selectedOption,emptyIt, admin, validator,analysisData})

export default reducer

