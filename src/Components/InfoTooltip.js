import SuccessCurcleIcon from '../images/SuccessCurcleIcon.svg';
import FailCurcleIcon from '../images/FailCurcleIcon.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_info-tooltip ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_info-tooltip">
                <img className='popup__success-icon' src={props.isSuccess ? SuccessCurcleIcon : FailCurcleIcon} />
                <p className="popup__title popup__title_type_info-tooltip">{props.isSuccess ? 'Вы успешно зарегистрировались!' : ['Что-то пошло не так!', <br />, 'Попробуйте ещё раз.']}</p>
                <button className={`popup__close popup__close_type_info-tooltip`} type="button" onClick={props.onClose}></button>
            </div>
        </div >
    )
}

export default InfoTooltip;