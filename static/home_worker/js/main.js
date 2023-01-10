var lbtn2 = document.getElementById('lbtn2');
var message1 = document.getElementById('message1');
var message2 = document.getElementById('message2');
var message3 = document.getElementById('message3');
var wlmessage = document.getElementById('wlmessage');

const trigger = document.getElementById("trigger");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const modal3 = document.getElementById("modal3");
const wmodal3 = document.getElementById("wmodal3");
const modalsolved = document.getElementById("modalsolved");
const modalpending = document.getElementById("modalpending");
const modalprofile = document.getElementById("modalprofile");
const modalsetting = document.getElementById("modalsetting");
const modalen = document.getElementById("modalen");
const modalal = document.getElementById("modalal");
const wmodalcomp = document.getElementById("wmodalcomp");


const closebtn = document.getElementById("closebtn");
const clickbtn = document.getElementById("clickbtn");
const retakebtn = document.getElementById("retakebtn");

const wnextbtn = document.getElementById("wnextbtn");
const finishbtn = document.getElementById("finishbtn");

const showprofile = document.getElementById("ShowProfile");
const hideprofile = document.getElementById("hideprofile");

const showsetting = document.getElementById("Showsetting");

const editname = document.getElementById("editname");

trigger.addEventListener("click", startmodal1);
closebtn.addEventListener("click", closemodal);
clickbtn.addEventListener("click", closepic);
retakebtn.addEventListener("click", retakemodal);

wnextbtn.addEventListener("click", wselectcase);
finishbtn.addEventListener("click", finishmodal);

showsetting.addEventListener("click", showsettingmodal);
showprofile.addEventListener("click", showprofilemodal);
hideprofile.addEventListener("click", showprofilemodal);

editname.addEventListener("click", showmodalen);

function togglemodal1() {
    modal1.classList.toggle("show-modal");
}

function togglemodal2() {
    modal2.classList.toggle("show-modal");
}


function togglewmodal3() {
    wmodal3.classList.toggle("show-modal");
}

function togglemodal3() {
    modal3.classList.toggle("show-modal");
}

function wtogglecomp() {
    wmodalcomp.classList.toggle("show-modal");
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

function showmodalal() {
    modalal.classList.toggle("show-modal");
}

function hidemodalal() {
    SubmitLocation();
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


function btnsolved() {
    togglepending();
    togglesolved();

}

function btnpending() {
    togglesolved();
    togglepending();

}


function submitcase() {
    submitmodal();
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


function wselectcase() {
    if (lat != ""){ 


    var fd = new FormData()
    fd.append('lat', lat)
    fd.append('lng', lng)

        $.ajax({
            type:'POST',
            url:'/casenear',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.msg) {
                    message3.classList.remove('hidden');
                    togglemodal2()
                    togglewmodal3()
                }
                else {
                cid = data.id
                casedate = data.date;
                caseid = " ( Case ID - " + cid + " ) ";
                document.getElementById("case_date").innerHTML = casedate;
                document.getElementById("case_id").innerHTML = caseid;
                togglemodal2()
                togglewmodal3()
                }

            }

        })
    }

}

var cid;
var photo;
var caseid;
var casedate;
var lng = "";
var lat = "";
var name = document.getElementById('full_name').value;
var worker_location = document.getElementById('worker_location').value;


if (name == "") {
    shownamemodal();
}


if (worker_location == "0") {
    showmodalal();
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
                console.log("An error occurred")
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

    var ImageURL = photo;
    var block = ImageURL.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];

    var blob = b64toBlob(realData, contentType);

    var fd = new FormData()
    fd.append('cid', cid)
    fd.append('image', blob)

        $.ajax({
            type:'POST',
            url:'/worker/submit',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            error: function (error) {
                console.log("An error occurred");
            },
            success: function (error) {
                console.log("Case Submited");
                togglewmodal3();
                togglemodal3();
            }

        })


}



function SubmitLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWorkerPosition);
  }       
    wlmessage.classList.remove('hidden');
  }

function showWorkerPosition(position) {

    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    wlmessage.classList.add('hidden');

    var fd = new FormData()
    fd.append('lat', lat)
    fd.append('lng', lng)

        $.ajax({
            type:'POST',
            url:'/addlocation',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data.success)
            }

        })

    showmodalal();
    window.location = "/";


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



function caseaccept(case_id) {
    var fd = new FormData()
    fd.append('case_id', case_id)

    $.ajax({
            type:'POST',
            url:'/caseaccept',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data.msg)
            }
        })

    window.location = "/";
}


function rejectcase(r_cid) {

    var fd = new FormData()
    fd.append('cid', r_cid)

        $.ajax({
            type:'POST',
            url:'/worker/rejectcase',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data.msg)
                window.location = "/";
            }

        })
}