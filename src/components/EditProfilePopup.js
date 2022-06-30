import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


const EditProfilePopup = (props) => {
  const {
    isOpen,
    onClose,
    onUpdateUser 
  } = props;
  
  const currentUser = React.useContext(CurrentUserContext);
  
  const [name, setName] = useState("");
  
  const [description, setDescription] = useState("");
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 
  
  function handleNameChange(e) {
    setName(e.target.value);
  }
  
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 
  
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
       <input 
         className="popup__input popup__input_text_name" 
         id="name-input" 
         name="name" 
         type="text" 
         placeholder="Имя"
         value={name || ""}
         onChange={handleNameChange}
         minLength="2" 
         maxLength="40" 
         required 
       />
       <span className="popup__input-error name-input-error"></span>
       <input 
         className="popup__input popup__input_text_discription" 
         id="discription-input" 
         name="about" 
         type="text" 
         placeholder="Описание"
         value={description || ""}
         onChange={handleDescriptionChange}
         minLength="2" 
         maxLength="200" 
         required
       />
       <span className="popup__input-error discription-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;