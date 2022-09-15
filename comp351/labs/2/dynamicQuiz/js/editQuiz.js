window.onload = function(event) {

    //Set Variables
    let qInfo = [];
    let numQs = localStorage.getItem("numQs");
    
    document.getElementById("addQBtn").onclick = function() {addQuestion();};
    document.getElementById("saveQuizBtn").onclick = function() {saveQuestions(true);};
    document.getElementById("deleteQBtn").onclick = function() {deleteQuestion();};

    loadQuestionsToEdit();

    setInterval(function(){ saveQuestions(false); }, 2000);

    //Load all the questions already stored
    //uses the template in the HTML file
    function loadQuestionsToEdit() {
        for(let i = 1; i<= numQs; i++){
            templateListItem = document.getElementById("templateListItem");
            newQ = document.createElement("li");
            newQ.setAttribute("id", "questionItem" + i);
            newQ.innerHTML = (templateListItem.innerHTML.replace(/\?/g, i));
            document.getElementById("quizList").appendChild(newQ);
            
            let qObj = localStorage.getItem(("q" + i));
            
            qInfo.push(JSON.parse(qObj));
            
            document.getElementById("questionText" + i).value = qInfo[i-1].questionText;
            document.getElementById("q" + i + "aText").value = qInfo[i-1].aText;
            document.getElementById("q" + i + "bText").value = qInfo[i-1].bText;
            document.getElementById("q" + i + "cText").value = qInfo[i-1].cText;
            document.getElementById("q" + i + "dText").value = qInfo[i-1].dText;
            
            if (qInfo[i-1].answer != null) {
                let radios = document.getElementsByName("q" + i);
                radios[qInfo[i-1].answer].checked = true;
            }
            
        }
    }

    //Add a question
    function addQuestion() {

        ++numQs;

        templateListItem = document.getElementById("templateListItem");
        newQ = document.createElement("li");
        newQ.setAttribute("id", "questionItem" + numQs);
        newQ.innerHTML = (templateListItem.innerHTML.replace(/\?/g, numQs));

        document.getElementById("quizList").appendChild(newQ);
        saveQuestions(false);
    }


    //Save Quiz
    function saveQuestions(notice) {
        for(let i = 1; i <= numQs; i++) {
            let qObj = {
                questionText: document.getElementById("questionText" + i).value,
                aText: document.getElementById("q" + i + "aText").value,
                bText: document.getElementById("q" + i + "bText").value,
                cText: document.getElementById("q" + i + "cText").value,
                dText: document.getElementById("q" + i + "dText").value,
                answer: getChecked("q" + i)
            };
            localStorage.setItem("q" + i, JSON.stringify(qObj));
        }

        localStorage.setItem("numQs", numQs);
        if (notice == true) {
            alert("Quiz Saved!");
        }
    }

    //Function for getting the number of the checked radio button in a group
    function getChecked(radioName){
        let radios = document.getElementsByName(radioName);
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return i;
            }
        }
        return null;
    }

    //Delete latest question
    function deleteQuestion() {
        document.getElementById("questionItem" + numQs).remove();
        --numQs;
        saveQuestions(false);
    }

}