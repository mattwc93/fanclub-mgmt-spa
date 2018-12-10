import React from 'react'

const CampusFilterForm = props => {
  const { nameFilter, memberFilterMin, memberFilterMax, filterByName, filterByMembers, filterChange, toggleFilter, showFilters, avgRatingFilterMin, avgRatingFilterMax, filterByAvgRating } = props.filterProps
  if (!showFilters) {
    return (
      <button type='button' className='filter_btn filter_menu' name='showFilters' onClick={toggleFilter}>SHOW FILTERS</button>
    )
  }
  else {
    return (
      <div className='filterContainer'>
        <span><span className='centerText'><p>{`FILTER BY: `}</p></span>
          <div className='filterBtnContainer'>
            <button type='button' className='filter_btn' name='filterByName' onClick={toggleFilter}>NAME</button>
            <button type='button' className='filter_btn' name='filterByMembers' onClick={toggleFilter}>MEMBER COUNT</button>
            <button type='button' className='filter_btn' name='filterByAvgRating' onClick={toggleFilter}>AVG RATING</button>
          </div>
        </span>
        <div className='column marginTop'>
          {
            filterByName &&
            <div>
              <span className='filterLine'>
                <label htmlFor='nameFilter' >NAME:</label>
                <input type='text' name='nameFilter' value={nameFilter} onChange={filterChange} />
              </span>
            </div>
          }
          {
            filterByMembers &&
            <div>
              <span className='filterLine'>
                <label htmlFor='memberFilterMin' >{`HAS BETWEEN `}</label>
                <input type='number' className='numberInput' name='memberFilterMin' value={memberFilterMin} onChange={filterChange} />
                <label htmlFor='memberFilterMax' >{` & `}</label>
                <input type='number' className='numberInput' name='memberFilterMax' value={memberFilterMax} onChange={filterChange} />
                <label>MEMBERS</label>
              </span>
            </div>
          }
          {
            filterByAvgRating &&
            <div>
              <span className='filterLine'>
                <label htmlFor='avgRatingFilterMin' >{`AVG RATING IS BETWEEN `}</label>
                <input type='number' className='numberInput' name='avgRatingFilterMin' value={avgRatingFilterMin} onChange={filterChange} />
                <label htmlFor='avgRatingFilterMax' >{` & `}</label>
                <input type='number' className='numberInput' name='avgRatingFilterMax' value={avgRatingFilterMax} onChange={filterChange} />
              </span>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default CampusFilterForm