import React from 'react';

const PopupWithForm = (props) => {
  const {
    name,
    title,
    textButton,
    children,
    isOpen,
    onClose,
    onSubmit
  } = props;

  return (
    <div
      className={`popup popup-${name} ${isOpen ? "popup_opened" : ''}`}>
      <form 
        className={`popup__container popup-${name}__container`}
        onSubmit={onSubmit}
      >
          <h2 className="popup__title">{title}</h2>
          <button className="popup__close-icon" type="button"
            onClick={onClose}  
          ></button>
          {children}
          <button 
            className={`popup__submit-botton popup-${name}__submit-button`} type="submit">{textButton}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;