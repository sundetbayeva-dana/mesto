class Api {
  constructor(config) {
    this._url = config.url;
    this._authorization = config.authorization;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      }     
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET', 
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH', 
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      }) 
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })
  }
 
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH', 
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({          
        name: data.name,
        about: data.about,  
      })      
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })  
  }

  setLikeOnCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })
  }

  removeLikeOnCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE', 
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })
  }  

  addCards(text, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: text,
        link: link})  
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err)
    })
  }
}

export default Api