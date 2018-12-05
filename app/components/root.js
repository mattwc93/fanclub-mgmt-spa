import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import CampusList from './CampusList'
import StudentList from './StudentList'
import SingleCampusView from './SingleCampusView'
import SingleStudentView from './SingleStudentView'
import { fetchStudents } from '../reducers/studentReducer'
import { fetchCampuses } from '../reducers/campusReducer'


class Root extends Component{
  componentDidMount() {
    this.props.fetchCampuses()
    this.props.fetchStudents()
  }

  render(){
    return (
      <div>
        <nav>
          <NavLink to='/campuses'>SEE ALL CAMPUSES</NavLink>
          <NavLink to='/students'>SEE ALL STUDENTS</NavLink>
        </nav>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <Switch>
            <Route exact path="/campuses" component={CampusList} />
            <Route exact path="/students" component={StudentList} />
            <Route path="/campuses/:campusId" component={SingleCampusView} />
            <Route path="/students/:studentId" component={SingleStudentView} />
          </Switch>
        </main>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents()),
  fetchCampuses: () => dispatch(fetchCampuses())
})

export default withRouter(connect(null, mapDispatch)(Root))
