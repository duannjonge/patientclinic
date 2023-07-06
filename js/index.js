let events = [];
let feedBack = [];
let medicine = [];

// Make sure DOM is loaded before fetching content
document.addEventListener('DOMContentLoaded', async () => {
  // Store fetched data
  const response = await getPatientDetails();
  const medFeedBack = await getMedicinedetails();
  // Save the response into events variable
  events = response;
  medicine = medFeedBack;

  toCapturePatientDits();
  loadMedicine();
});

// Function to fetch patient data
function getPatientDetails() {
  return fetch('http://localhost:3000/Details')
    .then((response) => response.json())
    .then((data) => data);
}

// Function to capture patient details
function toCapturePatientDits() {
  const latestEvent = events[events.length - 1]; // Get the most recent event from the array

  // Welcome message
  const welcomeValue = document.querySelector(".card-body");
  const welcomeTag = document.createElement("p");
  welcomeTag.textContent = `Welcome: ${latestEvent.Username}`;

  const titleName = document.querySelector(".card-title");
  titleName.textContent = `Name: ${latestEvent.Username}`;
  const picImage = document.querySelector("img");
  picImage.setAttribute("src", "./assets/avatar.png");
  const userPhone = document.createElement("p");
  userPhone.textContent = `Tel: ${latestEvent.telephone}`;
  titleName.appendChild(userPhone);
  const userEmail = document.createElement("p");
  userEmail.textContent = `Email: ${latestEvent.email}`;
  titleName.appendChild(userEmail);

  welcomeValue.insertBefore(welcomeTag, titleName);
}

// Function to fetch medicine data
async function getMedicinedetails() {
  const response = await fetch('http://localhost:3000/medicine');
  const data = await response.json();
  return data;
}

// Function to load medicine data and render HTML
function loadMedicine() {
  // Get medicine and render the HTML
  medicine.forEach((medicines) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="medicines-image">
        <img src="assets/meds.png" alt="medicine thumbnail">
      </td>
      <td class="medicines-title">${medicines.title}</td>
      <td class="medicines-type">${medicines.type}</td>
      <td class="medicines-price">${medicines.price}</td>
      <td class="medicines-description">${medicines.description}</td>
      <td class="medicines-date">${medicines.date}</td>
    `;
    document.querySelector("#page-home tbody").appendChild(tr);
  });
}

// Rest of your code...
