import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MobileMenu from './MobileMenu';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../Context/CurrentUserContext';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => { handleTokenCheck() })
      .catch((err) => {
        console.log(err);
      });

    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    const handleResizeWindow = () => {
      setIsMobile(() => 640 >= window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [])

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(currentUser => ({
            ...currentUser,
            email: res.email
          }));
          navigate("/", { replace: true })
        }
      });
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleOpenInfoTooltip(successStatus) {
    console.log(successStatus);
    setIsInfoTooltipSuccess(successStatus);
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(info) {
    api.changeProfile(info)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(src) {
    api.changeAvatar(src)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSaveCard(info) {
    api.addNewCard(info)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAccountExit() {
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
    setIsMobileMenuOpen(false);
    setLoggedIn(false);
  }

  function handleMobileMenuClick() {
    setIsMobileMenuOpen(state => !state)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <MobileMenu isOpen={isMobileMenuOpen} onExit={handleAccountExit} isMobile={isMobile} />
          <Header
            isLoggedIn={loggedIn}
            onExit={handleAccountExit}
            isMobile={isMobile}
            onMobileMenuClick={handleMobileMenuClick}
            isMobileMenuOpen={isMobileMenuOpen} />
          <Routes>
            <Route path='/' element={<ProtectedRoute element={Main} isLoggedIn={loggedIn}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
            } />
            <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
            <Route path='/sign-up' element={<Register onSubmit={handleOpenInfoTooltip} />} />
          </Routes>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSaveCard={handleSaveCard}>
        </AddPlacePopup>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}>
        </ImagePopup>
        <PopupWithForm
          name='warning'
          title='Вы уверены?'
          isOpen={false}
          onClose={closeAllPopups}>
        </PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}>
        </EditAvatarPopup>
        <InfoTooltip
          isSuccess={isInfoTooltipSuccess}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}>
        </InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
