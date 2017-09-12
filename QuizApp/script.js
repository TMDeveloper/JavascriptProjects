$(function () {
    "use strict";
//Initiation of the list that contains all questions for the quiz app
var currentQuestion, questionNum = 1, correct, score = 0, playerName, firstQuestion = true, highScoresArray = [],
    questionsList = [{
            question: "Who is the founder of Microsoft?",
            answers: ["Bill Gates", "Steve Jobs", "Steve Wozniak", "George Gates"],
            correct: "Bill Gates"
        }, {
            question: "Which technology is Samsung using for its smartphones displays?",
            answers: ["LED", "AMOLED", "OLED", "IPS"],
            correct: "AMOLED"
        }, {
            question: "1 byte equals to ?",
            answers: ["8 bits", "64 bits", "32bits", "1024 bits"],
            correct: "8 bits"
        }, {
            question: "The C programming language was developed by?",
            answers: ["Brendan Eich", "Dennis Ritchie", "Guido van Rossum", "O' Reilly"],
            correct: "Dennis Ritchie"
        }, {
            question: "OS computer abbreviation usually means?",
            answers: ["Order of Significance", "Open Software", "Operating System", "Optical Sensor"],
            correct: "Operating System"
        }, {
            question: ".MOV extension refers usually to what kind of file?",
            answers: ["Image file", "Animation/movie file", "Audio file", "MS Office document"],
            correct: "Animation/movie file"
        }, {
            question: "Which is a type of Electrically-Erasable Programmable Read-Only Memory?",
            answers: ["Flash", "Flange", "Fury", "FRAM"],
            correct: "Flash"
        }, {
            question: "Who is largely responsible for breaking the German Enigma codes, created a test that provided a foundation for artificial             intelligence?",
            answers: ["Alan Turing", "Jeff Bezos", "George Boole", "Charles Babbage"],
            correct: "Alan Turing"
        }, {
            question: ".INI extension refers usually to what kind of file?",
            answers: ["Image file", "System file", "Hypertext related file", "database file"],
            correct: "System file"
        }, {
            question: "What is the full form of IP?",
            answers: ["Internet Provider", "Internet Port", "Internet Protocol", "Internet Priority"],
            correct: "Internet Protocol"
        }],
        activeQuestionsList = questionsList.slice(0);
        
        function saveScore() {
            localStorage.setItem("scores", JSON.stringify(highScoresArray));
        }
    
//Shows the five biggest scores inserted to localstorage object (Sorted with descending order)
        function loadScores() {
            var string1 = localStorage.getItem("scores"), i;
            
            if (string1) 
            {
                highScoresArray = JSON.parse(string1);
                var i = highScoresArray.length;
                highScoresArray.sort(function(a, b){return b.playerScore-a.playerScore;});
                for(var j=0; j<i; j++)
                {
                    $("#" + (j+1)).text("#"+ (j+1) + " " + highScoresArray[j].name + ": " + highScoresArray[j].playerScore);
                }
            }
        };

    function getQuestion() {    
            currentQuestion = Math.floor(Math.random() * activeQuestionsList.length);
            var questionNumber = "Question #"+ questionNum,
            question = activeQuestionsList[currentQuestion].question,
            answer1 = activeQuestionsList[currentQuestion].answers[0],
            answer2 = activeQuestionsList[currentQuestion].answers[1],
            answer3 = activeQuestionsList[currentQuestion].answers[2],
            answer4 = activeQuestionsList[currentQuestion].answers[3];
            correct = activeQuestionsList[currentQuestion].correct;
            activeQuestionsList.splice(currentQuestion, 1);
            questionNum++;
         
        if(firstQuestion == false){
            $("#questionNumber").fadeOut();
            $("#question").fadeOut();
            $("#answer1").fadeOut();
            $("#answer2").fadeOut();
            $("#answer3").fadeOut();
            $("#answer4").fadeOut();
        }
        
        $("#score").text("Score: "+score).fadeIn();
        $("#questionNumber").text(""+questionNumber).fadeIn();
        $("#question").text(""+question).fadeIn();
        $("#answer1").text(""+answer1).fadeIn();
        $("#answer2").text(""+answer2).fadeIn();
        $("#answer3").text(""+answer3).fadeIn();
        $("#answer4").text(""+answer4).fadeIn();
        
     };
    
        function getResults() {
        $("#result").text("Congratulations! Your score is "+score+"!");
        $("#questionBoard").addClass("hidden");
        $("#questionBoard").fadeOut();
        $("#quizResults").fadeIn();
        $("#quizResults").removeClass("hidden");
        $("#playerName").val("");
        };
 
// Event listeners 
    $("#newGame").on("click", function (ev){
        ev.preventDefault();
        $(".logo, #settingsIcon, #menu, .footer").fadeOut();
        $("#gameLevel").fadeIn();
        $("#gameLevel").removeClass("hidden");
        $(".logo, #settingsIcon, #menu, .footer").addClass("hidden");
        activeQuestionsList = questionsList.slice(0);
    });
    
    $("#easy, #moderate, #hard").on("click", function (ev){
        ev.preventDefault();
        $("#gameLevel, #theTitle").fadeOut();
        $("#questionBoard").fadeIn();
        $("#gameLevel, #theTitle").addClass("hidden");
        $("#questionBoard").removeClass("hidden");
        getQuestion();
    });

//Checks given answer
    $("#answer1, #answer2, #answer3, #answer4").on("click", function (ev){
        ev.preventDefault();
        if(ev.target.textContent == correct && activeQuestionsList.length > 0)
        {
            score+=30;
            $("#score").text("Score: "+score).fadeIn();
            getQuestion();
        }
        else if (ev.target.textContent != correct && activeQuestionsList.length > 0)
        {
            getQuestion();
        }
        else if(ev.target.textContent == correct && activeQuestionsList.length == 0)
        {
            score+=30;
            $("#score").text("Score: "+score).fadeIn();
            getResults();
            
        }
        else if(ev.target.textContent != correct && activeQuestionsList.length == 0)
        {
            getResults();
        }
    });
    
    $("#highscore").on("click", function (ev){
        ev.preventDefault();
        $("#settings, #settingsIcon, .logo, #menu, .footer").fadeOut();
        $("#highscores").fadeIn();
        $("#settings, #settingsIcon, .logo, #menu, .footer").addClass("hidden");
        $("#highscores").removeClass("hidden");
        loadScores();
    });
    
    $("#about").on("click", function (ev){
        ev.preventDefault();
        $("#settings, #settingsIcon, .logo, #menu, .footer").fadeOut();
        $("#gameInfo").fadeIn();
        $("#settings, #settingsIcon, .logo, #menu, .footer").addClass("hidden");
        $("#gameInfo").removeClass("hidden");
    });
    
    $("#exitGame").on("click", function (ev){
        ev.preventDefault();
        window.close();
    });
    
     $("#settingsIcon").on("click", function (ev){
        ev.preventDefault();
        $(".logo, #menu, .footer").fadeOut();
        $("#settings").fadeIn();
        $(".logo, #menu, .footer").addClass("hidden");
        $("#settings").removeClass("hidden");
    });
    
    $("#soundSwitch").on("click", function (ev){
        ev.preventDefault();
        if ($(this).attr("class") == "switches") {
            this.src = this.src.replace("_on","_off");
        }   
        else {
            this.src = this.src.replace("_off","_on");
        }
        $(this).toggleClass("on");
    });
    
    $("#musicSwitch").on("click", function (ev){
        ev.preventDefault();
        if ($(this).attr("class") == "switches") {
            this.src = this.src.replace("_on","_off");
        }   
        else {
            this.src = this.src.replace("_off","_on");
        }
        $(this).toggleClass("on");
    });
            
    $("#questionToMain, #highscoresToMain, #settingsToMain, #levelToMain, #infoToMain, #quizResultsToMain").on("click", function (ev){
        ev.preventDefault();
        $("#highscores, #settings, #gameInfo, .footer, #gameLevel, #questionBoard, #quizResults").fadeOut();
        $("#menu, .logo, .footer, #settingsIcon, #theTitle").fadeIn();
        $("#highscores, #settings, #gameInfo, .footer, #gameLevel, #questionBoard, #quizResults").addClass("hidden");
        $("#menu, .logo, .footer, #settingsIcon, #theTitle").removeClass("hidden");
        $("#saveButton").text("Save score");
        score = 0;
        questionNum = 1;
        activeQuestionsList = [];
    });
    
    $("#saveButton").on("click", function (ev){
        ev.preventDefault();
        var playerName = $("#playerName").val();
        $("#saveButton").text("Score saved!");
        highScoresArray.push({name:playerName, playerScore:score});
        saveScore();
    });
}());