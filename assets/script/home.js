let section = document.getElementById("section")

function cards(content) {
    return `<section id="section" class="card m-5 m-sm-4 m-md-3" style="width: 22rem;">
    <img src=${content.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${content.name}</h5>
      <p class="card-text">${content.description}</p>
    </div>
    <div class="card-body d-flex justify-content-between">
      <p>price: $ ${content.price}</p>
      <a href="./assets/pages/details.html" class="card-link">See more</a>
    </div>
  </section>`
}

function contentDom(cardList, ubication) {
    let template = ""
    for (const elements of cardList) {
        template += cards(elements)
    }
    ubication.innerHTML += template
}
contentDom(data.events, section) 