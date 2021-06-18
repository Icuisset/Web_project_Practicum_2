import React, { useState, useEffect } from "react";
import UserContext from "../contexts/CurrentUserContext";
import { Switch, Route, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import SignIn from "./SignIn";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  /**
   * initial call to api to get user information
   */

  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        console.log(result);
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * initial call to api to get all cards from api
   */

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
   * handle all general click actions
   */

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = ({ name, link }) => {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  };

  /**
   * handle the closing of all popups
   */

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    console.log("popup closed");
  };

  /**
   * handle updates to the api after collecting inputs from form popups
   */

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo(name, about)
      .then((result) => {
        console.log(result);
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .editUserAvatar(avatar)
      .then((result) => {
        console.log(result);
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = ({ title, link }) => {
    console.log(title, link);
    api
      .postNewCard(title, link)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * handle updates to the api after actions on cards
   */

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked === false) {
      api
        .addCardLike(card._id)
        .then((newCard) => {
          console.log(newCard);
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .removeCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((result) => {
        console.log(result);
        const newCards = cards.filter((c) => c._id !== card._id);
        console.log(newCards);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/signin'>
          <div className='page'>
            <Header></Header>
            <SignIn></SignIn>
            <Footer></Footer>
          </div>
        </Route>
        <Route path='/signup'>
          <div className='page'>
            <Header></Header>
            <Register></Register>
            <Footer></Footer>
          </div>
        </Route>
        <Route exact path='/'>
          <div className='page'>
            <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <PopupWithForm popupName='confirmDelete' title='Are you sure?'>
              <button
                type='button'
                className='popup__button confirm-button'
                aria-label='confirm delete button'>
                Yes
              </button>
            </PopupWithForm>

            <ImagePopup
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
            />
          </div>
        </Route>
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
