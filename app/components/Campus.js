import React from 'react'
import { Link } from 'react-router-dom';

const Campus = props => {
  const { campus, submitRemove } = props
  return (
    <div className="campusContainer">
      <img src={campus.imgUrl} className="smallImg" />
      <h4>Name: <Link to={`/campuses/${campus.id}`} >{campus.name}</Link></h4>
      <h4>Address: </h4><p>{campus.address}</p>
      <h4>Description:</h4><p> {campus.description}</p>
      {
        !props.singleView && <button type='button' onClick={submitRemove}>Remove Campus</button>
      }
    </div>
  )
}

export default Campus