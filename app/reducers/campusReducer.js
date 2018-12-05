import axios from 'axios'

// actions
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES'

// action creators
export const getAllCampuses = campuses => ({type: GET_ALL_CAMPUSES, campuses})

// thunks

export const fetchCampuses = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/campuses')
    dispatch(getAllCampuses(data))
  }
}

// TODO: do i even need these?
// const GET_CAMPUS = 'GET_CAMPUS'
// export const getCampus = campus => ({type: GET_CAMPUS, campus})
// export const fetchCampus = (id) => async (dispatch) => {
//   const { data: campus} = await axios.get(`/api/campus/${id}`)
//   dispatch(getCampus(campus))
// }

const campusReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CAMPUSES:
      return action.campuses
    default:
      return state
  }
}

export default campusReducer
