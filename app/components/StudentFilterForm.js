import React from 'react'

const StudentFilterForm = props => {
  const { firstNameFilter, lastNameFilter, ratingFilterMin, ratingFilterMax, filterByFirstName, filterByLastName, filterByRating, filterChange, toggleFilter, showFilters, clubNameFilter, filterByClubName } = props.filterProps
  if (!showFilters) {
    return (
      <button type='button' className='filter_btn filter_menu' name='showFilters' onClick={toggleFilter}>SHOW FILTERS</button>
    )
  }
  else {
    return (
      <div className='filterContainer' id='studentFilterContainer'>
        <span><span className='centerText'><p>{`FILTER BY: `}</p></span>
          <div className='filterBtnContainer'>
            <button type='button' className='filter_btn' name='filterByFirstName' onClick={toggleFilter}>FIRST NAME</button>
            <button type='button' className='filter_btn' name='filterByLastName' onClick={toggleFilter}>LAST NAME</button>
            <button type='button' className='filter_btn' name='filterByRating' onClick={toggleFilter}>MEMBER RATING</button>
            <button type='button' className='filter_btn' name='filterByClubName' onClick={toggleFilter}>CLUB NAME</button>
          </div>
        </span>
        <div className='column marginTop'>
          {
            filterByFirstName &&
            <div>
              <span className='filterLine'>
                <label htmlFor='nameFilter' >FIRST NAME:</label>
                <input type='text' name='firstNameFilter' value={firstNameFilter} onChange={filterChange} />
              </span>
            </div>
          }
          {
            filterByLastName &&
            <div>
              <span className='filterLine'>
                <label htmlFor='nameFilter' >LAST NAME:</label>
                <input type='text' name='lastNameFilter' value={lastNameFilter} onChange={filterChange} />
              </span>
            </div>
          }
          {
            filterByClubName &&
            <div>
              <span className='filterLine'>
                <label htmlFor='clubNameFilter' >NAME:</label>
                <input type='text' name='clubNameFilter' value={clubNameFilter} onChange={filterChange} />
              </span>
            </div>
          }
          {
            filterByRating &&
            <div>
              <span className='filterLine'>
                <label htmlFor='ratingFilterMin' >{`MEMBER RATING IS BETWEEN`} </label>
                <input type='number' className='numberInput' name='ratingFilterMin' value={ratingFilterMin} onChange={filterChange} />
                <label htmlFor='ratingFilterMax' >{` & `}</label>
                <input type='number' className='numberInput' name='ratingFilterMax' value={ratingFilterMax} onChange={filterChange} />
              </span>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default StudentFilterForm