import React from 'react';
import {Link} from 'react-router-dom';

const Register = (props) => {
  const {
    onRegister
  } = props
  
  const EmailRef = React.useRef('');
  const PasswordRef = React.useRef('');
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    onRegister({
      "password": PasswordRef.current.value,
      "email": EmailRef.current.value, 
    })
  }
  return(
    <div className="sign">
      <p className="sign__title">Регистрация</p>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input 
          className="sign__input" 
          placeholder="Email"
          ref={EmailRef} 
        />
        <input 
          className="sign__input" 
          placeholder="Пароль"
          type="password"
          ref={PasswordRef} 
        />
        <button className="sign__submit-button">Зарегистрироваться</button>
        <Link to="/sign-in" className="sign__redirect-button">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  
  )
}

export default Register;