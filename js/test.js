
const TEST_OPTIONS = document.getElementById("test-options");
const TEST_CONTAINER = document.getElementById("test-container");
const QUESTION_CONTAINER = document.getElementById("question-container");
const SCORE_SCREEN_CONTAINER = document.getElementById("score-screen");
const SCORE_SCREEN_SCORE = document.getElementById("score-screen-score");
const REPLAY_BUTTON = document.getElementById("replay-button");
const RESTART_BUTTON = document.getElementById("restart-button-test");
const TEST_QUESTION = document.getElementById("test-question");
const SCORE_ELEMENT = document.getElementById("score-status");
const ANSWER_ELEMENT = document.getElementById("answer-status");
const ANSWER_1 = document.getElementById("answer1");
const ANSWER_2 = document.getElementById("answer2");
const ANSWER_3 = document.getElementById("answer3");
const ANSWER_4 = document.getElementById("answer4");

const BASE_HIRAGANA = document.getElementById("base-hiragana-button");
const MODIFIED_HIRAGANA = document.getElementById("modified-hiragana-button");
const ALL_HIRAGANA = document.getElementById("all-hiragana-button");
const BASE_KATAKANA = document.getElementById("base-katakana-button");
const MODIFIED_KATAKANA = document.getElementById("modified-katakana-button");
const ALL_KATAKANA = document.getElementById("all-katakana-button");

let categoryState = "unselected";
let chosenCharArray = [];
let currentQuestionIndex = 0;
let score = 0;

TEST_OPTIONS.addEventListener("click", e => {
    if (e.target.className === "option-button") {
        categoryButtonClicked(e.target);
        TEST_OPTIONS.style.display = "none";
        QUESTION_CONTAINER.style.display = "grid";
        let answers = answerChoices(chosenCharArray);
        populateQuestion(chosenCharArray[0]["kana"], answers);
    }
});

document.addEventListener("click", e => {
    if (e.target === REPLAY_BUTTON || e.target === RESTART_BUTTON) {
        chosenCharArray = [];
        currentQuestionIndex = 0;
        score = 0;
        SCORE_SCREEN_CONTAINER.style.display = "none";
        TEST_OPTIONS.style.display = "flex";
        QUESTION_CONTAINER.style.display = "none";
        SCORE_ELEMENT.innerHTML = "";
        ANSWER_ELEMENT.innerHTML = "";
    }
});

function categoryButtonClicked(target) {
    switch (target) {
        case BASE_HIRAGANA:
            generateArray("hiragana-base");
            break;
        case MODIFIED_HIRAGANA:
            generateArray("hiragana-modified");
            break;
        case ALL_HIRAGANA:
            generateArray("hiragana-base");
            generateArray("hiragana-modified");
            break;
        case BASE_KATAKANA:
            generateArray("katakana-base");
            break;
        case MODIFIED_KATAKANA:
            generateArray("katakana-modified");
            break;
        case ALL_KATAKANA:
            generateArray("katakana-base");
            generateArray("katakana-modified");
            break;
        default:
            break;
    }
    shuffleArray(chosenCharArray);
}

function generateArray(category) {
    const keys = Object.keys(json[category]);
    for (i=0; i<keys.length; i++) {
        let temp = json[category][keys[i]];
        for (j=0; j<temp.length; j++) {
            chosenCharArray.push(temp[j]);
        }
    }        
}

function shuffleArray(array) {
    for (i=array.length-1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
    return array;
}

function answerChoices(array) {
    let answerArray = [];
    const correctAnswer = array[currentQuestionIndex]["romaji"];
    while (answerArray.length < 3) {
        let rand = Math.floor(Math.random()*array.length);
        if (rand !== currentQuestionIndex) {
            let answer = array[rand]["romaji"];
            answerArray.push(answer);
        }
    }
    answerArray.push(correctAnswer);
    answerArray = shuffleArray(answerArray);
    return answerArray;
}

function populateQuestion(question, answerArray) {
    TEST_QUESTION.innerText = question;
    ANSWER_1.innerText = answerArray[0];        
    ANSWER_2.innerText = answerArray[1];        
    ANSWER_3.innerText = answerArray[2];        
    ANSWER_4.innerText = answerArray[3];        
}

QUESTION_CONTAINER.addEventListener("click", e => {
    if (e.target.className === "answer-button") {
        checkAnswer(e.target.innerText);
        checkQuestionCount();        
    }
})

function checkAnswer(answerString) {
    if (answerString === chosenCharArray[currentQuestionIndex]["romaji"]) {
        ANSWER_ELEMENT.innerText = "Correct";
        score++;
    } else {
        ANSWER_ELEMENT.innerText = "Incorrect";
    }
    currentQuestionIndex++;
    SCORE_ELEMENT.innerText = `${score}/${currentQuestionIndex}`;    
}

function checkQuestionCount() {
    if (currentQuestionIndex>=chosenCharArray.length) {
        revealScoreScreen();
    } else {
        let answers = answerChoices(chosenCharArray);
        populateQuestion(chosenCharArray[currentQuestionIndex]["kana"], answers);
    }
}

function revealScoreScreen() {
    SCORE_SCREEN_CONTAINER.style.display = "flex";
    SCORE_SCREEN_SCORE.innerText = `${score}/${currentQuestionIndex}`;    
}