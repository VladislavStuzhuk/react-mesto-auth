import React from 'react';

function ImagePopup(props) {
  const {
    card,
    onClose,
  } = props;
  return (
      <div className={`popup popup-image ${card && "popup_opened"}`}>
        <div className="popup-image__container">
          <button className="popup__close-icon" type="button" onClick={onClose} ></button>
          <img className="popup-image__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
          <h2 className="popup-image__discription">{card ? card.name : ''}</h2>
        </div>  
      </div>
  );
}

export default ImagePopup;