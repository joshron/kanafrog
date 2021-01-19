const FLASHCARD_OPTIONS = document.getElementById("flashcard-options");
const FLASHCARD_CONTAINER = document.getElementById("flashcard-container");
const FLASHCARD_BOARD = document.getElementById("flashcard-board");
const KANA_ELEMENT = document.getElementById("flashcard-kana");
const ROMAJI_ELEMENT = document.getElementById("flashcard-romaji");
const HIDE_BUTTON = document.getElementById("hide-button-flashcard");
const SHUFFLE_BUTTON = document.getElementById("shuffle-button-flashcard");
const NEXT_BUTTON = document.getElementById("next-button-flashcard");
const PREVIOUS_BUTTON = document.getElementById("previous-button-flashcard");

const BASE_HIRAGANA = document.getElementById("base-hiragana-button");
const MODIFIED_HIRAGANA = document.getElementById("modified-hiragana-button");
const ALL_HIRAGANA = document.getElementById("all-hiragana-button");
const BASE_KATAKANA = document.getElementById("base-katakana-button");
const MODIFIED_KATAKANA = document.getElementById("modified-katakana-button");
const ALL_KATAKANA = document.getElementById("all-katakana-button");

let categoryState = "unselected";
let chosenCharArray = [];
let arrayCount = 0;
let isRomajiHidden = false;

FLASHCARD_CONTAINER.addEventListener("click", e => {
    if (e.target.className === "option-button") {
        categoryButtonClicked(e.target);
        FLASHCARD_OPTIONS.style.display = "none";
        FLASHCARD_BOARD.style.display = "grid";
    };
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
}

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

function changeFlashcard(someObject) {
    KANA_ELEMENT.innerText = someObject["kana"];
    if (isRomajiHidden === false) {
        ROMAJI_ELEMENT.innerText = someObject["romaji"];
    } else {
        ROMAJI_ELEMENT.innerText = "[ ]";
    }
}

function hideRomaji(someObject) {
    if (isRomajiHidden === false) {
        ROMAJI_ELEMENT.innerText = "[ ]";
        isRomajiHidden = true;
    } else if (isRomajiHidden === true) {
        ROMAJI_ELEMENT.innerText = someObject["romaji"];
        isRomajiHidden = false;
    } else {
        return;
    }
}

FLASHCARD_BOARD.addEventListener("click", e => {
    if (e.target === NEXT_BUTTON && arrayCount<chosenCharArray.length-1) {
        arrayCount++;
        changeFlashcard(chosenCharArray[arrayCount]);
    } else if (e.target === PREVIOUS_BUTTON && arrayCount>0) {
        arrayCount--;
        changeFlashcard(chosenCharArray[arrayCount]);
    } else if (e.target === SHUFFLE_BUTTON) {
        arrayCount = 0;
        chosenCharArray = shuffleArray(chosenCharArray);
        changeFlashcard(chosenCharArray[0]);
    } else if (e.target === HIDE_BUTTON) {
        hideRomaji(chosenCharArray[arrayCount]);
    }
})
