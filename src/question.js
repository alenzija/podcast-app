export class Question {
  static create(question) {
    return fetch('https://podcast--app-aaf03-default-rtdb.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      'Content-Type': 'application/json',
    })
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name;
        return question;
      })
      .then(addLocalStorage)
      .then(Question.renderList);
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">У вас нет токена</p>');
    }
    return fetch(`https://podcast--app-aaf03-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }
        return response ? Object.keys(response).map((key) => ({...response[key], id: key})) : [];
      });
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();
    const html = questions.length ? questions.map(toCard).join('') : '<div class="mui--text-black-54">У вас нет вопросов</div>';
    const list = document.querySelector('#list');
    list.innerHTML = html;
  }

  static listToHTML(questions) {
    return questions.length ? `<ol>${questions.map((q) => `<li>${q.text}</li>`).join('')}</ol>` : '<p>Вопросов нет</p>';
  }
}
function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]');
}

function addLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  console.log(all);
  all.push(question);
  localStorage.setItem('questions', JSON.stringify(all));
}

function toCard(question) {
  return `
    <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>
 ${question.text}
    </div>    
    <br>
    <br>
    `;
}
