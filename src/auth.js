export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
              <input type="email" id="email" required />
              <label id="email">email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required />
            <label id="password">Пароль</label>
          </div>
            <button type="submit" class="mui-btn mui-btn--primary" >Войти</button>
          </form>
    `;
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyA7sW0R0vxCIserVrBcax49Sy43b0c5_h8';
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'Post',
    body: JSON.stringify({email, password, returnSecureToken: true}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data.idToken);
}
