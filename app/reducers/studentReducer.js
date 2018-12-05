import axios from 'axios'

// actions
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'

// action creators
export const getAllStudents = students => ({type: GET_ALL_STUDENTS, students})

// thunks
export const fetchStudents = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/students')
    dispatch(getAllStudents(data))
  }
}

// reducer
const studentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return action.students
    default:
      return state
  }
}

export default studentReducer
