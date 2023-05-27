import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister(formValue.password, formValue.email);
    }

    return (
        <div className="auth__container">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__submit-form" onSubmit={handleSubmit}>
                <label className="auth__form-field">
                    <input className="auth__input auth__input_type_email" value={formValue.email} onChange={handleChange} type="text" id="email-input" name="email"
                        placeholder="Email" required />
                    <span className="auth__input-error email-input-error"></span>
                </label>
                <label className="auth__form-field">
                    <input className="auth__input auth__input_type_password" value={formValue.password} onChange={handleChange} type="password" id="password-input" name="password"
                        placeholder="Пароль" required />
                    <span className="auth__input-error password-input-error"></span>
                </label>
                <input className="auth__submit" type="submit" value="Зарегистрироваться" />
            </form>
            <NavLink to='/sign-in' className="auth__login-link">Уже Зарегистрированы? Войти</NavLink>
        </div>
    )
}

export default Register;