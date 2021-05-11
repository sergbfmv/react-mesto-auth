import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const AddNameRef = React.useRef()
  const AddLinkRef = React.useRef()

  function handleAddPlaceSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: AddNameRef.current.value,
      link: AddLinkRef.current.value
    })
  }

  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} isOpen={props.isOpen} onClose={props.onClose} name="add" title="Новое место">
    <label className="popup__form-field">
      <input required ref={AddNameRef} id="place-input" type="text" name="name" placeholder="Название" className="popup__placeholder popup__placeholder_type_title" minLength="2" maxLength="30"/>
      <span className="place-input-error popup__placeholder-error"></span>
    </label>
    <label className="popup__form-field">
      <input required ref={AddLinkRef} id="link-input" type="url" name="link" placeholder="Ссылка на картинку" className="popup__placeholder popup__placeholder_type_link"/>
      <span className="link-input-error popup__placeholder-error"></span>
    </label>
  </PopupWithForm>
  )
}

export default AddPlacePopup