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
btnresend.addEventListener("click", resendotp);


function togglemodal1() {
    modal1.classList.toggle("show-modal");
    message2.classList.add('hidden');
}

function startmodal() {

    mobile_num = document.getElementById('mobile_number').value;

    if (regex.test(mobile_num)) {
        message1.classList.add('hidden');
        document.querySelector('.phone').textContent = mobile_num;
        sendotp(mobile_num);
        togglemodal1();
    }
    else {
        message1.classList.remove('hidden');
    }
}


function resendotp() {
    mobile_number = document.getElementById('mobile_number').value;
    sendotp(mobile_number);
    message2.classList.add('hidden');
}



function sendotp(mobile_num) {

    var fd = new FormData()
    fd.append('mobile_num', mobile_num)

    $.ajax({
            type:'POST',
            url:'/sendotp',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (data) {
                console.log(data.success)
            }
        })

}

function checkmodal() {

    var otp_receive = document.getElementById('otp_receive').value;

    var fd = new FormData()
    fd.append('receive_otp', otp_receive)

    $.ajax({
            type:'POST',
            url:'/verifyotp',
            enctype: 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (data) {
                if (data.valid) {
                    message2.classList.add('hidden');
                    console.log(data.valid);
                    window.location = "/";
                }
                else{
                    console.log(data.invalid);
                    message2.classList.remove('hidden');
                }
            },
         
        })

}


