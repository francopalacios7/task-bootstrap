let section = document.getElementById("upcoming-section")

function cards(content) {
    return `<section id="section" class="card m-5 m-sm-4 m-md-3" style="width: 22rem;">
    <img src=${content.image} class="card-img-top object-fit-cover" alt="...">
    <div class="card-body">
      <h5 class="card-title">${content.name}</h5>
      <p class="card-text">${content.description}</p>
    </div>
    <div class="card-body d-flex justify-content-between">
      <p>price: $ ${content.price}</p>
      <a href="./assets/pages/details.html?id=${content._id}" class="card-link">See more</a>
    </div>
  </section>`
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


filterByDate(data.events, data.currentDate)

let filterDates = filterByDate(data.events, data.currentDate)



function contentDom(cardList, ubication) {
    let template = ""
    for (const elements of cardList) {
        template += cards(elements)
    }
    ubication.innerHTML += template
}
contentDom(filterDates, section) 



/*                                                           task 3 */


let searchBar = document.getElementById("search-bar")
let inputs = document.getElementsByClassName("form-check-input")
let sectionCheck = document.getElementById("section-check")
let noRepeatChecks = data.events.map(e => e.category)
let filterChecks = new Set(noRepeatChecks)
let arrayCategorias = Array.from(filterChecks)


/*                                                            checkbox */


function checkDom(checkList, ubication) {
  let template = "";
  for (const categoria of checkList) {
      template += `<div class="checkbox">
          <input type="checkbox" name="${categoria}" value="${categoria}" id="c" />
          <label class="text-light" for="${categoria}">${categoria}</label>
      </div>;`
  }
  
ubication.innerHTML = template;
}

checkDom(arrayCategorias, sectionCheck)  


function filterChecks3(data, categories) {
  if (categories.length === 0) {
    return data
  }else{
    return data.filter((e) => categories.includes(e.category))
  }
}

 function showScreen(filterArray, ubication) {
	if (filterArray.length === 0) {
		ubication.innerHTML = `<h2 class="text-light"> No matches in the search </h2>`;
	} else {
		const showTitles = filterArray.map((e) => cards(e)) ;
		ubication.innerHTML += showTitles;
	}
}
 
 sectionCheck.addEventListener('change',()=>{
  let checked = Array.from (document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
  let filterChecks1 = filterChecks3 (data.events, checked)
  section.innerHTML= ""
  let aux = filterBySearch(filterChecks1, searchBar.value)
  showScreen(aux, section)

}) 
/*                                            filter search */


function filterBySearch(events, search) {
  return events.filter(title => title.name.toLowerCase().includes(search.toLowerCase()))
}

searchBar.addEventListener('input', () =>{
  let checked = Array.from (document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
  let filterChecks1 = filterChecks3 (data.events, checked)
  section.innerHTML= ""
  let aux = filterBySearch(filterChecks1, searchBar.value)
  contentDom (aux, section)
	}
)