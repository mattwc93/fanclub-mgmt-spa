import React from 'react'

const Student = props => {
  const { student } = props
  return (
    <div className="campusContainer" >
      <img src={student.imgUrl} className="smallImg" />
      <div className='column singleView bigText' >
        <h1 className='blackBlock'>{student.firstName} {student.lastName} </h1>
        <h2 className='blackBlock'>{student.email}</h2>
        <h1 className='blackBlock'>MEMBER RATING: {student.gpa}</h1>
      </div>
    </div >
  )
}

export default Student