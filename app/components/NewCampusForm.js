import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { postCampus } from '../reducers/campusReducer'
import { connect } from 'react-redux'
import classNames from 'classnames'

const initialState = {
  name: '',
  address: '',
  description: '',
  imgUrl: '',
  validName: false,
  validAddres: false,
  validForm: false,
  invalidSubmit: false
}
class NewCampusForm extends Component {
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

  async handleSubmit(event) {
    event.preventDefault();
    await this.validateForm()
    if (this.state.validForm) {
      await this.props.newCampus(this.state);
      this.props.history.push(`/campuses`)
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
    let validName = this.state.validName
    let validAddress = this.state.validAddress

    switch (field) {
      case 'name':
        validName = value.length > 0
        break;
      case 'address':
        validAddress = value.length > 0
        break;
      default:
        break;
    }
    this.setState({
      validName,
      validAddress
    })
  }

  //  validateForm:
  //  check that all validation fields on state are true and set our form validation state
  validateForm() {
    const { validName, validAddress } = this.state
    const allValid = (validName && validAddress)
    this.setState({
      validForm: allValid
    })
  }

  render() {
    const { name, address, description, imgUrl } = this.state

    // generate our class names in case of form validation errors
    let nameClasses, addressClasses
    if (this.state.invalidSubmit) {
      nameClasses = classNames({
        'formError': !this.state.validName
      })
      addressClasses = classNames({
        'formError': !this.state.validAddress
      })
    }

    return (
      <form onSubmit={this.handleSubmit} className='campusContainer'>
        <h2>ADD NEW CAMPUS:</h2>
        <label htmlFor='name'>Name:</label>
        <input name='name' onChange={this.handleChange} className={nameClasses} value={name} />
        <label htmlFor='address'>Address:</label>
        <input name='address' onChange={this.handleChange} className={addressClasses} value={address} />
        <label htmlFor='imgUrl'>Image URL:</label>
        <input name='imgUrl' onChange={this.handleChange} value={imgUrl} />
        <label htmlFor='description'>Description:</label>
        <textarea name='description' onChange={this.handleChange} value={description} />
        <button type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  newCampus: (campus) => dispatch(postCampus(campus))
})

export default withRouter(connect(null, mapDispatch)(NewCampusForm))