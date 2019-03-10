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
        correct: 1
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
var correctGIF = ["assets/images/answer/correct/correct0.gif", "assets/images/answer/correct/correct1.gif", "assets/images/answer/correct/correct2.gif", "assets/images/answer/correct/correct3.gif", ];
var wrongGIF = ["assets/images/answer/incorrect/wrong0.gif", "assets/images/answer/incorrect/wrong1.gif", "assets/images/answer/incorrect/wrong2.gif", "assets/images/answer/incorrect/wrong3.gif", ];
var randFour = 0;
var correctMessage;
var wrongMessage;
var funcAudio;
var countCorrect = 0;
var countWrong = 0;
var RNG = 0;
var currentQ;
var currentA;
var lastQuestion = false;
var timerRunning = false;
var intervalId;
var time = 31;

function gifCorrect() {

    time = 31;
    stop();
    $(".answer-image").empty();
    randFour = Math.floor(Math.random() * 4);
    var cGIF = correctGIF[randFour];
    var gifCImage = $("<img src='" + cGIF + "'>");
    $(".list-group-flush").empty()

    correctMessage = $("<div id='correctMessage'>").text("That was correct!");
    $(".answer-image").append(gifCImage).append(correctMessage);
    setTimeout(clearCard, 1000 * 5);
    setTimeout(createTrivia, 1000 * 5);
    setTimeout(start, 5000);

};

function gifWrong() {

    time = 31;
    stop();
    $(".answer-image").empty();
    randFour = Math.floor(Math.random() * 4);
    var wGIF = wrongGIF[randFour];
    var gifWImage = $("<img src='" + wGIF + "'>");
    $(".list-group-flush").empty()

    wrongMessage = $("<div id='incorrectMessage'>").text("That was incorrect!");
    $(".answer-image").append(gifWImage).append(wrongMessage);
    setTimeout(clearCard, 1000 * 5);
    setTimeout(createTrivia, 1000 * 5);
    setTimeout(start, 5000);

};

// Possible variables for hide/show///////////////////////////////////////////////////////////////////////
$(".q-card").hide();
$(".title-space").hide();
$(".blue-boy").hide();

// CREATE ALL THE THINGS//////////////////////////////////////////////////////////////////////////////////
function playGame() {

    var funcAudio = new Audio("../TriviaGame-cowboy-bebop/assets/audio/tank.mp3");
    $(".play-game").hide();
    $(".title-space").show();
    $(".trivia-area").show();
    $(".q-card").show();
    $(".blue-boy").show();
    funcAudio.play();
    start();
    console.log(funcAudio);
    return funcAudio

};

// Timer Countdown/////////////////////////////////////////////////////////////////////////////////////////
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

    gifWrong();
    $(".card-header").text("That's incorrect!");
    countWrong++;
    console.log("Wrong: " + countWrong);
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

    $(".answer-image").empty();

    // $(".list-group-item").hover(function () {
    //         $(this).css("background-color", "#1ec9f7");
    //     },
    //     function () {
    //         $(this).css("background-color", "#1ec9f7");
    //     });

    if (lastQuestion === true && countCorrect >= countWrong) {
        stop();
        alert("Nice work! Your total correct was " + countCorrect + ", and your total wrong was " + countWrong + ".");
        $(".container").hide();
        $(".body").css("background-image", "url(assets/images/background/tan.jpg)");
        return;
    };

    if (lastQuestion === true && countWrong >= countCorrect) {
        stop();
        alert("Do you even watch this anime? Your total correct was " + countCorrect + ", and your total wrong was " + countWrong + ".");
        $(".container").hide();
        $(".body").css("background-image", "url(assets/images/background/black.jpg)");
        return;
    };

    var shuffleDeck = shuffle(trivia);
    currentQ = shuffleDeck.pop();
    currentA = currentQ.correct;
    $(".card-header").text(currentQ.question);

    for (var i = 0; i < 4; i++) {
        var triviaList = $("<li class='list-group-item' id='choices' data-id='" + i + "'>").text(currentQ.answer[i]);
        $(".list-group-flush").append(triviaList);
    };

    if (shuffleDeck.length === 0) {
        return lastQuestion = true;
    };
};


$(".list-group").on("click", "#choices", function () {

    var userChoice = $(this).data("id");
    currentA = currentQ.correct;

    if (currentA === userChoice) {
        console.log("That's correct!.");
        countCorrect++;
        $(".card-header").text("Answers right: " + countCorrect);
        gifCorrect();
    } else {
        $(".card-header").text("That's incorrect!");
        countWrong++;
        console.log("Wrong: " + countWrong);
        gifWrong();
    };
});

function clearCard() {
    $(".card-header").empty();
    $(".list-group-flush").empty();
};

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

// $(".list-group").hover(function () {
//         $(this).css("background-color", "#1ec9f7");
//     },
//     function () {
//         $(this).css("background-color", "#1ec9f7");
//     });

// $(document).on("click", ".list-group", createTrivia);