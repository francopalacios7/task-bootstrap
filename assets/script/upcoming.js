let section = document.getElementById("upcoming-section")
let dataEvents
let searchBar = document.getElementById("search-bar")
let inputs = document.getElementsByClassName("form-check-input")
let sectionCheck = document.getElementById("section-check")
let filterDatesResult =

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(data => data.json())
  .then(res => {
    dataEvents = res;
    let noRepeatChecks = dataEvents.events.map(e => e.category);
    let filterChecks = new Set(noRepeatChecks);
    let arrayCategorias = Array.from(filterChecks);
    showChecks(arrayCategorias, sectionCheck);
    filterDatesResult = filterByDate(dataEvents.events, dataEvents.currentDate)
    showCards(filterDatesResult, section);
    cards(filterDatesResult)
  })

  .catch(error => console.log(error));


function cards(card) {
  let div = document.createElement('div')
  div.innerHTML = `<section id="section" class="card m-5 m-sm-4 m-md-2" style="width: 22rem;">
                    <img src=${card.image} class="card-img-top object-fit-cover " alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${card.name}</h5>
                      <p class="card-text">${card.description}</p>
                    </div>
                    <div class="card-body d-flex justify-content-between">
                      <p>price: $ ${card.price}</p>
                      <a href="./details.html?id=${card._id}" class="card-link">See more</a>
                    </div>
                  </section>`

  return div
}

function filterByDate(eventsDate, todayDate) {
  const filterDates = []
  for (const dateObject of eventsDate) {
      if (dateObject.date >= todayDate) {
          filterDates.push(dateObject)
      }
  }
  console.log(filterDates);
  return filterDates
}




function showCards(newCards, ubication) {
  let fragment = document.createDocumentFragment()
  newCards.forEach(card => fragment.appendChild(cards(card)))
  ubication.appendChild(fragment)
}


/*                                                            checkbox */

function checkDom(checks) {
  let div = document.createElement('div')
  div.innerHTML = `<div class="checkbox">
                    <input type="checkbox" name="${checks}" value="${checks}" id="c" />
                    <label class="text-light" for="${checks}">${checks}</label>
                  </div>`

  return div
}


function showChecks(newChecks, ubication) {
  ubication.innerHTML = ''
  let fragment = document.createDocumentFragment()
  newChecks.forEach(checks => fragment.appendChild(checkDom(checks)))
  ubication.appendChild(fragment)
}


function filter() {
  section.innerHTML = ''
  let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
  let filterBySearchResult = filterBySearch(filterDatesResult, searchBar.value)
  let aux = filterChecks3(filterBySearchResult, checked)
  
  if (aux.length === 0) {
    section.innerHTML = `<h2 class="text-light"> No matches in the search </h2>`
  }else{
    showCards(aux, section)
  }
}


function filterChecks3(data, categories) {
  if (categories.length === 0) {
    return data
  } else {
    return data.filter((e) => categories.includes(e.category))
  }
}


function filterBySearch(events, search) {
  return events.filter(title => title.name.toLowerCase().includes(search.toLowerCase()))
}



sectionCheck.addEventListener('change', () => {
  filter()

})


searchBar.addEventListener('input', () => {
  filter()
})


