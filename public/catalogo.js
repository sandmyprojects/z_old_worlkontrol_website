let deck = new Reveal()

const container = document.querySelector('.slides')

for (let index = 0; index < 50; index++) {
    const page = index + 1
    container.innerHTML += `<section><img src="/images/Catalogo WORLKONTROL SYSTEM10241024_${page}.jpg" alt="calogo worlkontrol system ${page}"></section>`
}


deck.initialize()