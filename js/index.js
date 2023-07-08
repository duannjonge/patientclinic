let events = [];
let doctor=[];
let medicine=[];

// Make sure DOM is loaded before fetching content
document.addEventListener('DOMContentLoaded', async () => {
  // Store fetched data
  const response = await getPatientDetails();
  const medFeedBack = await getMedicinedetails();
  const prescription= await getPrescription();



  
  // Save the response into  variables
  events = response;
  medicine=medFeedBack;
  doctor=prescription;
 
  

  toCapturePatientDits();
  loadMedicine();
  toCapturePrescription(doctor);
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

  const titleName = document.querySelector("#one-card");
  titleName.textContent = `Name: ${latestEvent.Username}`;
  const picImage = document.querySelector(".picOne ");
  picImage.setAttribute("src", "assets/avatar.png");
  const userPhone = document.createElement("p");
  userPhone.textContent = `Tel: ${latestEvent.telephone}`;
  titleName.appendChild(userPhone);
  const userEmail = document.createElement("p");
  userEmail.textContent = `Email: ${latestEvent.email}`;
  titleName.appendChild(userEmail);
  const welcomeMessage=document.querySelector(".welcomeText")
  welcomeMessage.innerHTML="";
  welcomeMessage.textContent="Welcome to Modern Health Care"

  welcomeValue.insertBefore(welcomeTag, titleName);
}

// function toCapturePatientDits() {
//   const bgContainer = document.querySelector(".bgflex");
//   bgContainer.innerHTML = "";

//   if (events.length > 0) {
//     const latestEvent = events[events.length - 1]; // Retrieve the last event from the array

//     const secDiv = document.createElement("div");
//     secDiv.innerHTML = `
//       <div class="card">
//         <img src="assets/avatar.png" class="img-avatar" />
//         <h3>Welcome: ${latestEvent.Username}</h3>
//         <p>Username: ${latestEvent.Username}</p>
//         <p>Email: ${latestEvent.email}</p>
//         <p>Telephone: ${latestEvent.telephone}</p>
//       </div>
//     `;

//     bgContainer.appendChild(secDiv);
//   }
// }

// Post data from login Form
document.querySelector("#getForm").addEventListener('submit', function (event) {
  event.preventDefault();
  const frm = new FormData(this);
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
  }).then(function(){

    window.location.assign("home.html");
  })

 
});

// Capture location data
function captureLocation() {
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
    <img src="assets/meds.png" alt="medicine thumbnail">
    <td class="medicines-title">${medicines.title}</td>
    <td class="medicines-type">${medicines.type}</td>
    <td class="medicines-price">${medicines.price}</td>
    <td class="medicines-description">${medicines.description}</td>
    <td class="medicines-date">${medicines.date}</td>
    
    `;
    document.querySelector("#page-home tbody").appendChild(tr);
  
  });
}

// Function to fetch prescription data
function getPrescription() {
   return fetch('http://localhost:3000/Doctor')
    .then((response) => response.json())
    .then((data) => data);
}

//function to show hidden medicine prices 

function showSection() {
  const section = document.getElementById("page-home");
  const backdrop = document.querySelector(".backdrop");
  section.removeAttribute("hidden");
  backdrop.style.display = "block";
}

function showSectionTwo() {
  const section = document.getElementById("page-appointment");
  const backdrop = document.querySelector(".backdropTwo");
  section.removeAttribute("hidden");
  backdrop.style.display = "block";
}
    // Submit btn
    const submitBtn = document.querySelector(".submit-btn");
    // Captures the Patient Id
    const patientID = document.querySelector(".patient-id");
    
    // Event listener
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(patientID.value);
    
      // Fetch Requeest
      fetch("http://localhost:3000/Doctor")
        // Returns a promise
        .then((response) => response.json())
        // Returns actual data if promise is fulfilled
        .then((data) => {
          // Iterating
    
          data.forEach((data) =>{
            if (parseInt(patientID.value)=== data.id){
              console.log("successful");
              const feed=document.querySelector("#feed");
              const divEl=document.createElement("div")
              divEl.textContent =data.doctor_name;
              feed.appendChild(divEl);
    
    
            }else{
    
               alert("user not found do register")
            }
    
    
          })
    
        })
    
      })
    