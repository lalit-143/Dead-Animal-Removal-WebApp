const imgmodal = document.getElementById("imgmodal");
const descmodal = document.getElementById("descmodal");


function toggleimg() {
    imgmodal.classList.toggle("show-modal");
}

function toggledesc() {
    descmodal.classList.toggle("show-modal");
}

function showimg(caseid, image) {
	document.getElementById("casehead").innerText = caseid;
	document.getElementById("caseimg").src = "/media/"+image;
	toggleimg();
}


function showdesc(caseid, desc) {
	document.getElementById("deschead").innerText = caseid;
	document.getElementById("descbody").innerText = desc;
	toggledesc();
}


function windowOnClick(event) {
    if (event.target === imgmodal) {
        toggleimg();
    }
    if (event.target === descmodal) {
        toggledesc();
    }
}

window.addEventListener("click", windowOnClick);