
let categoryState = "unselected";
const flashcardOptions = document.getElementById("flashcard-options");
const flashcardCont = document.getElementById("flashcard-container");
const flashcardBoard = document.getElementById("flashcard-board");
flashcardCont.addEventListener("click", e => {
    if (e.target.className === "option-button") {
        categoryButtonClicked(e.target);
        flashcardOptions.style.display = "none";
        flashcardBoard.style.display = "grid";
    };
});

function categoryButtonClicked(target) {
    switch (target.id) {
        case "hiragana-button":
            generateArray("hiragana");
            changeFlashcard(chosenCharArray[0]);
            break;
        case "katakana-button":
            generateArray("katakana");
            changeFlashcard(chosenCharArray[0]);
            break;
        case "all-button":
            generateArray("hiragana");
            generateArray("katakana");
            changeFlashcard(chosenCharArray[0]);
            break;
        default:
            break;
    }
}

let chosenCharArray = [];
let arrayCount = 0;
function generateArray(category) {
    let keys = Object.keys(json[category]);
    console.log(keys);
    for (i=0; i<keys.length; i++) {
        let temp = json[category][keys[i]];
        console.log(temp);
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

const kanaElement = document.getElementById("flashcard-kana");
const romajiElement = document.getElementById("flashcard-romaji");
function changeFlashcard(someObject) {
    kanaElement.innerText = someObject["kana"];
    if (isRomajiHidden === false) {
        romajiElement.innerText = someObject["romaji"];
    } else {
        romajiElement.innerText = "[ ]";
    }
}

let isRomajiHidden = false;
function hideRomaji(someObject) {
    if (isRomajiHidden === false) {
        romajiElement.innerText = "[ ]";
        isRomajiHidden = true;
    } else if (isRomajiHidden === true) {
        romajiElement.innerText = someObject["romaji"];
        isRomajiHidden = false;
    } else {
        return;
    }
}

const hideBtn = document.getElementById("hide-button-flashcard");
const shuffleBtn = document.getElementById("shuffle-button-flashcard");
const nextBtn = document.getElementById("next-button-flashcard");
const previousBtn = document.getElementById("previous-button-flashcard");
flashcardBoard.addEventListener("click", e => {
    if (e.target === nextBtn && arrayCount<chosenCharArray.length-1) {
        arrayCount++;
        changeFlashcard(chosenCharArray[arrayCount]);
    } else if (e.target === previousBtn && arrayCount>0) {
        arrayCount--;
        changeFlashcard(chosenCharArray[arrayCount]);
    } else if (e.target === shuffleBtn) {
        arrayCount = 0;
        chosenCharArray = shuffleArray(chosenCharArray);
        changeFlashcard(chosenCharArray[0]);
    } else if (e.target === hideBtn) {
        hideRomaji(chosenCharArray[arrayCount]);
    }
})
