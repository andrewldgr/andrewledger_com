window.onload = function(event) {

    var checkButtons = document.getElementsByName("quizCheckButton");
    for (var i = 0, length = checkButtons.length; i < length; i++){
        checkButtons[i].onclick = function() {
            checkAnswer(this);
        }
    }

    function checkAnswer(button) {

        var radios = document.getElementsByName(button.id);
        for (var i = 0, length = radios.length; i < length; i++) {

            var selector = 'label[for=' + radios[i].id + ']';
            var label = document.querySelector(selector);

            if (radios[i].value == "TRUE") {
                label.style.color = 'green';
                label.style.fontWeight = 'bold';
            } else {
                if (radios[i].checked) {
                    label.style.color = 'red';
                    label.style.fontWeight = 'bold';
                } else {
                    label.style.color = 'black';
                    label.style.fontWeight = 'normal';
                }
            }
        }
    }
};

