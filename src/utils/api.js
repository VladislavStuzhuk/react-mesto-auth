class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  
 _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleResponse)
  }
  patchUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse)
  }
  patchUserAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._handleResponse)  
  }
  postNewCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse);
  }
  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method :'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse);
  }
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
      .then(this._handleResponse)
  }

}
const api = new Api({
  baseUrl: 'https://api.vlad.talant.nomoredomains.sbs/',
  headers: {
    authorization: '3be77505-74d7-4be6-abbc-19e7c1c00c0e',
    'Content-Type': 'application/json'
  }
});
export default api;