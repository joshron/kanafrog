
let categoryState = "unselected";
const testOptions = document.getElementById("test-options");
const testCont = document.getElementById("test-container");
const questionCont = document.getElementById("question-container");
document.addEventListener("click", e => {
    if (e.target.className === "option-button") {
        categoryButtonClicked(e.target);
        testOptions.style.display = "none";
        questionCont.style.display = "grid";
        answerChoices(chosenCharArray);
        let answers = answerChoices(chosenCharArray);
        populateQuestion(chosenCharArray[0]["kana"], answers);
    } else {
        return;
    }
});

function categoryButtonClicked(target) {
    switch (target.id) {
        case "hiragana-button":
            generateArray("hiragana");
            shuffleArray(chosenCharArray);
            break;
        case "katakana-button":
            generateArray("katakana");
            shuffleArray(chosenCharArray);
            break;
        case "all-button":
            generateArray("hiragana");
            generateArray("katakana");
            shuffleArray(chosenCharArray);
            break;
        default:
            break;
    }
}

let chosenCharArray = [];
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
    for (i=array.length-1; i > 0; i--) {
        let rand = Math.floor(Math.random() * i);
        let temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
    return array;
}

function answerChoices(array) {
    let answerArray = [];
    const correctAnswer = array[currentNum]["romaji"];
    while (answerArray.length < 3) {
        let rand = Math.floor(Math.random()*array.length);
        if (rand !== currentNum) {
            let answer = array[rand]["romaji"];
            answerArray.push(answer);
        }
    }
    answerArray.push(correctAnswer);
    answerArray = shuffleArray(answerArray);
    return answerArray;
}

let currentNum = 0;

const testQuestion = document.getElementById("test-question");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
function populateQuestion(question, answerArray) {
    testQuestion.innerText = question;
    answer1.innerText = answerArray[0];        
    answer2.innerText = answerArray[1];        
    answer3.innerText = answerArray[2];        
    answer4.innerText = answerArray[3];        
}

const scoreEle = document.getElementById("score-status");
const answerEle = document.getElementById("answer-status");
let score = 0;
questionCont.addEventListener("click", e => {
    if (e.target.className === "answer-button") {
        if (e.target.innerText === chosenCharArray[currentNum]["romaji"]) {
            answerEle.innerText = "Correct";
            score++;
        } else {
            answerEle.innerText = "Incorrect";
        }
        currentNum++;
        scoreEle.innerText = `${score}/${currentNum}`;
        let answers = answerChoices(chosenCharArray);
        populateQuestion(chosenCharArray[currentNum]["kana"], answers);
    }
})