class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
      }     
    })
    .then((res) => {
      return res.json()
    })
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me` , {
      method: 'GET', 
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
      }
    })
    .then((res) => {
      return res.json()
    })
  }

  setUserAvatar(data) {

    return fetch(`${this._url}/users/me/avatar` , {
      method: 'PATCH', 
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      }) 
    })
    .then(response => response.json())
 
  }
 
  setUserInfo(data) {

    return fetch(`${this._url}/users/me` , {
      method: 'PATCH', 
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({          
        name: data.name,
        about: data.about,  
      }) 
      
    })      
    .then(response => response.json())
  }

  setLikeOnCard(data) {
    return fetch(`${this._url}/cards/likes/${data.id}`, {
      method: 'PUT',
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
      }
    })
    .then((resp) => {
      return resp.json()
    })

  }

  removeLikeOnCard(data) {
    return fetch(`${this._url}/cards/likes/${data.id}`, {
      method: 'DELETE', 
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
      }
    })
    .then((res) => {
      return res.json()
    })
  }
  

  addCards(text, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: text,
        link: link})  
    })
    .then((res) => {
      return res.json()
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data.id}`, {
      method: 'DELETE',
      headers: {
        authorization: '7193839f-c244-42ce-8d35-bd3460436d94',
        'Content-Type': 'application/json'
      }
    })
  }


    

}

export default Api