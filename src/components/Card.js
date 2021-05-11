import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
  `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
  `element__like-button ${isLiked && 'element__like-button_active'}`
); 

  function handleClick() {
    props.onCardClick({link: props.card.link, name: props.card.name});
  }  

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

    return(
    <div className="element">
    <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
    <div className="element__photo" style={{ backgroundImage: `url(${props.card.link})`}} onClick={handleClick}></div>
    <div className="element__label">
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__like">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <p className="element__like-counter">{props.card.likes.length}</p>
      </div>
    </div>
  </div>
)}

export default Card