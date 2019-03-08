// Cowboy Bebob Trivia Game

var trivia = {
    q1: {
        question: "This is A question",
        answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
        boolean: [true, false, false, false],
        image: ["imageCorrect", "imageIncorrect"]
    },
    q2: {
        question: "This is B question",
        answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
        boolean: [false, false, false, true],
        image: ["imageCorrect", "imageIncorrect"]
    },
    q3: {
        question: "This is C question",
        answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
        boolean: [false, true, false, false],
        image: ["imageCorrect", "imageIncorrect"]
    },
    // q4: {
    //     question: "This is a question",
    //     answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
    //     boolean: [true, true, true, true],
    //     image: ""
    // },
    // q5: {
    //     question: "This is a question",
    //     answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
    //     boolean: [true, true, true, true],
    //     image: ""
    // },
    // q6: {
    //     question: "This is a question",
    //     answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
    //     boolean: [true, true, true, true],
    //     image: ""
    // },
    // q7: {
    //     question: "This is a question",
    //     answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
    //     boolean: [true, true, true, true],
    //     image: ""
    // },
    // q8: {
    //     question: "This is a question",
    //     answer: ["this is answer", "this is a 2nd answer", "this is a 3rd answer", "this is a 4th answer"],
    //     boolean: [true, true, true, true],
    //     image: ""
    // }
};

var funcAudio;
var correct = 0;
var incorrect = 0;
var allTrivia = [];

// CREATE ALL THE THINGS
function playGame() {
    for (var key in trivia) {
        allTrivia.push(trivia[key]);
    }
    var funcAudio = new Audio("../TriviaGame-cowboy-bebop/assets/audio/tank.mp3");
    $(".trivia-area").show();
    $(".reveal-answer").hide();
    // playaudio
    funcAudio.play();
    start();
    console.log(funcAudio);
    return funcAudio
};

// Timer Countdown
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
    time = 30;
    console.log("Time Up, you reached 00:00");
    // next question
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
    }

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

// window.onload = function() {
//   $("#lap").on("click", stopwatch.recordLap);
//   $("#stop").on("click", stopwatch.stop);
//   $("#reset").on("click", stopwatch.reset);
//   $("#start").on("click", stopwatch.start);
// };