// Cowboy Bebob Trivia Game///////////////////////////////////////////////////////////////////////////////

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
var time = 11;
var trivia;
var endGame = false;
var shuffleDeck;
// resetGame();

// An Array of Object-Questions///////////////////////////////////////////////////////////////////////////
function resetGame() {

    start();
    randFour = 0;
    correctMessage;
    wrongMessage;
    funcAudio = new Audio("");
    countCorrect = 0;
    countWrong = 0;
    RNG = 0;
    currentQ;
    currentA;
    lastQuestion = false;
    timerRunning = false;
    endGame = false;
    intervalId;
    time = 11;
    trivia = [];
    shuffleDeck;
    trivia.push({
        question: "What year was Cowboy Bebop released in Japan?",
        answer: ["1998", "2001", "1985", "2015"],
        correct: 0
    });
    trivia.push({
        question: "Who is the main protagonist of Cowboy Bebop?",
        answer: ["Domino", "Vincent", "Naruto", "Spike"],
        correct: 3
    });
    trivia.push({
        question: "Who does the English voice acting for Faye Valentine?",
        answer: ["Melissa Fahn", "Wendee Lee", "Ellen Page", "Aoi Tada"],
        correct: 1
    });
    trivia.push({
        question: "Who directed Cowboy Bebop?",
        answer: ["Yoko Nobumoto", "Shinichiro Watanabe", "Michael Bay", "Sunrise"],
        correct: 1
    });
    trivia.push({
        question: "Spike and Vicious were once members of this Syndicate...",
        answer: ["Red Lotus Syndicate", "Green Dragon Syndicate", "Red Tiger", "Red Dragon Syndicate"],
        correct: 3
    });
    trivia.push({
        question: "What is the name of the blues and jazz band that was created by Yoko Kanno to perform the music of the anime?",
        answer: ["Seatbelts", "Bebop", "Tank!", "Space Dandy"],
        correct: 0
    });
    trivia.push({
        question: "In the episode 'Stray Dog Strut' which character made their first appearance?",
        answer: ["Hakim", "Ein", "Vicious", "Rocco Bonnaro"],
        correct: 1
    });
    trivia.push({
        question: "How many episodes are there, not including the 'Mish-Mash Blues'?",
        answer: ["35", "15", "25", "26"],
        correct: 3
    });
};

function gifCorrect() {

    stop();
    $(".answer-image").empty();
    randFour = Math.floor(Math.random() * 4);
    var cGIF = correctGIF[randFour];
    var gifCImage = $("<img src='" + cGIF + "'>");
    $(".list-group-flush").empty()

    correctMessage = $("<div id='correctMessage'>").text("The answer was: " + currentQ.answer[currentA] + ".");
    $(".answer-image").append(gifCImage).append(correctMessage);
    if (lastQuestion !== true) {
        setTimeout(clearCard, 3000);
        setTimeout(createTrivia, 3000);
        setTimeout(start, 3000);
    } else {
        clearCard();
        createTrivia();
    };
};

function gifWrong() {

    stop();
    $(".answer-image").empty();
    randFour = Math.floor(Math.random() * 4);
    var wGIF = wrongGIF[randFour];
    var gifWImage = $("<img src='" + wGIF + "'>");
    $(".list-group-flush").empty()
    wrongMessage = $("<div id='incorrectMessage'>").text("The answer was: " + currentQ.answer[currentA] + ".");
    $(".answer-image").append(gifWImage).append(wrongMessage);

    if (lastQuestion !== true) {
        setTimeout(clearCard, 3000);
        setTimeout(createTrivia, 3000);
        setTimeout(start, 3000);
    } else {
        clearCard();
        createTrivia();
    };

};

// Possible variables for hide/show///////////////////////////////////////////////////////////////////////
$(".q-card").hide();
$(".title-space").hide();
$(".blue-boy").hide();
$(".new-game").hide();
$(".countdown").hide();

// CREATE ALL THE THINGS//////////////////////////////////////////////////////////////////////////////////
function playGame() {

    stop();
    resetGame();
    funcAudio = new Audio("../TriviaGame-cowboy-bebop/assets/audio/tank.mp3");
    $(".play-game").hide();
    $(".new-game").hide();
    $(".blue-boy").show();
    $(".title-space").show();
    $(".trivia-area").show();
    $(".q-card").show();
    $(".countdown").show();
    $(".endResults").hide();
    funcAudio.play();
    console.log(funcAudio);
    createTrivia();

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
    time = 11;
};

function timesUp() {
    $(".card-header").text("Time's Up!");
    countWrong++;
    gifWrong();
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

    time = 11;
    $(".answer-image").empty();

    if (lastQuestion === true && countCorrect >= countWrong) {
        lastQuestion = false;
        stop();
        $(".endResults").text("Nice work! Your total correct was " + countCorrect + ", and your total wrong was " + countWrong + ".");
        $(".q-card").hide();
        $(".play-game").hide();
        $(".countdown").hide();
        $(".endResults").show();
        funcAudio.pause();
        $(".new-game").show();
        return endGame = true;
    };

    if (lastQuestion === true && countWrong >= countCorrect) {
        lastQuestion = false;
        stop();
        $(".endResults").text("Do you even watch this anime? Your total correct was " + countCorrect + ", and your total wrong was " + countWrong + ".");
        $(".q-card").hide();
        $(".play-game").hide();
        $(".countdown").hide();
        $(".endResults").show();
        funcAudio.pause();
        $(".new-game").show();
        return endGame = true;
    };

    if (endGame === true) {
        return false;
    }

    shuffleDeck = shuffle(trivia);
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
        countCorrect++;
        $(".card-header").text("That's " + countCorrect + " correct!");
        gifCorrect();
    } else {
        countWrong++;
        $(".card-header").text("That's " + countWrong + " incorrect so far.");
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