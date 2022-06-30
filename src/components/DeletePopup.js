import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup() {
  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      textButton="Да"
    />
  );
}

export default DeletePopup;