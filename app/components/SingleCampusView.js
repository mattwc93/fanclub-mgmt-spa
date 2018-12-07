import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Campus from './Campus'
import Student from './Student'
import { selectCampus } from '../reducers/campusReducer'

class SingleCampusView extends Component {

  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    const campusId = Number(this.props.match.params.campusId)
    if (isNaN(campusId)) {
      this.props.history.push('/notFound')
    } else {
      await this.props.selectCampus(campusId)
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { campus } = this.props
    if (this.state.loading) {
      return <h1>LOADING CAMPUS...</h1>
    } else if (!campus.id) {
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
                ? campus.students.map(student => <Student key={student.id} student={student} campusView={true} />)
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

export default withRouter(connect(mapState, mapDispatch)(SingleCampusView))
