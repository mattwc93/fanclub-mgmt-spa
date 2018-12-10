import React, { Component } from 'react'
import { connect } from 'react-redux'
import Campus from './Campus'
import StudentCard from './StudentCard'
import { selectCampus, deleteCampus } from '../reducers/campusReducer'
import { selectStudent } from '../reducers/studentReducer'
import { withRouter, Link } from 'react-router-dom'

class SingleCampusView extends Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      redirecting: false,
    }
    this.redirectToEditPage = this.redirectToEditPage.bind(this)
    this.submitRemove = this.submitRemove.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
  }

  async handleCardClick (studentId) {
    await this.props.selectStudent(Number(studentId))
    window.scrollTo(0, 0)
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
    if (this.props.singleView) {
      await this.props.selectCampus(this.props.singleCampus.id)
    }
    else {
      const campusId = Number(this.props.match.params.campusId)
      if (isNaN(campusId)) {
        this.props.history.push('/notFound')
      } else {
        await this.props.selectCampus(campusId)
      }
    }
    this.setState({
      loading: false
    })
    window.scrollTo(0, 0)
  }

  render() {
    const { campus } = this.props
    if (this.state.redirecting) {
      return (
        <div className='redirect column'>
          <h1>Fanclub Disbanded.</h1>
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
            <Link to={`/campuses/${campus.id}`} className='headerLink'><h1 className='nameLink'>{`${campus.name}:`}</h1></Link>
            {
              !this.props.singleView &&
              <div className='columnRight'>
                <button type='submit' className='add_btn editRmv_btn' onClick={this.redirectToEditPage}>EDIT</button>
                <button type='submit' className='add_btn editRmv_btn' onClick={this.submitRemove}>DISBAND CLUB</button>
              </div>
            }
          </div>
          <Campus campus={campus} submitRemove={this.submitRemove} />
          <div className='rowCentered' >
            <h1>MEMBERS IN {campus.name.toUpperCase()}:</h1>
          </div>
          <div className='studentList row wrap' >
            {
              campus.students && campus.students.length
                ? campus.students.map(student => <StudentCard key={student.id} student={student} campusView={true} cardClick={this.handleCardClick} />)
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
  removeCampus: (id) => dispatch(deleteCampus(id)),
  selectStudent: (id) => dispatch(selectStudent(id))
})

export default withRouter(connect(mapState, mapDispatch)(SingleCampusView))
