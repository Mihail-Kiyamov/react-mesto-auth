function ImagePopup(props) {
    return(
        <div className={`popup popup_type_show-image ${Object.entries(props.card).length && 'popup_opened'}`}>
          <div className="popup__image-container">
            <img className="popup__image"
              src={props.card.link} alt={props.card.name} />
            <p className="popup__image-name">{props.card.name}</p>
            <button className="popup__close popup__close_type_show-image" type="button" onClick={props.onClose}></button>
          </div>
        </div>
    )
}

export default ImagePopup;