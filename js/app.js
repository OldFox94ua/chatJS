/*{
    "id": 1,
    "phone": "+63 (924) 979-2252",
    "name": "Guss Marvelley",
    "message": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
    "date": 1609595510000,
    "seen": false
  }*/
let USERS = JSON.parse(DATA)
const chatListEl = document.getElementById('chatList')
const infoChatEl = document.getElementById('infoChat')
const massegeEl = document.getElementById('massege')
const dontReadMassegeEl = document.getElementById('dontReadMassege')


allMassege(USERS, massegeEl)
function allMassege(obj, insert) {
  numberOfMessages = 0
  let numberOfMessages = Object.keys(obj).length
  insert.insertAdjacentHTML(numberOfMessages)
}





const dateFormatter = new Intl.DateTimeFormat()
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit'
})




//render chat
renderChat(USERS, chatListEl)

function renderChat(dataArray, DOMelement) {
  dataArray.forEach(user => {
    let html = createChat(user)
    DOMelement.insertAdjacentHTML('beforeEnd', html)
  });
}

function createChat(data) {
  return `
  <div class="chatItems mb-1" style="max-width: 100% ">
  <div class="row">
    <div class="col-1">
      <img  src="${data.avatar}" class="chatImg" width="1" height="1" loading="lazy" alt="logo">
    </div>
    <div class="col-2">
      <div class="phoneName">
        <h6 class="name">${data.name}</h6>
        <a href="tel:" class="numberPhone">${data.phone}</a>
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
 



//animation scroll
const boxes = document.querySelectorAll('.chatItems')


window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}


 


