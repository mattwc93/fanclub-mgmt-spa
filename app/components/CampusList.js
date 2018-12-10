import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import CampusCard from './CampusCard'
import { fetchCampuses } from '../reducers/campusReducer'
import CampusFilterForm from './CampusFilterForm';
import CampusSortSelector from './CampusSortSelector'



class CampusList extends Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      filterByName: false,
      filterByMembers: false,
      nameFilter: '',
      sortBy: '',
      reverseSort: false,
      memberFilterMin: 0,
      memberFilterMax: 0,
      showFilters: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.filterChange = this.filterChange.bind(this)
    this.sortChange = this.sortChange.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  sortChange(event) {
    this.setState({
      sortBy: event.target.value
    })
  }

  filterChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleFilter(event) {
    let currentFilterVal = this.state[event.target.name]
    this.setState({
      [event.target.name]: !currentFilterVal
    })
  }

  async componentDidMount() {
    await this.props.fetchCampuses()
    this.setState({
      loading: false,
      memberFilterMax: this.props.campuses.length
    })
  }

  handleClick() {
    this.props.history.push(`/campuses/add`)
  }

  render() {
    const filterProps = { ...this.state, filterChange: this.filterChange, toggleFilter: this.toggleFilter, sortChange: this.sortChange }
    let campuses = [...this.props.campuses]
    const { filterByMembers, filterByName, nameFilter, memberFilterMax, memberFilterMin, showFilters, loading, sortBy, reverseSort } = this.state

    //filters
    if (showFilters && filterByName) {
      campuses = campuses.filter(campus => campus.name.toLowerCase().includes(nameFilter.toLowerCase()))
    }
    if (showFilters && filterByMembers) {
      campuses = campuses.filter(campus => (campus.students.length >= memberFilterMin && campus.students.length <= memberFilterMax))
    }

    //sort
    if (!loading && sortBy.length > 0) {
      campuses.sort((a, b) => {
        let elemA, elemB;
        if (sortBy === 'numMembers') {
          elemA = a.students.length
          elemB = b.students.length
        } else {
          elemA = a[sortBy]
          elemB = b[sortBy]
        }
        if (typeof elemA === 'string') {
          elemA = elemA.toUpperCase()
          elemB = elemB.toUpperCase()
        }
        if (elemA < elemB) {
          return -1
        }
        if (elemA > elemB) {
          return 1
        }
        return 0
      })
    }
    if (reverseSort) {
      campuses.reverse()
    }

    if (loading) {
      return <h1>LOADING FANCLUB...</h1>
    } else {
      return (
        <div>
          <div className="listHeader">
            <h1>ALL FANCLUBS:</h1>
            <button type='submit' onClick={this.handleClick} className='add_btn' >START A FANCLUB</button>
          </div>
          {
            showFilters
              ? (
                <React.Fragment>
                  <div className='filterDiv'>
                    <CampusFilterForm filterProps={filterProps} />
                  </div>
                  <div className='sortDiv'>
                    <CampusSortSelector sortProps={filterProps} />
                  </div>
                </React.Fragment>
              )
              : (
                <div className='filterDiv'>
                  <CampusFilterForm filterProps={filterProps} />
                  <CampusSortSelector sortProps={filterProps} />
                </div>
              )
          }
          <div className='row wrap studentList' >
            {
              campuses.length
                ? campuses.map(campus => <CampusCard key={campus.id} campus={campus} />)
                : <h2>No Fanclubs Found</h2>
            }
          </div>
          <div className='anchorContainer'>
            <a href='#top' className='topAnchor'>TOP</a>
          </div>
        </div>
      )
    }
  }
}

const mapState = state => ({
  campuses: state.campuses.campusList,
})

const mapDispatch = dispatch => ({
  fetchCampuses: () => dispatch(fetchCampuses()),

})

export default withRouter(connect(mapState, mapDispatch)(CampusList))
