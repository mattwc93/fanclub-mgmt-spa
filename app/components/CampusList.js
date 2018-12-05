import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCampuses } from '../reducers/campusReducer'

class CampusList extends Component {
  componentDidMount() {
    this.props.fetchCampuses();
  }
  render() {
    const campuses = this.props.campuses;
    return (
      <div>
        <ul>
          {campuses.map(campus => {
            return (
              <div key={campus.id} className='listContainer'>
                <img src={campus.imgUrl} className="smallImg" />
                <h4>Name: {campus.name}</h4>
                <h4>Address: </h4><p>{campus.address}</p>
                <h4>Description:</h4><p> {campus.description}</p>
              </div>
            )
          })}
        </ul>
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

export default connect(mapState, mapDispatch)(CampusList)