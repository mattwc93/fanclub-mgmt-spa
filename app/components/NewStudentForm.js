import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { postStudent } from '../reducers/studentReducer'
import { connect } from 'react-redux'
import classNames from 'classnames'

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
  validForm: false
}

class NewStudentForm extends Component {
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
    event.preventDefault();
    await this.validateForm()
    if (this.state.validForm) {
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

  render() {
    const { firstName, lastName, email, gpa, imgUrl } = this.state

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

    return (
      <form onSubmit={this.handleSubmit} className='campusContainer'>
        <h2>ADD NEW STUDENT:</h2>
        <label htmlFor='firstName'>First Name:
          {
            this.state.invalidSubmit
            && !this.state.validFirstName
            && <span className="warning"> required!</span>
          }
        </label>
        <input name='firstName' className={firstNameClasses} value={firstName} onChange={this.handleChange} />
        <label htmlFor='lastName'>Last Name:
          {
            this.state.invalidSubmit
            && !this.state.validLastName
            && <span className="warning"> required!</span>
          }
        </label>
        <input name='lastName' value={lastName} className={lastNameClasses} onChange={this.handleChange} />
        <label htmlFor='email'>Email:
          {
            this.state.invalidSubmit
            && !this.state.validEmail
            && <span className="warning"> must be of format example@example.com</span>
          }
        </label>
        <input name='email' className={emailClasses} value={email} onChange={this.handleChange} />
        <label htmlFor='gpa'>GPA:
          {
            this.state.invalidSubmit
            && !this.state.validGpa
            && <span className="warning"> must be between 0.0 and 4.0</span>
          }
        </label>
        <input name='gpa' type='float' className={gpaClasses} value={gpa} onChange={this.handleChange} />
        <label htmlFor='imgUrl'>Image URL:</label>
        <input name='imgUrl' onChange={this.handleChange} value={imgUrl} />
        <button type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  newStudent: (student) => dispatch(postStudent(student))
})

export default withRouter(connect(null, mapDispatch)(NewStudentForm))