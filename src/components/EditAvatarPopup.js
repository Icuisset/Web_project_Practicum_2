import React, { createRef } from "react";
import UserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(avatarInput.current.value);
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  };
  return (
    <PopupWithForm
      popupName='newAvatar'
      title='Change profile picture'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        id='newAvatarLink'
        type='url'
        className='popup__input popup__input_value_newAvatarLink'
        placeholder='Image link'
        name='avatarLink'
        ref={avatarInput}
        required
      />
      <span id='newAvatarLink-error' className='popup__error' />
      <button
        type='submit'
        className='popup__button saveAvatar-button'
        aria-label='save Avatar button'
        onClick={handleSubmit}>
        Save
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
