import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Campus from './Campus'
import NewCampusForm from './NewCampusForm'
import { fetchCampuses } from '../reducers/campusReducer'



class CampusList extends Component {
  componentDidMount() {
    this.props.fetchCampuses()
  }
  render() {
    const campuses = this.props.campuses;
    return (
      <div className='container' >
        <h1>LIST OF CAMPUSES:</h1>
          {
            campuses.length
            ? campuses.map(campus => <Campus key={campus.id} campus={campus} />)
            : <h2>No Campuses Found</h2>
          }
        <NewCampusForm />
      </div>
    )
  }
}

const mapState = state => ({
  campuses: state.campuses
})

const mapDispatch = dispatch => ({
  fetchCampuses: () => dispatch(fetchCampuses())
})

export default withRouter(connect(mapState, mapDispatch)(CampusList))
