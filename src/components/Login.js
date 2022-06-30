import React from 'react';

const Login = (props) => {
  const {
    onLogin
  } = props;
  
  const EmailRef = React.useRef('');
  const PasswordRef = React.useRef('');
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    onLogin({
      "password": PasswordRef.current.value,
      "email": EmailRef.current.value, 
    })
  }
  
  return(
    <div className="sign">
      <p className="sign__title">Вход</p>
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
        <button className="sign__submit-button">Войти</button>
      </form>
    </div>
  
  )
}

export default Login;