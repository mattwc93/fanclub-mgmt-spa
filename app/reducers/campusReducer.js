import axios from 'axios'

// actions
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES'
const GET_NEW_CAMPUS = 'GET_NEW_CAMPUS'
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'
const GET_CAMPUS = 'GET_CAMPUS'

// action creators
export const getAllCampuses = campuses => ({ type: GET_ALL_CAMPUSES, campuses })
export const getNewCampus = campus => ({ type: GET_NEW_CAMPUS, campus })
export const removeCampus = campusId => ({ type: REMOVE_CAMPUS, campusId })
export const getCampus = campus => ({ type: GET_CAMPUS, campus })

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

export const selectCampus = (campusId) => async (dispatch) => {
  const { data: campus } = await axios.get(`/api/campuses/${campusId}`)
  dispatch(getCampus(campus))
}

const initialState = {
  campusList: [],
  selectedCampus: {}
}

const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CAMPUSES:
      return { ...state, campusList: action.campuses }
    case GET_NEW_CAMPUS:
      return { ...state, campusList: [...state, action.campus] }
    case REMOVE_CAMPUS:
      const newCampuses = state.campusList.filter(campus => campus.id !== action.campusId)
      if(state.selectedCampus.id === action.campusId) {
        return {...state, selectedCampus: {}, campusList: newCampuses}
      }
      else return { ...state, campusList: newCampuses }
    case GET_CAMPUS:
      const currentCampus = action.campus ? action.campus : {}
      return { ...state, selectedCampus: currentCampus }
    default:
      return state
  }
}

export default campusReducer
