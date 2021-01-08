
let categoryState = "unselected";
const testOptions = document.getElementById("test-options");
const testCont = document.getElementById("test-container");
document.addEventListener("click", e => {
    if (e.target.className === "option-button") {
        categoryButtonClicked(e.target);
        e.target.parentElement.style.display = "none";
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
function generateTestElements() {
    const div = document.createElement("div");
    const question = document.createElement("p");
    
}