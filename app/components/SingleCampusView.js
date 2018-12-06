import React, { Component } from 'react'
import { connect } from 'react-redux'
import Campus from './Campus'
import Student from './Student'
import { selectCampus } from '../reducers/campusReducer'

class SingleCampusView extends Component {
  componentDidMount() {
    const campusId = Number(this.props.match.params.campusId)
    this.props.selectCampus(campusId)
  }
  render() {
    const { campus } = this.props
    if (!campus.id) {
      return <div>No Campus with that ID found!</div>
    } else {
      return (
        <div className='container'>
          <h1>Currently Viewed Campus:</h1>
          <Campus campus={campus} />
          <h1>LIST OF STUDENTS:</h1>
          <div className='studentList' >
            {
              campus.students && campus.students.length
                ? campus.students.map(student => <Student key={student.id} student={student} campusView={true}/>)
                : <p>No Students currently attending.</p>
            }
          </div>
        </div>
      )
    }
  }
}

const mapState = state => ({
  campus: state.campuses.selectedCampus
})

const mapDispatch = dispatch => ({
  selectCampus: (id) => dispatch(selectCampus(id))
})

export default connect(mapState, mapDispatch)(SingleCampusView)
