const main = document.querySelector('main')
// const message = document.querySelector('message')
// const myMessage = document.querySelector('my-message')

const emojies = [
  '🤣',
  '👍',
  '👎',
  '❤️',
]

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const myPseudo = localStorage.getItem('myPseudo')

  const containerMessage = document.createElement('div')
  containerMessage.classList.add('container-message')
  main.append(containerMessage)

  const plusDiv = document.createElement('div')
  plusDiv.classList.add('plus-div')

  const plus = document.createElement('div')
  plus.textContent = '+'
  plusDiv.append(plus)

  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  if(myPseudo === data.pseudo)
  {
    msgEl.classList.remove('message')
    msgEl.classList.add('my-message')
  }

  if(msgEl.classList.contains('message'))
  {
    containerMessage.classList.add('left')
  }
  else if(msgEl.classList.contains('my-message'))
  {
    containerMessage.classList.add('right')
  }

  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo
  msgEl.append(pseudoSpan)

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  msgEl.append(bodyP)

  const date = document.createElement('div')
  date.classList.add('date')
  date.textContent = data.date
  msgEl.append(date)

  containerMessage?.appendChild(msgEl)
  containerMessage?.append(plusDiv)
  containerMessage.classList.contains('right') ? containerMessage.style.justifyContent = 'flex-end' : containerMessage.style.justifyContent = 'flex-start'
  containerMessage?.scrollTo(0, main.scrollHeight)

  plusDiv.addEventListener('mouseenter',() => {
    plusDiv.style.background = 'black'
  })

  plusDiv.addEventListener('mouseleave',() => {
    plusDiv.style.background = '#e6e6e6'
  })

  let click = false

  plusDiv.addEventListener('click',() => {

    click = !click

    if(click === true) {
      const emojiContainer = document.createElement('div')
      emojiContainer.classList.add('emoji-cont')
      containerMessage.append(emojiContainer)
      emojies.forEach((value, key) => {
        const emojiDiv = document.createElement('div')
        emojiContainer.append(emojiDiv)
        emojiDiv.classList.add('emoji-div'+(key+1))
        emojiDiv.textContent = value
        emojiDiv.style.cursor = 'pointer'
        emojiDiv.addEventListener('click', () => {
          const emojiClicked = document.querySelector(`.emoji-div${key+1}`)
          containerMessage.append(emojiClicked)
          const div = document.querySelector('.emoji-cont')
          div.classList.remove('emoji-cont')
          div.textContent = ''
        })
      })
    } else if(click === false){
      emojies.forEach((value, key) => {
        const div = document.querySelector('.emoji-cont')
        div.classList.remove('emoji-cont')
        div.textContent = ''
      })
    }
  })

}
