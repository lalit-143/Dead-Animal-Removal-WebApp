var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
var message1 = document.getElementById('message1');
var message2 = document.getElementById('message2');
var mobile_num = 0;
var otp_send = 0;

const btnsend = document.getElementById("btnsend");
const btnback = document.getElementById("btnback");
const btncheck = document.getElementById("btncheck");
const btnresend = document.getElementById("btnresend");
const modal1 = document.getElementById("modal1");

btnsend.addEventListener("click", startmodal);
btnback.addEventListener("click", togglemodal1);
btncheck.addEventListener("click", checkmodal);
btnresend.addEventListener("click", sendotp);


function togglemodal1() {
    modal1.classList.toggle("show-modal");
}

function startmodal() {

    mobile_num = document.getElementById('mobile_number').value;

    if (regex.test(mobile_num)) {
        message1.classList.add('hidden');
        document.querySelector('.phone').textContent = mobile_num;
        sendotp();
        togglemodal1();
    }
    else {
        message1.classList.remove('hidden');
    }
}

function checkmodal() {
    var otp_receive = document.getElementById('otp_receive').value;
    if (otp_send == otp_receive) {
        message2.classList.add('hidden');
        togglemodal1();
    }
    else {
        message2.classList.remove('hidden');
    }
}

function sendotp() {
    otp_send = 1234;
}
