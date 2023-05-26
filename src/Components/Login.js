import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login({handleLogin}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formValue.email || !formValue.password){
          return;
        }

        auth.authorize(formValue.password, formValue.email)
          .then((data) => {
            if (data.token){
              setFormValue({username: '', password: ''});
              handleLogin();
              navigate('/', {replace: true});
            }
          })
          .catch(err => console.log(err));
      }

    return (
        <div className="auth__container">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__submit-form" onSubmit={handleSubmit}>
                <label className="auth__form-field">
                    <input className="auth__input auth__input_type_email" value={formValue.email} onChange={handleChange} type="text" id="email-input" name="email"
                        placeholder="Email" required />
                    <span className="auth__input-error email-input-error"></span>
                </label>
                <label className="auth__form-field">
                    <input className="auth__input auth__input_type_password" value={formValue.password} onChange={handleChange} type="password" id="password-input" name="password"
                        placeholder="Пароль" autoComplete='on' required />
                    <span className="auth__input-error password-input-error"></span>
                </label>
                <input className="auth__submit" type="submit" value="Войти" />
            </form>
        </div>
    )
}

export default Login;