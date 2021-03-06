import React from 'react'
import { withRouter, Link } from 'react-router-dom';

const StudentCard = props => {
  const { student, campusView, cardClick, campus } = props
  let rank = 'MEMBER'
  if (campus && (student.id === campus.FounderId)) {
    rank = 'FOUNDER'
  }
  return (
    <Link to={`/students/${student.id}`} className='fullCardLink' >
      <div className="cardContainer" onClick={() => { cardClick(student.id) }}>
        <img src={student.imgUrl} className="cardImg" />
        <div className='column cardColumn' >
          <span className='cardLink' >{student.firstName} {student.lastName}</span>
          {
            student.campus
              ? <span className='cardLink' >{student.campus.name}</span>
              : campusView
                ? <span className='cardLink'>{rank}</span>
                : <span className='cardLink' >{`--------`}</span>
          }
          <span className='cardLink' >{student.gpa}</span>
        </div>
      </div >
    </Link>
  )
}

export default withRouter(StudentCard)