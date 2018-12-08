import React from 'react'
import { Link } from 'react-router-dom';

const StudentCard = props => {
  const { student } = props
  return (
    <Link to={`/students/${student.id}`} className='fullCardLink' >
      <div className="cardContainer" >
        <img src={student.imgUrl} className="cardImg" />
        <span className='cardLink' >{student.firstName} {student.lastName}</span>
        {
          student.campus && <span className='cardLink' >{student.campus.name}</span>
        }
      </div >
    </Link>
  )
}

export default StudentCard