/**
 * @typedef {Object} Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// Helper functions
// Random picker is called to select random property from objects.
// Random Num Inlcusive is used to return a random inclusive rate/range

const randomPicker = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNumInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Return Freelancer Object with random Properties

function createFreelancer() {
  return {
    name: randomPicker(NAMES),
    occupation: randomPicker(OCCUPATIONS),
    rate: randomNumInclusive(PRICE_RANGE.min, PRICE_RANGE.max),
  };
}

// Array for the # of freelancers from NUM_FREELancers and Create function

let freelancers = Array.from({ length: NUM_FREELANCERS }, createFreelancer);

//Get the Average rate between all rates in freelancers and store it

function getAvgRate(rateList) {
  if (!rateList.length) return 0;
  const total = rateList.reduce((sum, x) => sum + x.rate, 0);
  return total / rateList.length;
}

//Store the average rate in a variable

let averageRate = getAvgRate(freelancers);

// DOM - Create a single freelancer row - (tr)

function FreeLanceRow(freelancer) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = freelancer.name;

  const tdOccupation = document.createElement("td");
  tdOccupation.textContent = freelancer.occupation;

  const tdRate = document.createElement("td");
  tdRate.textContent = `$${freelancer.rate}/hr`;

  tr.append(tdName, tdOccupation, tdRate);
  return tr;
}

// DOM - Array of Freelancers (tbody)

function FreelancerRows(lst) {
  const tbody = document.createElement("tbody");
  tbody.id = "FreelancerRows";

  lst.forEach((x) => tbody.appendChild(FreeLanceRow(x)));
  return tbody;
}

// DOM - Average Rate Element

function AverageDisplayRate(average) {
  const el = document.createElement("p");
  el.id = "AverageRate";
  el.textContent = `The average hourly rate is $${average.toFixed(2)}.`;
  return el;
}

// DOM - Render

function render() {
  const chart = document.querySelector("#chart");
  if (!chart) throw new Error("Missing #chart element in index.html");

  //DOM - Structure for #chart

  chart.innerHTML = `
<header class="header">
    <h1>Freelancer Forum</h1>
    <div id="AverageRateMount"></div>
  </header>

  <section class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Occupation</th>
          <th>Hourly Rate</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  </section>
`;

  //Mount Average Display

  const avgMount = chart.querySelector("#AverageRateMount");
  avgMount.replaceWith(AverageDisplayRate(averageRate));

  // Replace tbody with a real tbody

  chart
    .querySelector("#FreelancerRows")
    .replaceWith(FreelancerRows(freelancers));
}

render();
