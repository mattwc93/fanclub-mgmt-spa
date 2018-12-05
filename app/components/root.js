import React from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import CampusList from './CampusList'
import StudentList from './StudentList'

const Root = () => {
  return (
    <div>
      <nav>
        <NavLink to='/campuses'>SEE ALL CAMPUSES</NavLink>
        <NavLink to='/students'>SEE ALL STUDENTS</NavLink>
      </nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        <Switch>
          <Route path="/campuses" component={CampusList} />
          <Route path="/students" component={StudentList} />
        </Switch>
      </main>
    </div>
  )
}

export default Root
