import React from 'react'

const CampusForm = props => {
  const { handleChange, handleSubmit } = props.methods
  const { name, address, description, imgUrl, invalidSubmit, validName, validAddress } = props.state
  const { nameClasses, addressClasses } = props.classes
  return (
    <form onSubmit={handleSubmit} autocomplete='off' className='column'>
      <h2>ADD NEW CAMPUS:</h2>
      <label htmlFor='name'>Name:
        {
          invalidSubmit
          && !validName
          && <span className="warning"> required!</span>
        }
      </label>
      <input name='name' onChange={handleChange} className={nameClasses} value={name} />
      <label htmlFor='address'>Address:
        {
          invalidSubmit
          && !validAddress
          && <span className="warning"> required!</span>
        }
      </label>
      <input name='address' onChange={handleChange} className={addressClasses} value={address} />
      <label htmlFor='imgUrl'>Image URL:</label>
      <input name='imgUrl' onChange={handleChange} value={imgUrl} />
      <label htmlFor='description'>Description:</label>
      <textarea name='description' onChange={handleChange} value={description} />
      <button type='submit'>SUBMIT</button>
    </form>
  )
}

export default CampusForm