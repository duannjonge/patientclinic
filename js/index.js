//global variable for our events
let events=[];
//Make Sure DOM is loaded before fetching content 
document.addEventListener('DOMContentLoaded', async() =>{
//store fetched data
const response= await getPatientDetails();
//save the response into events variable
events=response;
console.log(events);
toCapturePatientDits(events);




});

//function to fetch Data
function getPatientDetails() {
    return fetch('http://localhost:3000/Details/1')
      .then((response) => response.json())
      .then((data) => data);
  }
function  toCapturePatientDits(events){
  const titleName=document.querySelector(".card-title");
  titleName.textContent=`Name: ${events.Username}`;
  const picImage=document.querySelector("img");
  picImage.src=events.image;
  const userPhone=document.createElement("p")
  userPhone.textContent=`Tel: ${events.telephone}`;
  titleName.appendChild(userPhone);
  const userLocation=document.createElement("p")
  userLocation.textContent=`Location: ${events.location}`;
  titleName.appendChild(userLocation);

  //welcome message
  const welcomeMessage=document.querySelector("#getForm");
  welcomeMessage.addEventListener("submit",(e) =>
  {
      e.preventDefault();
      const captureInput =e.target.children[3].value

  })

const welcomeValue=document.querySelector(".card-body")
const welcomeTag=document.createElement("p");
welcomeTag.textContent=`${welcomeMessage}`
welcomeValue.appendChild(welcomeTag);
  
  
  }
    
//post data

  document.querySelector(".frm").addEventListener('submit',function (event){
  event.preventDefault();
  const frm=new FormData(this)
  console.log(frm.values())
  const data= {
    "Username":"John Doe",
    "email":"spent@gmail.com",
    "telephone":"0712323242",

  }
    
    })



