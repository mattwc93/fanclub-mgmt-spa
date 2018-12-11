import React from 'react'
import { Link } from 'react-router-dom'

const Campus = props => {
  const { campus, cardClick } = props
  return (
    <div className="campusContainer">
      <img src={campus.imgUrl} className="smallImg" />
      <div className='campusColumn singleView'>
        <span>
          <h3 className='campusH3'>Founder:</h3>
          <Link to={`/students/${campus.Founder.id}`} className='founderLink column'>
            <h4 onClick={() => { cardClick(campus.Founder.id) }}>{`${campus.Founder.firstName} ${campus.Founder.lastName}`}</h4>
          </Link>
        </span>
        <span>
          <h3 className='campusH3'>Address: </h3>
          <p>{campus.address}</p>
        </span>
        <span>
          <h3 className='campusH3'>Description:</h3>
          <p> {campus.description}</p>
        </span>
      </div>
    </div >
  )
}

export default Campus