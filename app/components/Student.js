import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
// import { deleteStudent } from '../reducers/studentReducer'



const Student = props => {
  const { student, submitRemove } = props
  return (
    <div className="studentContainer" >
      <img src={student.imgUrl} className="smallImg" />
      <h4>Name: <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></h4>
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
      {
        student.campus && <p>School: <Link to={`/campuses/${student.campus.id}`} >{student.campus.name}</Link></p>
      }
      {
        !props.campusView && <button type='button' onClick={submitRemove}>Remove Student</button>
      }
    </div >
  )
}

export default Student