import React from 'react'

const CampusForm = props => {
  const { handleChange, handleSubmit } = props.methods
  const { name, address, description, imgUrl, invalidSubmit, validName, validAddress, updateForm, editFormName } = props.state
  const { nameClasses, addressClasses } = props.classes
  return (
    <div className='formDiv'>
      <form onSubmit={handleSubmit} autoComplete='off' className='formContainer'>
        {
          !updateForm
            ? <h2 className='formLabel'>ADD NEW CAMPUS:</h2>
            : <h2 className='formLabel'>{`EDIT ${editFormName ? `${editFormName.toUpperCase()}'S` : `CAMPUS'`} INFO:`}</h2>
        }
        <label htmlFor='name' className='cardLink'>Name:
        {
            invalidSubmit
            && !validName
            && <span className="warning"> required!</span>
          }
        </label>
        <input name='name' onChange={handleChange} className={nameClasses} value={name} />
        <label htmlFor='address' className='cardLink'>Address:
        {
            invalidSubmit
            && !validAddress
            && <span className="warning"> required!</span>
          }
        </label>
        <input name='address' onChange={handleChange} className={addressClasses} value={address} />
        <label htmlFor='imgUrl'>Image URL:</label>
        <input name='imgUrl' onChange={handleChange} value={imgUrl} />
        <label htmlFor='description' className='cardLink'>Description:</label>
        <textarea name='description' onChange={handleChange} value={description} />
        <button type='submit' className='add_btn form_btn'>SUBMIT</button>
      </form>
    </div>
  )
}

export default CampusForm