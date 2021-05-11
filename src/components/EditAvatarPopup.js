import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const EditAvatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: EditAvatarRef.current.value,
    });
  }

  return(
  <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name="edit-avatar" title="Обновить аватар">
    <label className="popup__form-field">
      <input required ref={EditAvatarRef} id="place-avatar-input" type="url" name="link" placeholder="Ссылка на аватар" className="popup__placeholder popup__placeholder_type_avatar-link" minLength="2" maxLength="200"/>
      <span className="place-avatar-input-error popup__placeholder-error"></span>
    </label>
  </PopupWithForm>
    )
  }
export default EditAvatarPopup