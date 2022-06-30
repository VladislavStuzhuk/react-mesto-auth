import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = (props) => { 
  const currentUser = React.useContext(CurrentUserContext);
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
  } = props
  
  return (
    <main className="main-content">
        <section className="profile">
          <div 
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }} 
          >
            <button className="profile__avatar-edit-button"></button>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__author">{currentUser.name}</h1>
              <button 
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button 
            className="profile__add-button"
            onClick={onAddPlace}
          ></button>  
        </section>
        <section className="elements">
          {cards.map(item => (
             <Card 
               key={item._id}
               card={item}
               onCardClick={onCardClick}
               onCardLike={onCardLike}
               onCardDelete={onCardDelete}
             />
            )
            )}
        </section>
      </main>
  );
}

export default Main;