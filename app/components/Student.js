import React from 'react'
import { Link } from 'react-router-dom';

const Student = props => {
  const { student, submitRemove } = props
  return (
    <div className="studentContainer" >
      <img src={student.imgUrl} className="cardImg" />
      <h4>Name: <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></h4>
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
      {
        student.campus && <p>School: <Link to={`/campuses/${student.campus.id}`} >{student.campus.name}</Link></p>
      }
      {
        !props.campusView && <button type='button' className='add_btn' onClick={submitRemove}>Remove Student</button>
      }
    </div >
  )
}

export default Student