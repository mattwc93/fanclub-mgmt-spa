import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchStudents } from '../reducers/studentReducer'

class StudentList extends Component {

  componentDidMount() {
    this.props.fetchStudents();
  }

  render() {
    const students = this.props.students;
    return (
      <ul>
        {students.map(student => {
          return (
            <div key={student.id} className='listContainer'>
              <img src={student.imageUrl} className="smallImg" />
              <div>
                <h4>Name: {student.firstName} {student.lastName}</h4>
                <p>Email: {student.email}</p>
                <p>GPA: {student.gpa}</p>
                <p>School: {student.campus.name}</p>
              </div>
              <hr />
            </div>
          )
        })}
      </ul>
    )
  }
}

const mapState = state => ({
  students: state.students
})

const mapDispatch = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents())
})

export default connect(mapState, mapDispatch)(StudentList)