import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
      // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

      // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  return (
  <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name="edit" title="Редактировать профиль" >
    <label className="popup__form-field">
      <input required value={name} onChange={handleChangeName} id="name-input" type="text" name="name" placeholder="Жак-Ив Кусто" className="popup__placeholder popup__placeholder_type_name" minLength="2" maxLength="40"/>
      <span className="name-input-error popup__placeholder-error"></span>
    </label>
    <label className="popup__form-field">
      <input required value={description} onChange={handleChangeDescription} id="info-input" type="text" name="info" placeholder="Исследователь океана" className="popup__placeholder popup__placeholder_type_info" minLength="2" maxLength="200"/>
      <span className="info-input-error popup__placeholder-error"></span>
    </label>
  </PopupWithForm>
  )
}

export default EditProfilePopup;