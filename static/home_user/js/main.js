var lbtn2 = document.getElementById('lbtn2');
var message1 = document.getElementById('message1');
var message2 = document.getElementById('message2');

const trigger = document.getElementById("trigger");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const modal3 = document.getElementById("modal3");
const modalsolved = document.getElementById("modalsolved");
const modalpending = document.getElementById("modalpending");
const modalprofile = document.getElementById("modalprofile");
const modalsetting = document.getElementById("modalsetting");
const modalen = document.getElementById("modalen");
const modalcomp = document.getElementById("modalcomp");
const modalstatus = document.getElementById("modalstatus");


const closebtn = document.getElementById("closebtn");
const clickbtn = document.getElementById("clickbtn");
const retakebtn = document.getElementById("retakebtn");
const submitbtn = document.getElementById("submitbtn");
const finishbtn = document.getElementById("finishbtn");

const showprofile = document.getElementById("ShowProfile");
const hideprofile = document.getElementById("hideprofile");

const showsetting = document.getElementById("Showsetting");

const editname = document.getElementById("editname");
const cancomp = document.getElementById("cancomp");


trigger.addEventListener("click", startmodal1);
closebtn.addEventListener("click", closemodal);
clickbtn.addEventListener("click", closepic);
retakebtn.addEventListener("click", retakemodal);

submitbtn.addEventListener("click", submitcase);
finishbtn.addEventListener("click", finishmodal);

showsetting.addEventListener("click", showsettingmodal);
showprofile.addEventListener("click", showprofilemodal);
hideprofile.addEventListener("click", showprofilemodal);

editname.addEventListener("click", showmodalen);
cancomp.addEventListener("click", showmodalcomp);


function togglemodal1() {
    modal1.classList.toggle("show-modal");
}

function togglemodal2() {
    modal2.classList.toggle("show-modal");
}

function togglemodal3() {
    modal3.classList.toggle("show-modal");
}

function togglestatus() {
    modalstatus.classList.toggle("show-modal");
}

function togglesolved() {
    modalsolved.classList.toggle("show-modal");
}

function togglepending() {
    modalpending.classList.toggle("show-modal");
}

function showprofilemodal() {
    modalprofile.classList.toggle("show-modal");
}

function showsettingmodal() {
    modalsetting.classList.toggle("show-modal");
}


function showmodalen() {
    showprofilemodal();
    shownamemodal();
}


function showmodalcomp(id) {
    showcomp();
    caseid = id;

}

function showcomp(id) {
    modalcomp.classList.toggle("show-modal");
}

function shownamemodal() {
    modalen.classList.toggle("show-modal");
}


function startmodal1() {
    togglemodal1();
    capturecam();
}

function closemodal() {
    togglemodal1();
    closecam();
}


function closepic() {
    clickpic();
    togglemodal1();
    lbtn2.classList.add('lbtn2');
    message1.classList.add('hidden');
    message2.classList.add('hidden');
    closecam();
    togglemodal2();
}

function retakemodal() {
    capturecam();
    togglemodal2();
    togglemodal1();
}



function submitcase() {
    if (lng != ""){
        submitmodal();
    }
}

function finishmodal() {
    togglemodal3();
    window.location = "/";
}

function windowOnClick(event) {
    if (event.target === modalsetting) {
        showsettingmodal();
    }
}


window.addEventListener("click", windowOnClick);

var photo;
var lng = "";
var lat = "";
var caseid;
var name = document.getElementById('full_name').value;

if (name == "") {
    shownamemodal();
}


function setname() {
    var name = document.getElementById('full_name').value;
    var fd = new FormData()
    fd.append('user_name', name)

    $.ajax({
            type:'POST',
            url:'/editname',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            error: function (error) {
                console.log("An error occurred to change name")
            }
        })

    window.location = "/";

}


let on_stream_video = document.querySelector('#camera');
let constraints = { audio: false, video: true }
let shouldFaceUser = false;
let supports = navigator.mediaDevices.getSupportedConstraints();
let stream = null;

function capturecam() {
    constraints.video = {
        facingMode: shouldFaceUser ? 'user' : 'environment'
    }
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            stream = mediaStream;
            on_stream_video.srcObject = stream
            on_stream_video.play();
        })
        .catch(function (err) {
            console.log(err)
        });
}

function closecam() {

    const tracks = stream.getTracks();
    tracks[0].stop();
    tracks.forEach(track => track.stop())

}

function clickpic() {

    const video = document.querySelector('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    image = canvas.getContext('2d')
    photo = canvas.toDataURL('image/png');
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }       
    message1.classList.add('hidden');
    message2.classList.remove('hidden');
  }

function showPosition(position) {

    lat = position.coords.latitude;
    lng = position.coords.longitude;
    lbtn2.classList.remove('lbtn2');     
    message2.classList.add('hidden');   
    message1.classList.remove('hidden');
}


function submitmodal() {
    togglemodal2();

    var ImageURL = photo;
    var block = ImageURL.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];

    var blob = b64toBlob(realData, contentType)

    var descriptionbox = document.getElementById('descriptionbox').value;

    if (descriptionbox == ""){
        descriptionbox = "None"
    }

    var fd = new FormData()
    fd.append('image', blob)
    fd.append('lng', lng)
    fd.append('lat', lat)
    fd.append('description', descriptionbox)

        $.ajax({
            type:'POST',
            url:'/submit',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (data) {
                console.log(data.success)
            }

        })

    togglemodal3();

}



function submitcomp() {

    var compbox = document.getElementById('complaintbox').value;

    var fd = new FormData()
    fd.append('complaint_box', compbox)
    fd.append('case_id', caseid)

        $.ajax({
            type:'POST',
            url:'/complaint',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            error: function (error) {
                console.log("An error occurred")
            }

        })

    showmodalcomp();

}



function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data); // window.atob(b64Data)
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}