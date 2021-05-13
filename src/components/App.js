import React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Main from '../components/Main'
import Footer from '../components/Footer'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import * as auth from '../auth';

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const history = useHistory()

  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn({
      loggedIn: true
    })
  }

  function tokenCheck () {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
 
      const jwt = localStorage.getItem('jwt');
      if (jwt){
        // проверим токен
        auth.getContent(jwt).then((res) => {
          if (res){
            setUserEmail(res.data.email)
                    // авторизуем пользователя
            setLoggedIn({
              loggedIn: true,
            });
                        // обернём App.js в withRouter
                        // так, что теперь есть доступ к этому методу
              history.push('/');
            };
          }
        );
      }
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

  function handleEditAvatarClick() {
    setAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }  

  function handleUpdateUser(info) {
    api.editProfileInfo(info)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => Promise.reject(err))
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data.avatar)
      .then((info) => {
        setCurrentUser(info)
        closeAllPopups()
      })
      .catch(err => Promise.reject(err))
  }

  function handleAddPlace(data) {
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => Promise.reject(err))
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => Promise.reject(err))
} 

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then((data) => {
        setCards((cards) => cards.filter(item => item._id !== card._id))
    })
      .catch(err => Promise.reject(err))
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false)
    setProfilePopupOpen(false)
    setPlacePopupOpen(false)
    setSelectedCard({})
  }

  React.useEffect(() => {
      api.getProfileInfo()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch(err => Promise.reject(err))
    }, [])

    React.useEffect(() => {
      api.getInitialCards()
        .then((items) => {
          setCards(items)
      })
        .catch(err => Promise.reject(err))
  }, [])

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <main className="reg">
              <Switch>
                <Route path="/sign-in">
                  <Login handleLogin = {handleLogin} mail={setUserEmail} />
                </Route>
                <Route path="/sign-up">
                  <Register />
                </Route>
                <ProtectedRoute
                  path="/"
                  loggedIn={loggedIn}
                  component={Main}
                  cards={cards} 
                  onCardLike={handleCardLike} 
                  onCardDelete={handleCardDelete} 
                  onEditProfile={handleEditProfileClick} 
                  onAddPlace={handleAddPlaceClick} 
                  onEditAvatar={handleEditAvatarClick} 
                  onCardClick={handleCardClick}
                  mail={userEmail}
                />
                <Route>
                  {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>
              </Switch>
            </main>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card = {selectedCard} onClose = {closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;