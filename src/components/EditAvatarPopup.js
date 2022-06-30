import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) => {
  const {
    isOpen,
    onClose,
    onUpdateAvatar,
  } = props;
  const inputRef = React.useRef('');
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  
  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]); 
  
  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__input popup__input_avatar_link" 
        id="avatar-input" 
        type="url" 
        name="avatar" 
        placeholder="Ссылка на аватар" 
        required 
        ref={inputRef}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;