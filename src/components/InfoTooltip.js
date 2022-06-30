import React from 'react';
import succes from '../images/succes.svg';
import failure from '../images/failure.svg';
function InfoTooltip(props) {
  const{
    isOpen,
    isSucces,
    onClose
  } = props;
  return (
    <div className={`popup popup-info ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container popup-info__container">
        <button className="popup__close-icon" type="button" onClick={onClose} />
        <img className="popup-info__img" src={isSucces ? succes : failure} alt="" />
        <h2 className="popup-info__title">
          {isSucces ?
          'Вы успешно зарегистрировались!'
          :
          'Что-то пошло не так! Пропробуйте ещё раз.'
          }
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;