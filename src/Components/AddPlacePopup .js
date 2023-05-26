import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [mestoName, setMestoName] = useState('');
    const [mestoSrc, setMestoSrc] = useState('');

    function handleMestoNameInputChange(e) {
        setMestoName(e.target.value)
    }

    function handleMestoSrcInputChange(e) {
        setMestoSrc(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onSaveCard({
            mestoName: mestoName,
            mestoSrc: mestoSrc
        });
    }

    useEffect(() => {
        setMestoName('');
        setMestoSrc('');
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='add-element'
            title='Новое место'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={<> <label className="popup__form-field">
                <input className="popup__input popup__input_type_mesto-name" value={mestoName} onChange={handleMestoNameInputChange} type="text" id="mesto-name-input"
                    name="mestoName" placeholder="Название" minLength="2" maxLength="30" required />
                <span className="popup__input-error mesto-name-input-error"></span>
            </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_mesto-src" value={mestoSrc} onChange={handleMestoSrcInputChange} type="url" id="mesto-src-input"
                        name="mestoSrc" placeholder="Ссылка на картинку" required />
                    <span className="popup__input-error mesto-src-input-error"></span>
                </label> </>}>
        </PopupWithForm>
    )
}

export default AddPlacePopup;