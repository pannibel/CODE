/* fetching the database */
const urlParams = new URLSearchParams(window.location.search);

const urlClues = "https://murdermystery-a1e7.restdb.io/rest/clues";
const urlOptions = "https://murdermystery-a1e7.restdb.io/rest/options";

const apikey = {
    headers: {
        "x-apikey": "6231ffc1dced170e8c83a2ea",
    },
};

const id = urlParams.get("id");
const text = urlParams.get("text");
const optionText = urlParams.get("optionText");
const options = urlParams.get("options");
const nextText = urlParams.get("nextText");
const setState = urlParams.get("setState");
const requiredState = urlParams.get("requiredState");

// fetch the data
fetch(urlClues, apikey)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    });


fetch(urlOptions, apikey)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });


/* selecting the text element in the html*/
const textElement = document.getElementById("text");
/* selecting the option buttons container */
const optionButtonsElement = document.getElementById("option-buttons");
/* this is going to keep track of where our character is */
let state = {}

/* this is going to start the game */
function startGame() {
    state = {};
    showClue(32);
}

/* this is going to display whichever option we're on
it's going to take a particular index from the database */
function showClue(id) {
    id = urlParams.get("id");
    textElement.innerText = text;

    /* this is removing the options */
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    /* adding the current options */
    options.forEach(optionText => {
        if (showOption(optionText)) {
            const button = document.createElement("button")
            button.innerText = options.optionText
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(optionText))
            optionButtonsElement.appendChild(button)
        }
    })
}

/* this is going to show our current options*/
function showOption(optionText) {
    return requiredState == null || optionText.requiredState(state)
}

/* this is going to happen every time we select an option */
function selectOption(optionText) {
    state = Object.assign(state, optionText.setState)
    showClue(nextText)
}

/* calling the startGame function as soon as the page loads */
startGame()