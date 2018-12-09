import React from 'react'

const StudentForm = props => {
  const { handleSubmit, handleChange } = props.methods
  const { invalidSubmit, validFirstName, validEmail, validLastName, validGpa, firstName, lastName, email, gpa, imgUrl, updateForm, editFormName } = props.state
  const { firstNameClasses, lastNameClasses, emailClasses, gpaClasses } = props.classes
  return (
    <div className='formDiv'>
      <form onSubmit={handleSubmit} autoComplete='off' className='formContainer'>
        {
          !updateForm
          ? <h2 className='formLabel'>ADD NEW STUDENT:</h2>
          : <h2 className='formLabel'>{`EDIT ${editFormName ? editFormName.toUpperCase() : `STUDENT`}'S INFO:`}</h2>
        }
        <label htmlFor='firstName' className='cardLink'>First Name:
        {
            invalidSubmit
            && !validFirstName
            && <span className="warning"> required!</span>
          }
        </label>
        <input name='firstName' className={firstNameClasses} value={firstName} onChange={handleChange} />
        <label htmlFor='lastName' className='cardLink'>Last Name:
        {
            invalidSubmit
            && !validLastName
            && <span className="warning"> required!</span>
          }
        </label>
        <input name='lastName' value={lastName} className={lastNameClasses} onChange={handleChange} />
        <label htmlFor='email' className='cardLink'>Email:
        {
            invalidSubmit
            && !validEmail
            && <span className="warning"> must be of format example@example.com</span>
          }
        </label>
        <input name='email' className={emailClasses} value={email} onChange={handleChange} />
        <label htmlFor='gpa' className='cardLink'>GPA:
        {
            invalidSubmit
            && !validGpa
            && <span className="warning"> must be between 0.0 and 4.0</span>
          }
        </label>
        <input name='gpa' type='float' className={gpaClasses} value={gpa} onChange={handleChange} />
        <label htmlFor='imgUrl' className='cardLink'>Image URL:</label>
        <input name='imgUrl' onChange={handleChange} value={imgUrl} />
        <button type='submit' className='add_btn form_btn'>SUBMIT</button>
      </form>
    </div>
  )
}

export default StudentForm