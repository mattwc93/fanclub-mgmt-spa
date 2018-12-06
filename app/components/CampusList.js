import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Campus from './Campus'
// import NewCampusForm from './NewCampusForm'
import { fetchCampuses } from '../reducers/campusReducer'



class CampusList extends Component {

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchCampuses()
  }

  handleClick() {
    this.props.history.push(`/campuses/add`)
  }

  render() {
    const { campuses } = this.props
    return (
      <React.Fragment>
        <button type='button' onClick={this.handleClick} >ADD A CAMPUS</button>
        <div className='container' >
          <h1>LIST OF CAMPUSES:</h1>
          {
            campuses.length
              ? campuses.map(campus => <Campus key={campus.id} campus={campus} />)
              : <h2>No Campuses Found</h2>
          }
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  campuses: state.campuses.campusList
})

const mapDispatch = dispatch => ({
  fetchCampuses: () => dispatch(fetchCampuses())
})

export default withRouter(connect(mapState, mapDispatch)(CampusList))
