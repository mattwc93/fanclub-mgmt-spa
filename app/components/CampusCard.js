import React from 'react'
import { Link } from 'react-router-dom'

const CampusCard = props => {
  const { campus } = props
  return (
    <Link to={`/campuses/${campus.id}#top`}  className='fullCardLink' >
      <div className="cardContainer">
        <img src={campus.imgUrl} className="cardImg" />
        <span className='cardLink'>{campus.name}</span>
      </div>
    </Link>
  )
}

export default CampusCard