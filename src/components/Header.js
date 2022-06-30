import React from 'react';
import logo from '../images/logo/header-logo.svg';
import { useLocation, Link} from 'react-router-dom';
function Header(props) {
  const{
    loggedIn,
    email,
    onSignOut
  } = props
  const location = useLocation();
  
  let redirectLocation = "";
  let text = "";
  switch(location.pathname){
    case '/sign-up':
      redirectLocation = '/sign-in'
      text= 'Войти'
      break;
    case '/sign-in':
      redirectLocation = '/sign-up'
      text= 'Регистрация'
      break;
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
     <div className="header__container">
        {!loggedIn ? 
          <Link className="header__redirect" to={redirectLocation}>
            {text}
          </Link> :
          <>
            <p className="header__email">{email}</p>
            <button onClick={onSignOut} className="header__sign-out">Выйти</button>
          </>
        }
      </div> 
    </header>
  );
}

export default Header;