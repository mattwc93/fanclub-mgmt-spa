import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { postCampus, putCampus } from '../reducers/campusReducer'
import { connect } from 'react-redux'
import classNames from 'classnames'
import CampusForm from './CampusForm'

const initialState = {
  name: '',
  address: '',
  description: '',
  imgUrl: '',
  editFormName: '',
  validName: false,
  validAddress: false,
  validForm: false,
  invalidSubmit: false,
  updateForm: false
}
class CampusFormWrapper extends Component {
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

  // validate all our form data before submitting
  // check if we are in an update form or create form and call according thunk
  async handleSubmit(event) {
    event.preventDefault();
    await this.validateForm()
    if (this.state.validForm) {
      if (this.state.updateForm) {
        const campusId = this.props.campus.id
        await this.props.editCampus(this.state, campusId)
        this.props.history.push(`/campuses/${campusId}`)
      } else {
        await this.props.newCampus(this.state);
        this.props.history.push(`/campuses`)
      }
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

  componentDidMount() {
    // check if we are on our update Route and set state accordingly
    if (this.props.match.params.campusId) {
      this.setState({
        ...this.props.campus,
        editFormName: this.props.campus.name,
        validName: true,
        validAddress: true,
        validForm: true,
        updateForm: true,
        invalidSubmit: true
      })
    }
  }

  render() {
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
    // package up our props for easier passing/assigning
    const propClasses = { nameClasses, addressClasses }
    const propMethods = { handleChange: this.handleChange, handleSubmit: this.handleSubmit }

    return (
      <CampusForm
        classes={propClasses}
        methods={propMethods}
        state={this.state}
      />
    )
  }
}

const mapState = state => ({
  campus: state.campuses.selectedCampus
})

const mapDispatch = dispatch => ({
  newCampus: (campus) => dispatch(postCampus(campus)),
  editCampus: (campus, id) => dispatch(putCampus(campus, id))
})

export default withRouter(connect(mapState, mapDispatch)(CampusFormWrapper))