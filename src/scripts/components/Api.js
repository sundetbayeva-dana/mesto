class Api {
  constructor(config) {
    this._url = config.url;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
      }     
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${resp.status}`);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET', 
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${resp.status}`);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH', 
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      }) 
    }) 
  }
 
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH', 
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({          
        name: data.name,
        about: data.about,  
      })      
    })      
  }

  setLikeOnCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
      }
    })
  }

  removeLikeOnCard(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE', 
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
      }
    })
  }  

  addCards(text, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: text,
        link: link})  
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2',
        'Content-Type': 'application/json'
      }
    })
  }
}

export default Api