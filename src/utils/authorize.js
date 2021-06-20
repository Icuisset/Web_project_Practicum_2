class Authorize {
    constructor({
      baseUrl,
      headers
    }) {
      this._baseUrl = baseUrl
      this._headers = headers
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json()
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`)
    }
  
  
    //POST https://around.nomoreparties.co/signup
    register(email,password) {
      return fetch(this._baseUrl + '/signup', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            email: email,
            password: password,
          }),
      }).then((res) => this._checkResponse(res))
    }
}
  
    
  
  const authorize = new Authorize({
    baseUrl: 'https://register.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  export default authorize;


