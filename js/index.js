let events = [];

// Make sure DOM is loaded before fetching content
document.addEventListener('DOMContentLoaded', async () => {
  // Store fetched data
  const response = await getPatientDetails();
  // Save the response into events variable
  events = response;
  console.log(events);
  toCapturePatientDits(events);
});

// Function to fetch data
function getPatientDetails() {
  return fetch('http://localhost:3000/Details')
    .then((response) => response.json())
    .then((data) => data);
}

function toCapturePatientDits(events) {
  events.forEach((contentDetails) => {
    const titleName = document.querySelector(".card-title");
    titleName.textContent = `Name: ${contentDetails.Username}`;
    const picImage = document.querySelector("img");
    picImage.setAttribute("src","./assets/avatar.png");
    const userPhone = document.createElement("p");
    userPhone.textContent = `Tel: ${contentDetails.telephone}`;
    titleName.appendChild(userPhone);
    const userLocation = document.createElement("p");
    userLocation.textContent = `Email: ${contentDetails.email}`;
    titleName.appendChild(userLocation);
  });

  // Welcome message
  const welcomeMessage = document.querySelector("#getForm");
  welcomeMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    const captureInput = e.target.children[3].value;
  });

  const welcomeValue = document.querySelector(".card-body");
  const welcomeTag = document.createElement("p");
  welcomeTag.textContent = `${welcomeMessage}`;
  welcomeValue.appendChild(welcomeTag);
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

  // Capture location data
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

  fetch('http://localhost:3000/Details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Store in Local Storage with the first part being the id
  // localStorage.setItem("data",JSON.stringify(data));
  // const url = window.location.href.replace("index.html", "home.html");
  // window.location.href = url;
});
