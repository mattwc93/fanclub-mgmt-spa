import axios from 'axios'

// actions
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'
const GET_NEW_STUDENT = 'GET_NEW_STUDENT'
const REMOVE_STUDENT = 'REMOVE_STUDENT'
const GET_STUDENT = 'GET_STUDENT'

// action creators
export const getAllStudents = students => ({ type: GET_ALL_STUDENTS, students })
export const getNewStudent = student => ({ type: GET_NEW_STUDENT, student })
export const removeStudent = studentId => ({ type: REMOVE_STUDENT, studentId })
export const getStudent = student => ({ type: GET_STUDENT, student })

// thunks
export const fetchStudents = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/students')
    dispatch(getAllStudents(data))
  }
}

export const postStudent = (student) => async (dispatch) => {
  const { data: newStudent } = await axios.post(`/api/students`, student)
  dispatch(getNewStudent(newStudent))
}

export const deleteStudent = (studentId) => async (dispatch) => {
  await axios.delete(`/api/students/${studentId}`)
  dispatch(removeStudent(studentId))
}

export const selectStudent = (studentId) => async (dispatch) => {
  const { data: student } = await axios.get(`/api/students/${studentId}`)
  dispatch(getStudent(student))
}

// reducer
const initialState = {
  studentList: [],
  selectedStudent: {}
}

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return { ...state, studentList: action.students }
    case GET_NEW_STUDENT:
      return { ...state, studentList: [...state.studentList, action.student] }
    case REMOVE_STUDENT:
      const newStudents = state.studentList.filter(student => student.id !== action.studentId)
      if (state.selectedStudent.id === action.studentId) {
        return { ...state, selectedStudent: {}, studentList: newStudents }
      }
      else return { ...state, studentList: newStudents }
    case GET_STUDENT:
      const currentStudent = action.student ? action.student : {}
      return { ...state, selectedStudent: currentStudent }
    default:
      return state
  }
}

export default studentReducer
