import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Student(props) {
  const student = props.student
  if (!student) {
    return <div>Student Not Found!</div>
  } else {
    return (
      <div className='listContainer' >
        <img src={student.imageUrl} className="smallImg" />
        <div>
          <h4>Name: <NavLink to={`/students/${student.id}`}>{student.firstName} {student.lastName}</NavLink></h4>
          <p>Email: {student.email}</p>
          <p>GPA: {student.gpa}</p>
          {
            student.campus && <p>School: {student.campus.name}</p>
          }
        </div>
        <hr />
      </div >
    )
  }
}
