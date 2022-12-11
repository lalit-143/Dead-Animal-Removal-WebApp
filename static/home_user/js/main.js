const trigger = document.getElementById("trigger");

const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const modal3 = document.getElementById("modal3");
const modalstatus = document.getElementById("modalstatus");
const modalprofile = document.getElementById("modalprofile");
const modalsetting = document.getElementById("modalsetting");
const modalen = document.getElementById("modalen");
const modalcomp = document.getElementById("modalcomp");

const closebtn = document.getElementById("closebtn");
const clickbtn = document.getElementById("clickbtn");
const retakebtn = document.getElementById("retakebtn");
const submitbtn = document.getElementById("submitbtn");
const finishbtn = document.getElementById("finishbtn");

const showstatus = document.getElementById("showstatus");
const hidestatus = document.getElementById("hidestatus");

const showprofile = document.getElementById("ShowProfile");
const hideprofile = document.getElementById("hideprofile");

const showsetting = document.getElementById("Showsetting");
const hidesetting = document.getElementById("Hidesetting");

const editname = document.getElementById("editname");
const btncomp = document.getElementById("btncomp");
const cancomp = document.getElementById("cancomp");



trigger.addEventListener("click", startmodal1);
closebtn.addEventListener("click", closemodal);
clickbtn.addEventListener("click", closepic);
retakebtn.addEventListener("click", retakemodal);

submitbtn.addEventListener("click", submitmodal);
finishbtn.addEventListener("click", finishmodal);

showstatus.addEventListener("click", togglestatus);
hidestatus.addEventListener("click", togglestatus);

showprofile.addEventListener("click", showprofilemodal);
hideprofile.addEventListener("click", showprofilemodal);

showsetting.addEventListener("click", showsettingmodal);
hidesetting.addEventListener("click", showsettingmodal);

editname.addEventListener("click", showmodalen);
btncomp.addEventListener("click", showmodalcomp);
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

function showprofilemodal() {
    modalprofile.classList.toggle("show-modal");
}

function showsettingmodal() {
    modalsetting.classList.toggle("show-modal");
}

function showmodalen() {
    showprofilemodal();
    modalen.classList.toggle("show-modal");
}

function showmodalcomp() {
    modalcomp.classList.toggle("show-modal");
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
    closecam();
    togglemodal2();
}

function retakemodal() {
    capturecam();
    togglemodal2();
    togglemodal1();
}

function submitmodal() {
    togglemodal2();
    togglemodal3();

}

function finishmodal() {
    togglemodal3();
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
    var photo = canvas.toDataURL('image/png');
}


var coll = document.getElementsByClassName("collapsible1");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}