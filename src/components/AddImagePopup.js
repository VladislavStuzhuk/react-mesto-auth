import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

const AddImagePopup = (props) => {
  const {
    isOpen,
    onClose,
    onAddImage
  } = props;
  
  const nameRef = React.useRef('');
  const linkRef = React.useRef('');
  
  function handleSubmit(e) {
    e.preventDefault();
    onAddImage({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }
  
  useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen]);
  
  return (
       <PopupWithForm
          name="place"
          title="Новое место"
          textButton="Создать"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
      >
          <input 
            className="popup__input popup__input_img_name" 
            id="img-name-input" 
            name="name" 
            type="text" 
            placeholder="Название"
            ref={nameRef} 
            minLength="2" 
            maxLength="30" 
            required 
          />
          <span className="popup__input-error img-name-input-error"></span>
          <input 
            className="popup__input popup__input_img_link" 
            id="url-input" 
            type="url" 
            name="link" 
            placeholder="Ссылка на картинку"
            ref={linkRef}   
            maxLength="300" 
            required 
          />
          <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddImagePopup;