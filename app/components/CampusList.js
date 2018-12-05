import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Campus from './Campus'


class CampusList extends Component {
  render() {
    const campuses = this.props.campuses;
    return (
      <div className='container' >
        <h1>LIST OF CAMPUSES:</h1>
        <ul>
          {
            campuses.length && campuses.map(campus => <Campus key={campus.id} campus={campus} />)
          }
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  campuses: state.campuses
})

export default withRouter(connect(mapState)(CampusList))
