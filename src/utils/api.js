class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);

    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    changeProfile(inputs) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputs.name,
                about: inputs.about
            })
        })
            .then(this._checkResponse)
    }

    addNewCard(inputs) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputs.mestoName,
                link: inputs.mestoSrc
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        return isLiked ? this.putLike(id) : this.deleteLike(id);
    }

    changeAvatar(src) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: src
            })
        })
            .then(this._checkResponse)
    }
}

const api = new Api('https://nomoreparties.co/v1/cohort-63', {
    authorization: '65395c33-5b1a-4f62-9796-f7da5822a9af',
    'Content-Type': 'application/json'
})

export default api;