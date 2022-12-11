var $keyboardWrapper = $('.virtual-keyboard'),
    $key = $keyboardWrapper.find("input"),
    $key_delete = $('.delete'),
    $outputField = $('.mobile-output input'),
    $currentValue = $outputField.val(),
    actionKeys = $(".delete")

// handle keystrokes  
function _keystroke(keyCase) {
    $key.not(actionKeys).on('click', function (e) {
        e.preventDefault();
        // handle case  
        if (keyCase == 'upper') {
            var keyValue = $(this).val().toUpperCase();
        } else {
            var keyValue = $(this).val().toLowerCase();
        }
        // grab current value  
        var output = $('.mobile-output input').val();
        $outputField.val(output + keyValue);
        getCurrentVal();
        focusOutputField();
    });
} // keystroke  
// delete  
$key_delete.on('click', function (e) {
    e.preventDefault();
    $outputField.val($currentValue.substr(0, $currentValue.length - 1));
    getCurrentVal();
    focusOutputField();
});

// grab current value of typed text  
function getCurrentVal() {
    $currentValue = $outputField.val();
}
// focus for cursor hack  
function focusOutputField() {
    $outputField.focus();
}
_keystroke("lower"); // init keystrokes




var $keyboardWrapper2 = $('.virtual-keyboard-2'),
    $key2 = $keyboardWrapper2.find("input"),
    $key_delete2 = $('.delete'),
    $outputField2 = $('.otp-output input'),
    $currentValue2 = $outputField2.val(),
    actionKeys = $(".delete")

// handle keystrokes  
function keystroke2(keyCase) {
    $key2.not(actionKeys).on('click', function (e) {
        e.preventDefault();
        // handle case  
        if (keyCase == 'upper') {
            var keyValue2 = $(this).val().toUpperCase();
        } else {
            var keyValue2 = $(this).val().toLowerCase();
        }
        // grab current value  
        var output2 = $('.otp-output input').val();
        $outputField2.val(output2 + keyValue2);
        getCurrentVal2();
        focusOutputField2();
    });
} // keystroke  
// delete  
$key_delete2.on('click', function (e) {
    e.preventDefault();
    $outputField2.val($currentValue2.substr(0, $currentValue2.length - 1));
    getCurrentVal2();
    focusOutputField2();
});

// grab current value of typed text  
function getCurrentVal2() {
    $currentValue2 = $outputField2.val();
}
// focus for cursor hack  
function focusOutputField2() {
    $outputField2.focus();
}

keystroke2("lower"); // init keystrokes

/*
const otpInput = document.querySelectorAll('.otp-output input');
let yourInputNumber = '';

otpInput.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        const element = e.target;

        if (element.value.match(/\d/)) {
            yourInputNumber += element.value;

            if (element.nextElementSibling) {
                element.nextElementSibling.focus();
            }

        }
    });
});  */
