import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


const Card = (props) => {
  const {
    card,
    onCardClick,
    onCardLike,
    onCardDelete
  } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
  ); 
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  ); 
   

  function handleClick() {
    onCardClick(card);
  } 
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);
  
  
  return (
    <article className="card">
      <button className = {cardDeleteButtonClassName}
              onClick = {handleDeleteClick}
      ></button>
      <img className="card__image" src={card.link} alt={card.name}
      onClick={handleClick}
      />
      <div className="card__discription">
          <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>    
      </div>
    </article>
  );
}

export default Card;