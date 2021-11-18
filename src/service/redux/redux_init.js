import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import auth_reducer from './auth_reducer.js'
import jobdata_reducer from './job_reducer.js';
//import settings_reducer from './settings_reducer.js';


const rootReducer = combineReducers({
    auth : auth_reducer,
    jobs : jobdata_reducer,
    //settings: settings_reducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store