import React, { Component } from 'react'
import { connect } from 'react-redux'
import Campus from './Campus'
import StudentCard from './StudentCard'
import { selectCampus, deleteCampus } from '../reducers/campusReducer'

class SingleCampusView extends Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      redirecting: false
    }
    this.redirectToEditPage = this.redirectToEditPage.bind(this)
    this.submitRemove = this.submitRemove.bind(this)
  }

  redirectToEditPage() {
    this.props.history.push(`/campuses/update/${this.props.campus.id}`)
  }

  async submitRemove() {
    await this.props.removeCampus(this.props.campus.id)
    this.setState({
      redirecting: true
    })
    setTimeout(() => { this.props.history.push(`/campuses`) }, 1500)
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
    if (this.state.redirecting) {
      return (
        <div className='redirect column'>
          <h1>Fanclub Removed.</h1>
          <h1>Returning to Fanclub List...</h1>
        </div>
      )
    } else if (this.state.loading) {
      return <div className='redirect column'>
      <h1>LOADING FANCLUBS...</h1>
      </div>
    } else if (!campus.id) {
      return <div className='redirect column'>
      <h1>No Fanclub with that ID found!</h1>
      </div>
    } else {
      return (
        <div>
          <div className='listHeader'>
            <h1>{campus.name}:</h1>
            <div className='columnRight'>
              <button type='submit' className='add_btn editRmv_btn' onClick={this.redirectToEditPage}>EDIT</button>
              <button type='submit' className='add_btn editRmv_btn' onClick={this.submitRemove}>Remove</button>
            </div>
          </div>
          <Campus campus={campus} submitRemove={this.submitRemove} />
          <div className='rowCentered' >
            <h1>MEMBERS IN {campus.name.toUpperCase()}:</h1>
          </div>
          <div className='studentList row wrap' >
            {
              campus.students && campus.students.length
                ? campus.students.map(student => <StudentCard key={student.id} student={student} campusView={true} />)
                : <h2>This club has no members!</h2>
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
  selectCampus: (id) => dispatch(selectCampus(id)),
  removeCampus: (id) => dispatch(deleteCampus(id))
})

export default connect(mapState, mapDispatch)(SingleCampusView)
