let USERS = JSON.parse(DATA)
const chatListEl = document.getElementById('chatList')
const infoChatEl = document.getElementById('infoChat')
const allCountEl = document.getElementById('allCount')
const unreadCountEl = document.getElementById('unreadCount')
const refreshBtn = document.getElementById('refreshBtn')
const dateFormatter = new Intl.DateTimeFormat()
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit'
})


renderChat(USERS, chatListEl)

chatListEl.addEventListener('click', event => {
  const messageEl = event.target.closest('.chatItems')
  if (messageEl) {
    const messageId = messageEl.dataset.id
    console.log(messageId);

    USERS.forEach((message, i, array) => {
      if (message.id == messageId) {
        if (message.seen) {
          array.splice(i,1)
        } else{
          array[i].seen = true
        }
      }
    })
    renderChat(USERS, chatListEl)
  }
})



//refresh button
refreshBtn.addEventListener('click', () => {
  USERS = JSON.parse(DATA)
  renderChat(USERS, chatListEl)
})

//render chat
function renderChat(dataArray, DOMelement) {
  allCountEl.textContent = dataArray.length
  unreadCountEl.textContent = dataArray.filter(message => !message.seen).length

  dataArray.sort((a, b) => a.seen - b.seen || b.date - a.date)

  DOMelement.innerHTML = ''
  dataArray.forEach(user => {
    let html = createChat(user)
    DOMelement.insertAdjacentHTML('beforeEnd', html)
  });
}

function createChat(data) {
  return `
  <div class="chatItems mb-1 ${data.seen ? 'seen' : 'unseen'}" data-id="${data.id}">
  <div class="row">
    <div class="col-1">
      <img src="${data.avatar}" class="chatImg" width="1" height="1" loading="lazy" alt="${data.name}">
    </div>
    <div class="col-2">
      <div class="phoneName">
        <h6 class="name">${data.name}</h6>
        <a href="tel:${data.phone}" class="numberPhone">${data.phone} </a>
      </div>
    </div>
    <div class="col-6"> 
      <p class="textMassage">${data.message}</p>
    </div>
    <div class="col-1 offset-1 text-muted">
      <p class="time">${timeFormatter.format(data.date)}</p>
    </div>
    <div class="col-1 text-muted">
      <p class="date">${dateFormatter.format(data.date)}</p>
    </div>
  </div>
</div>`
}



//релізувати покліку прочитання повідомлення


//function date
function getTimeStr(dateObj = new Date()) {
  const dateFormatter = new Intl.DateTimeFormat()
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  })
  const date = `${dateFormatter.format(dateObj)}`.replaceAll('.', '-')
  const time = `${timeFormatter.format(dateObj)}`
  return `${date} ${time}`
}
 
