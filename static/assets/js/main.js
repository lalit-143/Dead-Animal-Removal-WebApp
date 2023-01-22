const compmodal = document.getElementById("compmodal");

function togglecomp() {
    compmodal.classList.toggle("show-modal");
}

function showcomp(compbox, compcase) {
	document.getElementById("comphead").innerText = compcase;
	document.getElementById("compbody").innerText = compbox;
	togglecomp();

}

function hidecomp() {
	togglecomp();
}

function windowOnClick(event) {
    if (event.target === compmodal) {
        hidecomp();
    }
}

window.addEventListener("click", windowOnClick);