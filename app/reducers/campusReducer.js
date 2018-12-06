import axios from 'axios'

// actions
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES'
const GET_NEW_CAMPUS = 'GET_NEW_CAMPUS'
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'

// action creators
export const getAllCampuses = campuses => ({type: GET_ALL_CAMPUSES, campuses})
export const getNewCampus = campus => ({type: GET_NEW_CAMPUS, campus})
export const removeCampus = campusId => ({type: REMOVE_CAMPUS, campusId})

// thunks

export const fetchCampuses = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/campuses')
    dispatch(getAllCampuses(data))
  }
}

export const postCampus = (campus) => async (dispatch) => {
  const { data: newCampus } = await axios.post(`/api/campuses`, campus)
  dispatch(getNewCampus(newCampus))
}

export const deleteCampus = (campusId) => async (dispatch) => {
  await axios.delete(`/api/campuses/${campusId}`)
  dispatch(removeCampus(campusId))
}

const campusReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CAMPUSES:
      return action.campuses
    case GET_NEW_CAMPUS:
      return [ ...state, action.campus]
    case REMOVE_CAMPUS:
      const newCampuses = state.filter(campus => campus.id !== action.campusId)
      return newCampuses
    default:
      return state
  }
}

export default campusReducer
