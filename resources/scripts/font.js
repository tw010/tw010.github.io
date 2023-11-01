const API_KEY = "AIzaSyAz6BrZAKm3LIGjReArsDyWjxwVDT3iLyI";
let fontsList = [];

loadFontsList()
async function loadFontsList() {
    try {
        const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY);
        const data = await result.json();
        fontsList = data.items
        return data.items;
    } catch (error) {
        console.log('loadFontsList', error, error.message);
    }
}

let fontI = 0

function updateFont() {
    fontI = Math.floor(Math.random()*fontsList.length)
    document.getElementById("font").innerHTML = `@font-face {font-family: font; src: url(${fontsList[fontI].files.regular.replace("http", "https")});}`
}

setInterval(function(){
    updateFont()
}, 2000)