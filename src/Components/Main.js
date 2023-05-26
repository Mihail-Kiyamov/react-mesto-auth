import { useContext } from 'react';
import { CurrentUserContext } from '../Context/CurrentUserContext';
import Card from './Card';

function Main(props) {
    const user = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__circle-for-image" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={user.avatar} alt="Аватар пользователя" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__about">{user.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((cardObj) => (
                <Card 
                key={cardObj._id} 
                card={cardObj} 
                onCardClick={props.onCardClick} 
                onCardLike={props.onCardLike} 
                onCardDelete={props.onCardDelete}>
                </Card>))}
            </section>
        </main>
    );
}

export default Main;