// import {createStore} from "react-redux"

import {legacy_createStore as createStore} from "redux"
import reducer from "./reducer/index.js"

const store = createStore(reducer)

export default store
