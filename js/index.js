const cardsDetailCont = document.querySelector(".cards__detail");
const tabLapsus = document.querySelectorAll(".lapse");

let dataJsonLocal = "";

async function getDataJson() {
    try {
        const API_URL = window.location.origin;
        const req = new Request(`${API_URL}/data.json`);
        const response = await fetch(req);
        if(!response.ok) {
            throw new Error(response.status)
        }
        dataJsonLocal = await response.json();
        addNodeCard(dataJsonLocal);
    } catch(err) {
        console.error("error: " + err)
    }
}

function addNodeCard(data, lapsus="Weekly") {
    cardsDetailCont.textContent = "";
    for(let cardData of data) {
        createNodes(cardData, lapsus)
    }
}

function createNodes(data, lapsus) {
    const timeframes = data.timeframes[lapsus.toLowerCase()];
    const title = data.title;
    const tabActual = Array.from(tabLapsus).find(el => el.textContent.trim() === lapsus);
    tabActual.classList.add("lapse--active");
    cardsDetailCont.innerHTML += `
         <div class="card" data-title=${title.toLowerCase().replace(" ", "")}>
          <div class="card__data">
            <div class="card__top">
              <h2 class="card__title">${title}</h2>
              <div class="card__opt-picture">
                <img src="./images/icon-ellipsis.svg" class="card__opt-img" alt="ellipses image">
              </div>
            </div>
            <div class="card__hrs">
              <p class="card__current">${timeframes.current}hrs</p>
              <p class="card__previus">Last week - ${timeframes.previous}hrs</p>
            </div>
          </div>
        </div>
    ` 
}

function cleanActiveLapsus() {
    tabLapsus.forEach(elemento => {
        elemento.classList.remove('lapse--active');
    });
}

document.addEventListener("DOMContentLoaded", function() {
    getDataJson();
})

tabLapsus.forEach(btnLapsus => {
    btnLapsus.addEventListener("click", function(e){
        const lapsusValue = e.target.textContent;
        cleanActiveLapsus();
        addNodeCard(dataJsonLocal, lapsusValue);
    });
});


