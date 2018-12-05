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

const campusReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CAMPUSES:
      return action.campuses
    default:
      return state
  }
}

export default campusReducer
