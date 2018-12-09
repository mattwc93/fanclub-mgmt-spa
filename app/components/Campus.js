import React from 'react'

const Campus = props => {
  const { campus } = props
  return (
    <div className="campusContainer">
      <img src={campus.imgUrl} className="smallImg" />
      <div className='column singleView'>
        <h2>Address: </h2><p>{campus.address}</p>
        <h2>Description:</h2><p> {campus.description}</p>
      </div>
    </div>
  )
}

export default Campus