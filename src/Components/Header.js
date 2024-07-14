import logo from "../images/logo.svg";
import menuLine from "../images/MenuLine.svg";
import closeIcon from "../images/CloseIcon.svg";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../Context/CurrentUserContext";

function Header({
  isLoggedIn,
  onExit,
  isMobile,
  onMobileMenuClick,
  isMobileMenuOpen,
}) {
  const location = useLocation();
  const user = useContext(CurrentUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Mesto" />

      {!isLoggedIn && !isMobile && (
        <NavLink
          to={location.pathname === "/signin" ? "/signup" : "/signin"}
          className="header__auth-link"
        >
          {location.pathname === "/signin" ? "Регистрация" : "Войти"}
        </NavLink>
      )}

      {isLoggedIn && !isMobile && (
        <>
          <p className="header__email">{user.email}</p>
          <button className="header__account-exit" onClick={onExit} type="text">
            Выйти
          </button>
        </>
      )}

      {isLoggedIn && isMobile && (
        <button
          className="header__mobile-menu"
          type="button"
          onClick={onMobileMenuClick}
        >
          {isMobileMenuOpen ? (
            <img className="header__mobile-menu-close" src={closeIcon} />
          ) : (
            <>
              <img className="header__menu-line" src={menuLine} />
              <img className="header__menu-line" src={menuLine} />
              <img className="header__menu-line" src={menuLine} />
            </>
          )}
        </button>
      )}
    </header>
  );
}

export default Header;
