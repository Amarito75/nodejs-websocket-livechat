const main = document.querySelector('main')



/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const myPseudo = localStorage.getItem('myPseudo')
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  // <div class="message"></div>
  if(myPseudo === data.pseudo)
  {
    msgEl.classList.add('my-message')
  }
  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo
  // <span>Hugo</span>
  msgEl.append(pseudoSpan)

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  // <p>Hello world</p>
  msgEl.append(bodyP)

  const date = document.createElement('p')
  date.textContent = data.date // string retransform en date 
  // <p>Hello world</p>
  msgEl.append(date)

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
  console.log(myPseudo)
}
