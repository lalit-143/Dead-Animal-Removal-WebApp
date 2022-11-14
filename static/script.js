const modal = document.getElementById("popup");
const closeButton = document.getElementById("close-button")

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


const modal2 = document.getElementById("popup2");
const closeButton2 = document.getElementById("close-button2");

function toggleModal2() {
    modal2.classList.toggle("show-modal");
}

function windowOnClick2(event) {
    if (event.target === modal2) {
        toggleModal2();
    }
}


function toggleModal3() {
    modal2.classList.toggle("show-modal");
    getLocation();
}

closeButton2.addEventListener("click", toggleModal3);
window.addEventListener("click", windowOnClick2);



var x = document.getElementById("demo");
var l = document.getElementById("link");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation not supported";
  }
}

function showPosition(position) {

  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  x.innerHTML = "Latitude: " + lat + 
  "<br>Longitude: " + lng;
  
  var link = "https://www.google.com/maps?q=" + lat + "," + lng;
  
  l.innerText = link;

  getAddress();
  
}


const trigger = document.getElementById("trigger");


function startcam() {
  toggleModal();
  capturecam();
}

trigger.addEventListener("click", startcam);


const retake = document.getElementById("retake");

function retake2() {
    toggleModal();
    toggleModal2();
}

retake.addEventListener("click", retake2);


  
  let on_stream_video = document.querySelector('#camera-stream');
  let constraints = { audio: false, video: true }
  let shouldFaceUser = false;
  let supports = navigator.mediaDevices.getSupportedConstraints();
  let stream = null;



  function capturecam() {
      constraints.video = {
      facingMode: shouldFaceUser ? 'user' : 'environment'
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        stream  = mediaStream;
        on_stream_video.srcObject = stream
        on_stream_video.play();
      })
      .catch(function(err) {
        console.log(err)
      });
  }

  document.getElementById("capture-camera").addEventListener("click", function() {
   
      toggleModal();
      toggleModal2();
      const video = document.querySelector('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;              
    canvas.getContext('2d').drawImage(video, 0, 0);
  });


