import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import CampusCard from './CampusCard'
import { fetchCampuses } from '../reducers/campusReducer'



class CampusList extends Component {

  constructor() {
    super()
    this.state = {
      loading: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchCampuses()
    this.setState({
      loading: false
    })
  }

  handleClick() {
    this.props.history.push(`/campuses/add`)
  }

  render() {
    const { campuses } = this.props
    if (this.state.loading) {
      return <h1>LOADING FANCLUB...</h1>
    } else {
      return (
        <div>
          <div className="listHeader">
            <h1>ALL FANCLUBS:</h1>
            <button type='submit' onClick={this.handleClick} className='add_btn' >ADD A FANCLUB</button>
          </div>
          <div className='row wrap studentList' >
            {
              campuses.length
                ? campuses.map(campus => <CampusCard key={campus.id} campus={campus} />)
                : <h2>No Fanclubs Found</h2>
            }
          </div>
          <a href='#top'>TOP</a>
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
