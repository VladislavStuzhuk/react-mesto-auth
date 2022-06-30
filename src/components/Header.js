import React from 'react';
import logo from '../images/logo/header-logo.svg';
import { useLocation, Route, Link} from 'react-router-dom';
function Header(props) {
  const{
    loggedIn,
    email,
    onSignOut
  } = props
  const location = useLocation();
  
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
     <div className="header__container">
        {!loggedIn ? 
          <>
            <Route path="/sign-up">
              <Link className="header__redirect" to="/sign-in"> 
                Войти 
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link className="header__redirect" to="/sign-up"> 
                Регистрация 
              </Link>
            </Route>
          </>
          :
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