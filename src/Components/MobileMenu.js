import { CurrentUserContext } from '../Context/CurrentUserContext';
import { useContext } from 'react';

function MobileMenu({ isOpen, onExit, isMobile }) {
    const user = useContext(CurrentUserContext);

    return (
        isOpen && isMobile &&
        <div className='mobile-menu' >
            <p className='mobile-menu__email'>{user.email}</p>
            <button className="mobile-menu__account-exit" onClick={onExit} type="text">Выйти</button>
        </div>
    )
}

export default MobileMenu;