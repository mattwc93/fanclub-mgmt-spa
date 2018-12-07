import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = props => {

  return (
    <div>
      <h1>HOME PAGE PLACEHOLDER TEXT</h1>
      <h2>WHY DO I EVEN HAVE THIS PAGE?</h2>
      <h3>I DON'T KNOW TBH, JUST SEEMED RIGHT TO HAVE ONE</h3>
      <h4>ONE DAY ILL HAVE A REAL USE(MAYBE)</h4>
      <hr />
      <Link to='/campuses' className='navLink'>SEE ALL CAMPUSES</Link>
      <hr />
      <Link to='/students' className='navLink'>SEE ALL STUDENTS</Link>
      <hr />
    </div>
  )
}

export default LandingPage