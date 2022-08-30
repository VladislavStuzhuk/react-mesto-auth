import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import AddImagePopup from './AddImagePopup';
import DeletePopup from './DeletePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  
  const [email, setEmail] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSucces, setIsRegisterSucces] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const history = useHistory();
  
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard(null)
  }
  //Проверка токена 
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth.checkToken(jwt).
        then(res => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        }).
      catch(err => console.log(err))
    }  
  },[history])
  
  //Получение информации о пользователе 
  useEffect(() => {
    api.getUserInfo().
    then((data)=>{
      setCurrentUser(data)
    }).
    catch(err => console.log(err))
  }, [])
  
  //Получение карточек 
  useEffect(() => {
    api.getInitialCards().
    then((data)=>{
      setCards(data)
    }).
    catch(err => console.log(err))
  }, [])
  
  function handleUpdateUser(data) {
    api.patchUserInfo(data).
    then(data => setCurrentUser(data)).
    then(closeAllPopups()).
    catch(err => console.log(err));
  }
  
  function handleUpdateAvatar(data){
    api.patchUserAvatar(data).
    then(data => setCurrentUser(data)).
    then(closeAllPopups()).
    catch(err => console.log(err));
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
     api.changeLikeCardStatus(card._id, isLiked).
       then((newCard) => {
       setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
       }).
       catch(err => console.log(err));
  }
  
  function handleCardDelete(card) {
    api.deleteCard(card._id).
      then(
      setCards((state) => state.filter((item) => item._id !== card._id))
      ).
      catch(err => console.log(err));
  }
  
  function handleAddImageSubmit(data){
    api.postNewCard(data).
      then(newCard => setCards([newCard, ...cards])).
      then(closeAllPopups()).
      catch(err => console.log(err))
  }
  
  function handleRegister(data){
    auth.register(data).
      then(
        data =>{
          setIsRegisterSucces(true);
          setIsInfoTooltipOpen(true);
          history.push('sign-in');
        },
        err =>{
          console.log(err);
          setIsRegisterSucces(false);
          setIsInfoTooltipOpen(true);
        }
      )
  }
  
  function handleLogin(data){
    auth.login(data).
      then(
        res =>{
          localStorage.setItem('jwt', res.token);
          setEmail(data.email);
          setLoggedIn(true);
          history.push('/')
        },
        err=>{
          setIsRegisterSucces(false);
          setIsInfoTooltipOpen(true);
        }
      )
  }
  
  function handleSignOut(){
    localStorage.removeItem('jwt');
    setEmail(null);
    setLoggedIn(false);
    history.push('sign-in');
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header 
          loggedIn={loggedIn}
          email={email}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister} 
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <ProtectedRoute 
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch> 
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <AddImagePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups} 
          onAddImage={handleAddImageSubmit}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSucces={isRegisterSucces}
          onClose={closeAllPopups} 
        />
        <DeletePopup />
        <Footer />
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
