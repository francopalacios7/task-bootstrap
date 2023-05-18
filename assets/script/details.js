/* document.title = `Details of ${events.nombre}` */



let dataEvents;

const detailsUbication = document.getElementById("details-main");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(data => data.json())
  .then(res => {
    dataEvents = res;
    const params = new URLSearchParams(location.search);
    const paramsId = params.get('id');
    const event = dataEvents.events.find(e => e._id == paramsId);
    showDetails(event);
  })
  .catch(error => console.log(error));

function showDetails(content) {
  detailsUbication.innerHTML = `
    <main class="d-flex flex-column m-3 text-light d-lg-flex flex-md-row justify-content-md-center align-items-md-center bg-dark m-md-3">
      <img class="w-books" src="${content.image}">
      <section>
        <h2>Name: ${content.name}</h2>
        <p>Date: ${content.date}</p>
        <p>Description: ${content.description}</p>
        <p>Category: ${content.category}</p>
        <p>Place: ${content.place}</p>
        <p>Capacity: ${content.capacity}</p>
        <p>${content.assistance ? `Assistance: ${content.assistance}` : `Estimate: ${content.estimate}`}</p>
        <p>Price: ${content.price}</p>
      </section>
    </main>`;
}



