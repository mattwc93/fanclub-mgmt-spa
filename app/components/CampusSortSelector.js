import React from 'react'


const CampusSortSelecor = props => {
  const { sortBy, reverseSort, toggleFilter, sortChange } = props.sortProps
  return (
    <div>
      <span>
        <select value={sortBy} onChange={sortChange} className='sortSelector'>
          <option value=''>SORT BY:</option>
          <option value='name'>NAME</option>
          <option value='numMembers'># of MEMBERS</option>
        </select>
        {
          reverseSort
            ? <button type='button' className='filter_btn' name='reverseSort' onClick={toggleFilter}>DESCENDING</button>
            : <button type='button' className='filter_btn' name='reverseSort' onClick={toggleFilter}>ASCENDING</button>
        }
      </span>
    </div>
  )
}

export default CampusSortSelecor