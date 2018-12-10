import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StudentCard from './StudentCard'
import { fetchStudents } from '../reducers/studentReducer'
import StudentFilterForm from './StudentFilterForm'
import StudentSortSelector from './StudentSortSelector'


class StudentList extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      firstNameFilter: '',
      lastNameFilter: '',
      ratingFilterMin: 0,
      ratingFilterMax: 10,
      clubNameFilter: '',
      sortBy: '',
      reverseSort: false,
      filterByFirstName: false,
      filterByLastName: false,
      filterByRating: false,
      filterByClubName: false,
      showFilters: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.filterChange = this.filterChange.bind(this)
    this.sortChange = this.sortChange.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  filterChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sortChange(event) {
    this.setState({
      sortBy: event.target.value
    })
  }

  toggleFilter(event) {
    let currentFilterVal = this.state[event.target.name]
    this.setState({
      [event.target.name]: !currentFilterVal
    })
  }

  async componentDidMount() {
    await this.props.fetchStudents()
    this.setState({
      loading: false
    })
  }

  handleClick() {
    this.props.history.push(`/students/add`)
  }

  render() {
    const filterProps = { ...this.state, filterChange: this.filterChange, toggleFilter: this.toggleFilter, sortChange: this.sortChange }
    let students = [...this.props.students];
    const { filterByRating, filterByFirstName, filterByLastName, filterByClubName, clubNameFilter, firstNameFilter, lastNameFilter, ratingFilterMax, ratingFilterMin, showFilters, loading, sortBy, reverseSort } = this.state

    // check and run our individual filters
    if (showFilters && filterByFirstName) {
      students = students.filter(student => student.firstName.toLowerCase().includes(firstNameFilter.toLowerCase()))
    }
    if (showFilters && filterByLastName) {
      students = students.filter(student => student.lastName.toLowerCase().includes(lastNameFilter.toLowerCase()))
    }
    if (showFilters && filterByRating) {
      students = students.filter(student => (student.gpa >= ratingFilterMin && student.gpa <= ratingFilterMax))
    }
    if (showFilters && filterByClubName) {
      students = students.filter(student => {
        if (student.campus) {
          return student.campus.name.toLowerCase().includes(clubNameFilter.toLowerCase())
        } else {
          return false
        }
      })
    }

    // sort:
    if (!loading && sortBy.length > 0) {
      students.sort((a, b) => {
        let elemA, elemB;
        if (sortBy === 'clubName') {
          elemA = a.campus ? a.campus.name : 'Z'
          elemB = b.campus ? b.campus.name : 'Z'
        } else {
          elemA = a[sortBy]
          elemB = b[sortBy]
        }
        if (typeof elemA === 'string') {
          elemA = elemA.toUpperCase()
          elemB = elemB.toUpperCase()
        }
        if (elemA < elemB) {
          return -1
        }
        if (elemA > elemB) {
          return 1
        }
        return 0
      })
    }
    if (reverseSort) {
      students.reverse()
    }

    if (loading) {
      return <h1>LOADING MEMBERS...</h1>
    } else {
      return (
        <div>
          <div className='listHeader'>
            <h1>ALL MEMBERS:</h1>
            <button type='submit' className='add_btn' onClick={this.handleClick} >ADD A MEMBER</button>
          </div>
          {
            showFilters
              ? (
                <React.Fragment>
                  <div className='filterDiv'>
                    <StudentFilterForm filterProps={filterProps} />
                  </div>
                  <div className='sortDiv'>
                    <StudentSortSelector sortProps={filterProps} />
                  </div>
                </React.Fragment>
              )
              : (
                <div className='filterDiv'>
                  <StudentFilterForm filterProps={filterProps} />
                  <StudentSortSelector sortProps={filterProps} />
                </div>
              )
          }
          <div className='row wrap studentList'>
            {
              students.length
                ? students.map(student => {
                  return (
                    <StudentCard key={student.id} student={student} />
                  )
                })
                : <h1>NO MEMBERS IN DATABASE</h1>
            }
          </div>
          <div className='anchorContainer'>
            <a href='#top' className='topAnchor'>TOP</a>
          </div>
        </div>
      )
    }
  }
}

const mapState = state => ({
  students: state.students.studentList
})

const mapDispatch = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents())
})


export default withRouter(connect(mapState, mapDispatch)(StudentList))

