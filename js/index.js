let events = [];
let feedBack=[];
let medicine=[];

// Make sure DOM is loaded before fetching content
document.addEventListener('DOMContentLoaded', async () => {
  // Store fetched data
  const response = await getPatientDetails();
  const medFeedBack = await getMedicinedetails();
  // Save the response into events variable
  events = response;
  medicine=medFeedBack;
  

  toCapturePatientDits();
  loadMedicine();
});

// Function to fetch data
function getPatientDetails() {
  return fetch('http://localhost:3000/Details')
    .then((response) => response.json())
    .then((data) => data);
}

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




// Post data
document.querySelector(".frm").addEventListener('submit', function (event) {
  event.preventDefault();
  // Convert to JavaScript form
  const frm = new FormData(this);
  // console.log(frm.values());
  const data = {
    "Username": frm.get("Username"),
    "email": frm.get("email"),
    "telephone": frm.get("telephone"),
  };

  fetch('http://localhost:3000/Details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

    // Capture location data
    function captureLocation(){

      let locationBox = document.querySelector("#location");
      let userLocation = {
        latitude: "unknown",
        longitude: "unknown",
      };
      window.navigator.geolocation.getCurrentPosition(
        function (position) {
          userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          locationBox.value = JSON.stringify(userLocation);
        },
        function (error) {
          locationBox.value = JSON.stringify(userLocation);
        }
      );
  
  
    }

  // Store in Local Storage with the first part being the id
  // localStorage.setItem("data",JSON.stringify(data));
  // const url = window.location.href.replace("index.html", "home.html");
  // window.location.href = url;
});

//Deal with doctor comments


//function to display medicine
async function getMedicinedetails() {
  const response = await fetch('http://localhost:3000/medicine');
  const data = await response.json();
  return data;
}

function loadMedicine() {
  // get Medicine and render the HTML
  medicine.forEach(medicines => {
    const tr=document.createElement("tr");
    tr.innerHTML =`
    <td class="medicines-image">
    <img src="assets/${medicines.image}.png" alt="medicine thumbnail">
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