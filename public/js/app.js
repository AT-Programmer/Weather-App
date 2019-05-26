const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const MessageOne = document.getElementById('message-1')
const MessageTwo = document.getElementById('message-2')

MessageOne.textContent = ''
weatherForm.addEventListener('submit',(e) => {
  e.preventDefault()

  const location = search.value

  MessageOne.textContent = 'Loading...'
  MessageTwo.textContent = ''

  fetch('/weather?address=' + location)
  .then(res => {
    res.json().then(data => {
      if(data.error){
        MessageOne.textContent = data.error;
      } else {
        MessageOne.textContent = data.location
        MessageTwo.textContent = data.forecast
      }
    })
  })
})
