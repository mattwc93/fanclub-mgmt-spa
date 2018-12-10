import React from 'react'
import { Link } from 'react-router-dom'

const CampusCard = props => {
  const { campus } = props
  return (
    <Link to={`/campuses/${campus.id}#top`} className='fullCardLink' >
      <div className="cardContainer">
        <img src={campus.imgUrl} className="cardImg" />
        <div className='column cardColumn' >
          <span className='cardLink'>{campus.name}</span>
          {
            campus.students &&
            <span className='cardLink'>{`Members: ${campus.students.length}`}</span>
          }
        </div>
      </div>
    </Link>
  )
}

export default CampusCard