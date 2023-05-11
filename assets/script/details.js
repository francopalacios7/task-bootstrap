/* document.title = `Details of ${events.nombre}` */

let params = new URLSearchParams (location.search)
console.log(params.get('id'));
console.log(params.get('name'));

let arrayEvents = data.events

let detailsUbication = document.getElementById("details-main")

let paramsId = params.get('id')

let id = arrayEvents.find((e) => e._id == paramsId);
console.log(id);

function showDetails(content) {
    console.log(content);
   return detailsUbication.innerHTML = ` <main class="d-flex flex-column m-3 text-light d-lg-flex flex-md-row justify-content-md-center align-items-md-center bg-dark m-md-3">
    <img class="w-books" src="${content.image}">
    <section>
        <h2>Name: ${content.name}</h2>
        <p>Date: ${content.date}</p>
        <p>Description: ${content.description}</p>
        <p>Category: ${content.category}</p>
        <p>Place: ${content.place}</p>
        <p>Capacity: ${content.capacity}</p>
        <p> ${content.assistance ? `<p>Assistance: ${content.assistance}</p>` : `<p>Estimate: ${content.estimate}</p>`}</p>
        <p>Price: ${content.price}</p>
    </section>
    
    </main>` 
    
}

showDetails(id)
