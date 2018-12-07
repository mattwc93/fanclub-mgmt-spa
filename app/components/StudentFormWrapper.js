import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { postStudent } from '../reducers/studentReducer'
import { connect } from 'react-redux'
import classNames from 'classnames'
import StudentForm from './StudentForm'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  gpa: '',
  imgUrl: '',
  invalidSubmit: false,
  validEmail: false,
  validFirstName: false,
  validLastName: false,
  validGpa: false,
  validForm: false,
  updateForm: false
}

class StudentFormWrapper extends Component {
  constructor() {
    super();
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateFormField = this.validateFormField.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }


  // handleChange:
  //  form control, also checks validation of each field as it is entered and sets state accordingly
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value },
      () => { this.validateFormField(name, value) })
  }

  // handleSubmit:
  // validate user submitted inputs
  // if they are all valid: add to database and update redux state, then redirect to the all students view
  // otherwise set our submission as invalid on local state so invalid fields will be highlighted
  async handleSubmit(event) {
    event.preventDefault()
    await this.validateForm()
    if(this.state.updateForm) {
      this.props.history.push(`/notFound`)
    } else if (this.state.validForm) {
      await this.props.newStudent(this.state);
      this.props.history.push(`/students`)
    } else {
      this.setState({
        invalidSubmit: true
      })
    }
  }

  // Form validation helpers:
  //  validateFormField:
  //  get our current validation fields from state, then check the passed fields value
  //  set state with new validation value
  validateFormField(field, value) {
    let validEmail = this.state.validEmail
    let validFirstName = this.state.validFirstName
    let validLastName = this.state.validLastName
    let validGpa = this.state.validGpa

    switch (field) {
      case 'email':
        validEmail = !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i)
        break;
      case 'firstName':
        validFirstName = value.length > 0
        break;
      case 'lastName':
        validLastName = value.length > 0
        break;
      case 'gpa':
        validGpa = value >= 0.0 && value <= 4.0
        break;
      default:
        break;
    }
    this.setState({
      validEmail,
      validFirstName,
      validLastName,
      validGpa
    })
  }

  //  validateForm:
  //  check that all validation fields on state are true and set our form validation state
  validateForm() {
    const { validFirstName, validLastName, validEmail, validGpa } = this.state
    const allValid = (validEmail && validFirstName && validLastName && validGpa)
    this.setState({
      validForm: allValid
    })
  }

  componentDidMount() {
    if (this.props.match.params.studentId) {
      this.setState({
        ...this.props.student,
        validEmail: true,
        validFirstName: true,
        validLastName: true,
        validGpa: true,
        validForm: true,
        updateForm: true
      })
    }
  }


  render() {
    // generate our class names in case of form validation errors
    let emailClasses, firstNameClasses, lastNameClasses, gpaClasses
    if (this.state.invalidSubmit) {
      emailClasses = classNames({
        'formError': !this.state.validEmail
      })
      firstNameClasses = classNames({
        'formError': !this.state.validFirstName
      })
      lastNameClasses = classNames({
        'formError': !this.state.validLastName
      })
      gpaClasses = classNames({
        'formError': !this.state.validGpa
      })
    }

    // put props into objects for easier passing
    const classProps = { emailClasses, firstNameClasses, lastNameClasses, gpaClasses }
    const methodProps = { handleChange: this.handleChange, handleSubmit: this.handleSubmit }
    return (
      <StudentForm
        methods={methodProps}
        classes={classProps}
        state={this.state}
      />
    )
  }
}

const mapState = state => ({
  student: state.students.selectedStudent
})

const mapDispatch = dispatch => ({
  newStudent: (student) => dispatch(postStudent(student))
})

export default withRouter(connect(mapState, mapDispatch)(StudentFormWrapper))