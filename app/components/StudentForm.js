import React from 'react'

const StudentForm = props => {
  const { handleSubmit, handleChange } = props.methods
  const { invalidSubmit, validFirstName, validEmail, validLastName, validGpa, firstName, lastName, email, gpa, imgUrl } = props.state
  const { firstNameClasses, lastNameClasses, emailClasses, gpaClasses } = props.classes
  return (
    <form onSubmit={handleSubmit} autocomplete='off' className='column'>
      <h2>ADD NEW STUDENT:</h2>
      <label htmlFor='firstName'>First Name:
        {
          invalidSubmit
          && !validFirstName
          && <span className="warning"> required!</span>
        }
      </label>
      <input name='firstName' className={firstNameClasses} value={firstName} onChange={handleChange} />
      <label htmlFor='lastName'>Last Name:
        {
          invalidSubmit
          && !validLastName
          && <span className="warning"> required!</span>
        }
      </label>
      <input name='lastName' value={lastName} className={lastNameClasses} onChange={handleChange} />
      <label htmlFor='email'>Email:
        {
          invalidSubmit
          && !validEmail
          && <span className="warning"> must be of format example@example.com</span>
        }
      </label>
      <input name='email' className={emailClasses} value={email} onChange={handleChange} />
      <label htmlFor='gpa'>GPA:
        {
          invalidSubmit
          && !validGpa
          && <span className="warning"> must be between 0.0 and 4.0</span>
        }
      </label>
      <input name='gpa' type='float' className={gpaClasses} value={gpa} onChange={handleChange} />
      <label htmlFor='imgUrl'>Image URL:</label>
      <input name='imgUrl' onChange={handleChange} value={imgUrl} />
      <button type='submit'>SUBMIT</button>
    </form>
  )
}

export default StudentForm