const requestUrl = "https://raw.githubusercontent.com/joshron/kanafrog/main/kanas.json";
const request = new XMLHttpRequest();
let json;

request.open("GET", requestUrl);
request.responseType = "json";
request.send();
request.onload = () => {
    console.log("json request success");
    json = request.response;
}

let flashcardState = "unselected";
const flashcardOptions = document.getElementById("flashcard-options");
const flashcardCont = document.getElementById("flashcard-container");
flashcardOptions.addEventListener("click", e => {
    if (e.target.className !== "option-button") {
        return;
    } else {
        switch (e.target.id) {
            case "hiragana-flash-button":
                flashcardState = "hiragana";
                break;
            case "katakana-flash-button":
                flashcardState = "katakana";
                break;
            case "all-flash-button":
                flashcardState = "all";
                break;
            default:
                break;
        }
        flashcardOptions.style.display = "none";
    }
})