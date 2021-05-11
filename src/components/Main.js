import React from 'react'
import Card from '../components/Card'
import edit from '../images/edit.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser= React.useContext(CurrentUserContext)
  
  return (
    <main>
    <section className="profile-columns">
      <div className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
        <img src={edit} alt="Правка" className="profile__edit-icon"/>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
      </div>
      <button type="button" className="profile-columns__add-button" onClick={props.onAddPlace}></button>
    </section>
    <section className="elements">
      {props.cards.map((card) => {
        return(
          <Card card = {card} key = {card._id} onCardClick = {props.onCardClick} onCardLike = {props.onCardLike} onCardDelete={props.onCardDelete} />
      )})}
    </section>
  </main>
  )
}
export default Main