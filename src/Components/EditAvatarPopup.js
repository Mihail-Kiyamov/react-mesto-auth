import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(avatarRef.current.value);
    }

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='change-avatar'
            title='Обновить аватар'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <label className="popup__form-field">
                        <input className="popup__input popup__input_type_avatar-src" type="url" ref={avatarRef} id="avatar-src-input"
                            name="avatarSrc" placeholder="Ссылка на картинку" required />
                        <span className="popup__input-error avatar-src-input-error"></span>
                    </label>
                </>}>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;