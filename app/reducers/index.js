// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!
import studentReducer from './studentReducer'
import campusReducer from './campusReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer
})

export default rootReducer
