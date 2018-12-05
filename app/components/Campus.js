import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Campus(props) {
  const campus = props.campus
  return (
    <div className="listContainer">
      <img src={campus.imgUrl} className="smallImg" />
      <h4>Name: <NavLink to={`/campuses/${campus.id}`} >{campus.name}</NavLink></h4>
      <h4>Address: </h4><p>{campus.address}</p>
      <h4>Description:</h4><p> {campus.description}</p>
    </div>
  )
}
