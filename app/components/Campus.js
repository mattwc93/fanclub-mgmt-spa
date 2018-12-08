import React from 'react'

const Campus = props => {
  const { campus, submitRemove } = props
  return (
    <div className="campusContainer">
      <img src={campus.imgUrl} className="smallImg" />
      <div className='column singleView'>
        <h4>Address: </h4><p>{campus.address}</p>
        <h4>Description:</h4><p> {campus.description}</p>
        {
          !props.singleView && <button type='submit' className='add_btn' onClick={submitRemove}>Remove Campus</button>
        }
      </div>
    </div>
  )
}

export default Campus