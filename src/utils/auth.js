export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => res.json())
        .catch((err) => console.log(err));
};

export function authorize(password, email) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res => res.json()))
        .then((data) => {
            if (data) {
                localStorage.setItem('token', data.token);
                console.log(data)
                return data;
            }
        })
        .catch(err => console.log(err))
};

export function checkToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(res => res.data)
        .catch(err => console.log(err))
}