


let table = document.getElementById("div-table");
let table2 = document.getElementById("div-table2");
let col1 = document.getElementById("col1");
let col2 = document.getElementById("col2");
let col3 = document.getElementById("col3");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(data => data.json())
  .then(res => {
    const dataEvents = res;
    const filteredDates = filterByDatePast(dataEvents.events, dataEvents.currentDate);
    const filterUp = filterByDateUp(dataEvents.events, dataEvents.currentDate);

    const sortedDates = filteredDates.sort((a, b) => percentage(a.assistance, a.capacity) - percentage(b.assistance, b.capacity));
    const highestPercentage = sortedDates[sortedDates.length - 1];
    const resultHighest = percentage(highestPercentage.assistance, highestPercentage.capacity);
    const lowestPercentage = sortedDates[0];
    const resultLowest = percentage(lowestPercentage.assistance, lowestPercentage.capacity);

    col1.textContent = `${highestPercentage.name} % ${resultHighest.toFixed(2)}`;
    col2.textContent = `${lowestPercentage.name} % ${resultLowest.toFixed(2)}`;
    col3.textContent = `${filterUp[filterUp.length - 1].name} : ${filterUp[filterUp.length - 1].capacity}`;

    let categories = dataEvents.events.map((e) => e.category);
    let noRepeatCategories = [...new Set(categories)];

    let totalAssistance = {};
    let totalRevenues = {};

    filteredDates.forEach(event => {
      const { capacity, assistance, category, price } = event;
      const assistancePercentage = (assistance * 100) / capacity;
      const categoryRevenue = assistance * price;

    if (!totalAssistance[category]) {
      totalAssistance[category] = {
        category: category,
        percentage: assistancePercentage,
        assistanceCount: 1,
        revenue: categoryRevenue
      };
      totalRevenues[category] = categoryRevenue;
    } else {
      totalRevenues[category] += categoryRevenue;
      totalAssistance[category].assistanceCount++;
      totalAssistance[category].percentage += assistancePercentage;
    }});

    let totalEstimate = {};
    let totalRevenuesUp = {};

    filterUp.forEach(event => {
      const { capacity, estimate, category, price } = event;
      const estimatePercentage = (estimate / capacity) * 100;
      const categoryRevenueUp = estimate * price;

      if (!totalEstimate[category]) {
        totalEstimate[category] = {
          category: category,
          percentage: estimatePercentage,
          estimateCount: 1,
          revenue: categoryRevenueUp
        };
        totalRevenuesUp[category] = categoryRevenueUp;
      } else {
        totalEstimate[category].percentage += estimatePercentage;
        totalEstimate[category].estimateCount++;
        totalRevenuesUp[category] += categoryRevenueUp;
      }
    });

    showTable(table, totalRevenuesUp, totalEstimate);
    showTable2(table2, totalRevenues, totalAssistance);
  })
  .catch(error => console.log(error));

function showTable(ubication, revenue, estimate) {
  let template = `
    <table class="table table-bordered bg-dark text-light">
      <thead>
        <tr>
          <th colspan="4">Category</th>
          <th colspan="4">Revenue</th>
          <th colspan="4">Percentage of Attendance</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(estimate).map((item) => `
          <tr>
            <td colspan="4">${item.category}</td>
            <td colspan="4">$ ${revenue[item.category]}</td>
            <td colspan="4">${(item.percentage / item.estimateCount).toFixed(2)} %</td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
  ubication.innerHTML = template;
}

function showTable2(ubication, revenue, assistance) {
  let template = `
    <table class="table table-bordered bg-dark text-light">
      <thead>
        <tr>
          <th colspan="4">Category</th>
          <th colspan="4">Revenue</th>
          <th colspan="4">Percentage of Attendance</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(assistance).map((item) => `
          <tr>
            <td colspan="4">${item.category}</td>
            <td colspan="4">$ ${revenue[item.category]}</td>
            <td colspan="4">${(item.percentage / item.assistanceCount).toFixed(2)} %</td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
  ubication.innerHTML = template;
}

function filterByDatePast(eventsDate, todayDate) {
  return eventsDate.filter(dateObject => dateObject.date <= todayDate);
}

function filterByDateUp(eventsDate, todayDate) {
  return eventsDate.filter(dateObject => dateObject.date >= todayDate);
}

function percentage(assistance, capacity) {
  return (assistance / capacity) * 100;
}

