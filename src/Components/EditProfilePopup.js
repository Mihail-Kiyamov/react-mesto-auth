import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(() => currentUser.name ? currentUser.name : '');
        setDescription(() => currentUser.about ? currentUser.about : '');
    }, [currentUser, props.isOpen]);

    function handleNameInputChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionInputChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
          });
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
            <>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_name" type="text" value={name} onChange={handleNameInputChange} id="name-input" name="name"
                        placeholder="Ваше имя" required minLength="2" maxLength="40" />
                    <span className="popup__input-error name-input-error"></span>
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_about" type="text" value={description} onChange={handleDescriptionInputChange} id="about-input" name="about"
                        placeholder="О вас" required minLength="2" maxLength="200" />
                    <span className="popup__input-error about-input-error"></span>
                </label>
            </>}
                >
        </ PopupWithForm>

            )
}

            export default EditProfilePopup;