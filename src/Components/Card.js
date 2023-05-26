import React from 'react';
import { CurrentUserContext } from '../Context/CurrentUserContext';

function Card(props) {
    const user = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === user._id;
    const isLiked = props.card.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <article className="element">
            <img className="element__image"
                src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <h2 className="element__name">{props.card.name}</h2>
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}><p className="element__like-button-counter">{props.card.likes.length}</p></button>
            {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick}></button>}
        </article>
    );
}

export default Card;