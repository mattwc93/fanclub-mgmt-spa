// modules
import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom';
// components:
import CampusList from './CampusList'
import StudentList from './StudentList'
import SingleCampusView from './SingleCampusView'
import SingleStudentView from './SingleStudentView'
import NewCampusForm from './NewCampusForm'
import NewStudentForm from './NewStudentForm'
import NotFoundPage from './NotFoundPage'
import LandingPage from './LandingPage';
// redux thunks:


class Root extends Component{
  render(){
    return (
      <div>
        <nav>
          <NavLink to='/' className='navLink'>HOME</NavLink>
          <NavLink to='/campuses' className='navLink'>SEE ALL CAMPUSES</NavLink>
          <NavLink to='/students' className='navLink'>SEE ALL STUDENTS</NavLink>
        </nav>
        <main>
          <Switch>
            <Route exact path="/campuses" component={CampusList} />
            <Route exact path="/campuses/add" component={NewCampusForm} />
            <Route exact path="/students" component={StudentList} />
            <Route exact path="/students/add" component={NewStudentForm} />
            <Route exact path="/students/update/:studentId" component={NewStudentForm} />
            <Route exact path="/campuses/update/:campusId" component={NewCampusForm} />
            <Route path="/campuses/:campusId" component={SingleCampusView} />
            <Route path="/students/:studentId" component={SingleStudentView} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/" component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default Root
