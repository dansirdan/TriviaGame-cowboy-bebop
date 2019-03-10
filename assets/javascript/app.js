// Cowboy Bebob Trivia Game////////////////////////////////////////////////////////////////////////////////

// An Array of Object-Questions////////////////////////////////////////////////////////////////////////////
var trivia = [
    q1 = {
        question: "What year was Cowboy Bebop released in Japan?",
        answer: ["1998", "2001", "1985", "2015"],
        correct: 0
    },
    q2 = {
        question: "Who is the protagonist of Cowboy Bebop?",
        answer: ["Edward", "Vincent", "Naruto", "Spike"],
        correct: 3
    },
    q3 = {
        question: "Who does the English voice acting for Faye Valentine?",
        answer: ["Melissa Fahn", "Wendee Lee", "Ellen Page", "Aoi Tada"],
        correct: 2
    },
    q4 = {
        question: "Who directed Cowboy Bebop?",
        answer: ["Yoko Nobumoto", "Shinichiro Watanabe", "Michael Bay", "Sunrise"],
        correct: 1
    },
    q5 = {
        question: "Spike and Vicious were once members of this Syndicate...",
        answer: ["Red Lotus Syndicate", "Green Dragon Syndicate", "Red Tiger", "Red Dragon Syndicate"],
        correct: 3
    },
    q6 = {
        question: "What is the name of the blues and jazz band that was created by Yoko Kanno to perform the music of the anime?",
        answer: ["Seatbelts", "Bebop", "Tank!", "Space Dandy"],
        correct: 0
    },
    q7 = {
        question: "In the episode 'Stray Dog Strut' which character made their first appearance?",
        answer: ["Hakim", "Ein", "Vicious", "Rocco Bonnaro"],
        correct: 1
    },
    q8 = {
        question: "How many episodes are there, not including the 'Mish-Mash Blues'?",
        answer: ["35", "15", "25", "26"],
        correct: 3
    }
];

// Global Variables///////////////////////////////////////////////////////////////////////////////////////
var funcAudio;
var countCorrect = 0;
var countWrong = 0;
var RNG = 0;
var currentQ;
var currentA;
var lastQuestion = false;

// Possible variables for hide/show///////////////////////////////////////////////////////////////////////
$(".q-card").hide();
$(".countdown").hide();

// CREATE ALL THE THINGS//////////////////////////////////////////////////////////////////////////////////
function playGame() {

    var funcAudio = new Audio("../TriviaGame-cowboy-bebop/assets/audio/tank.mp3");
    $(".trivia-area").show();
    $(".q-card").show();
    $(".countdown").show();
    funcAudio.play();
    start();
    console.log(funcAudio);
    return funcAudio


};

// Timer Countdown/////////////////////////////////////////////////////////////////////////////////////////
var timerRunning = false;
var intervalId;
var time = 30;

function start() {
    if (!timerRunning) {
        intervalId = setInterval(countDown, 1000);
    };
};

function stop() {
    clearInterval(intervalId);
    clockRunning = false;
};

function timesUp() {
    stop();
    clearCard();
    time = 30;
    console.log("Time Up, you reached 00:00");
    // next question/////////////////////////////////////////////////////////////////////////////////////////
};

function countDown() {
    time--;
    var converted = timeConverter(time);
    $(".countdown").text(converted);
};

function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (time === 0) {
        timesUp();
    };
    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    };
    return minutes + ":" + seconds;
};

function createTrivia() {



    if (lastQuestion === true && countCorrect >= countWrong) {
        alert("Nice work! Your total correct was " + countCorrect + ", and your total wrong was " + countWrong + ".");
        $(".q-card").hide();
        $(".countdown").hide();
    }

    if (lastQuestion === true && countWrong >= countCorrect) {
        alert("Do you even watch this anime? Your total correct was " + countCorrect + ", and your total wrong was " + countWrong + ".");
        $(".q-card").hide();
        $(".countdown").hide();
    }

    var shuffleDeck = shuffle(trivia);
    currentQ = shuffleDeck.pop();
    currentA = currentQ.correct;
    $(".card-header").text(currentQ.question);

    for (var i = 0; i < 4; i++) {
        var triviaList = $("<li class='list-group-item' id='choices' data-id='" + i + "'>").text(currentQ.answer[i]);
        $(".list-group-flush").append(triviaList);
        // choice - " + unique[i] + "'
    };

    if (shuffleDeck.length === 0) {
        return lastQuestion = true;
    };
};


$(".list-group").on("click", "#choices", function () {
    console.log("I was clicked");
    console.log("This is my value: " + $(this).data("id"));
    var userChoice = $(this).data("id");
    currentA = currentQ.correct;

    if (currentA === userChoice) {
        console.log("That's correct!.");
        countCorrect++;
        console.log("Answers right: " + countCorrect);
        clearCard();
        time = 30;
        createTrivia();
    } else {
        console.log("That's incorrect!");
        countWrong++;
        console.log("Wrong: " + countWrong);
        clearCard();
        time = 30;
        createTrivia();
    }
});

function clearCard() {
    $(".card-header").empty();
    $(".list-group-flush").empty();
};

// function correctAnswer() {
//     // timer here before next question appears///////////////////////////////////////////////////////////////////
//     timerRunning = false;
// }

// function inccorrectAnswer() {
//     timerRunning = false;
// }

// Fischer Yates randomize array /////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {

    var m = array.length,
        t, i;

    // While there remain elements to shuffle…/////////////////////////////////////////////////////////////////////

    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.//////////////////////////////////////////////////////////////////
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    };

    return array;
};


function playGame() {

    var funcAudio = new Audio("../TriviaGame-cowboy-bebop/assets/audio/tank.mp3");
    $(".trivia-area").show();
    $(".q-card").show();
    $(".countdown").show();
    funcAudio.play();
    start();
    console.log(funcAudio);
    return funcAudio

};

createTrivia();
$(document).on("click", ".list-group", createTrivia);
// $(document).on("click", ".movie", correctChoice);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Always 4 options
// reset of question all options are reset to FALSE
// when one of 4 text spaces is clicked sets that element to TRUE
// makes other buttons disappear
//
// 1. An obj that holds the question, choices (with the correct and 3 false answers), images.
// 
// function Car(question, answerArray, boolean, image) {
//  this.question = question;
//  this.answerArray = answerArray;
//  this.boolean = boolean;
//  this.image = image;
// }
// 
// 2. Clickability on all choices, scrollover changes color of div text
// 
// 3. True/False booleans in all choices
// 
// 4. Just one instance of If / Else / do this
// 
// 5. A function that creates an obj randomly from the list of objects
// 
// 6. A countdown function :30 seconds to answer; if time equals 00 then function CreateObj()
// 
// 7. That was correct 'screen', timer move on to next question in 5 seconds
//          The scenario is similar for wrong answers and time-outs.
//          If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//          If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer.Wait a few seconds, then show the next question.
// 8. Game over screen
// 
// 9. Win Screen (show correct answers, incorrect answers, and an option to restart the game (without reloading the page).
// 
// 10. Solution if you would like to put it in an object