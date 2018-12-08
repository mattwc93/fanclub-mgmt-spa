// modules
import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
// components:
import CampusList from './CampusList'
import StudentList from './StudentList'
import SingleCampusView from './SingleCampusView'
import SingleStudentView from './SingleStudentView'
import CampusFormWrapper from './CampusFormWrapper'
import StudentFormWrapper from './StudentFormWrapper'
import NotFoundPage from './NotFoundPage'
import LandingPage from './LandingPage';
// redux thunks:


class Root extends Component{
  render(){
    return (
      <div>
        <nav>
          <Link to='/' className='navLink'>HOME</Link>
          <Link to='/campuses' className='navLink'>CAMPUSES</Link>
          <Link to='/students' className='navLink'>STUDENTS</Link>
        </nav>
        <main>
          <Switch>
            <Route exact path="/campuses" component={CampusList} />
            <Route exact path="/campuses/add" component={CampusFormWrapper} />
            <Route exact path="/students" component={StudentList} />
            <Route exact path="/students/add" component={StudentFormWrapper} />
            <Route exact path="/students/update/:studentId" component={StudentFormWrapper} />
            <Route exact path="/campuses/update/:campusId" component={CampusFormWrapper} />
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
