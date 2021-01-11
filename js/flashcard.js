
let categoryState = "unselected";
const flashcardOptions = document.getElementById("flashcard-options");
const flashcardCont = document.getElementById("flashcard-container");
document.addEventListener("click", e => {
    if (e.target.className === "option-button") {
        categoryButtonClicked(e.target);
        e.target.parentElement.style.display = "none";
    } else if (e.target.className === "flashcard") {
        generateFlashcardElements(chosenCharArray[currentArrayNum]);
    } else {
        return;
    }
});

function categoryButtonClicked(target) {
    switch (target.id) {
        case "hiragana-button":
            generateArray("hiragana");
            generateFlashcardElements(chosenCharArray[0]);
            break;
        case "katakana-button":
            generateArray("katakana");
            generateFlashcardElements(chosenCharArray[0]);
            break;
        case "all-button":
            generateArray("hiragana");
            generateArray("katakana");
            generateFlashcardElements(chosenCharArray[0]);
            break;
        default:
            break;
    }
}

let chosenCharArray = [];
let currentArrayNum = 0;
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

function generateFlashcardElements(someObject) {
    flashcardCont.innerHTML = "";
    const romaji = someObject["romaji"];
    const kana = someObject["kana"];
    const div = document.createElement("div");
    const top = document.createElement("p");
    const bot = document.createElement("p");
    top.innerText = kana;
    bot.innerText = romaji;
    div.append(top);
    div.append(bot);
    div.className = "flashcard";
    flashcardCont.append(div);
    currentArrayNum++;
}