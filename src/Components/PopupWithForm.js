function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
          <div className="popup__container">
            <h2 className="popup__title">{props.title}</h2>
            <form className={`popup__submit-form popup__submit-form_type_${props.name}`} onSubmit={props.onSubmit} name={`${props.name}-form`}>
                {props.children}
              <input className="popup__submit" type="submit" value="Сохранить" />
            </form>
            <button className={`popup__close popup__close_type_${props.name}`} type="button" onClick={props.onClose}></button>
          </div>
        </div>
    )
}

export default PopupWithForm;