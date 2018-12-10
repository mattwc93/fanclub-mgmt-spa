import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import CampusCard from './CampusCard'
import { fetchCampuses } from '../reducers/campusReducer'
import CampusFilterForm from './CampusFilterForm';



class CampusList extends Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      filterByName: false,
      filterByMembers: false,
      nameFilter: '',
      memberFilterMin: 0,
      memberFilterMax: 0,
      showFilters: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.filterChange = this.filterChange.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
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
    const filterProps = { ...this.state, filterChange: this.filterChange, toggleFilter: this.toggleFilter }
    let campuses = [...this.props.campuses]
    const { filterByMembers, filterByName, nameFilter, memberFilterMax, memberFilterMin, showFilters, loading } = this.state
    if (showFilters && filterByName) {
      campuses = campuses.filter(campus => campus.name.toLowerCase().includes(nameFilter.toLowerCase()))
    }
    if (showFilters && filterByMembers) {
      campuses = campuses.filter(campus => (campus.students.length >= memberFilterMin && campus.students.length <= memberFilterMax))
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
          <div className='filterDiv'>
            <CampusFilterForm filterProps={filterProps} />
          </div>
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
