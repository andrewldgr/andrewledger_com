window.onload = function(event) {

    //declare variables
    let qInfo = [];
    let numQs = localStorage.getItem("numQs");

    loadQuestions();

    //Load all the questions
    //based on the template in the html file
    function loadQuestions() {
        for(let i = 1; i<= numQs; i++){
            templateListItem = document.getElementById("templateListItem");
            newQ = document.createElement("li");
            newQ.setAttribute("id", "questionItem" + i);
            newQ.innerHTML = (templateListItem.innerHTML.replace(/\?/g, i));
            document.getElementById("quizList").appendChild(newQ);
            
            let qObj = localStorage.getItem(("q" + i));
            
            qInfo.push(JSON.parse(qObj));
            
            document.getElementById("questionText" + i).innerHTML = jsHighlight(qInfo[i-1].questionText);
            document.getElementById("q" + i + "aText").innerHTML = "A) " + jsHighlight(qInfo[i-1].aText);
            document.getElementById("q" + i + "bText").innerHTML = "B) " + jsHighlight(qInfo[i-1].bText);
            document.getElementById("q" + i + "cText").innerHTML = "C) " + jsHighlight(qInfo[i-1].cText);
            document.getElementById("q" + i + "dText").innerHTML = "D) " + jsHighlight(qInfo[i-1].dText);
            
            if (qInfo[i-1].answer != null) {
                let radios = document.getElementsByName("q" + i);
                radios[qInfo[i-1].answer].value = "TRUE";
            }
            
        }
    }

    //Wraps special Javascript characters in <code>special</code>
    function jsHighlight(text) {
        //let, var, const, for, {, }, (, ), +, -, * , / ,= 
        text = text.replace("/", "<code>/</code>");         //this one has to be first
        text = text.replace(/let/gi, "<code>let</code>");
        text = text.replace(/var/gi, "<code>var</code>");
        text = text.replace(/const/gi, "<code>const</code>");
        text = text.replace(/for/gi, "<code>for</code>");
        text = text.replace(/{/gi, "<code>{</code>");
        text = text.replace(/}/gi, "<code>}</code>");
        text = text.replace("(", "<code>(</code>");
        text = text.replace(")", "<code>)</code>");
        text = text.replace("+", "<code>+</code>");
        text = text.replace("-", "<code>-</code>");
        text = text.replace("*", "<code>*</code>");
        text = text.replace("\\", "<code>\\</code>");
        text = text.replace("=", "<code>=</code>");

        return text;
    }

    //put the onclick methods for checking answers.
    //Must be placed after the quiz loads
    let checkButtons = document.getElementsByName("quizCheckButton");
    for (let i = 0, length = checkButtons.length; i < length; i++){
        checkButtons[i].onclick = function() {
            checkAnswer(this);
        }
    }

    //Check the answers for all the buttons
    //regardless of how many questions there are
    function checkAnswer(button) {

        let radios = document.getElementsByName(button.id);
        for (let i = 0, length = radios.length; i < length; i++) {

            let selector = 'label[for=' + radios[i].id + ']';
            let label = document.querySelector(selector);

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
}