import { createStore , applyMiddleware } from "redux";  
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reduxLogger from "redux-logger"

import reducer from './reducer'

//根据环境不同选择不同中间件

let middleware = [reduxThunk,reduxPromise]
let env = process.env.NODE_ENV;
if(env==="development"){
    middleware.push(reduxLogger)
}

//创建store容器
const store =createStore(
    reducer,
    applyMiddleware(...middleware)
    )

    export default store