import React from 'react'


const StudentSortSelecor = props => {
  const { sortBy, reverseSort, toggleFilter, sortChange } = props.sortProps
  return (
    <div>
      <span>
        <select value={sortBy} onChange={sortChange} className='sortSelector'>
          <option value=''>SORT BY:</option>
          <option value='firstName'>FIRST NAME</option>
          <option value='lastName'>LAST NAME</option>
          <option value='clubName'>CLUB NAME</option>
          <option value='gpa'>RATING</option>
        </select>
        {
          reverseSort
            ? <button type='button' className='filter_btn filter_menu' name='reverseSort' onClick={toggleFilter}>DESCENDING</button>
            : <button type='button' className='filter_btn filter_menu' name='reverseSort' onClick={toggleFilter}>ASCENDING</button>
        }
      </span>
    </div>
  )
}

export default StudentSortSelecor