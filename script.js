const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

let searches = JSON.parse(localStorage.getItem("searches")) || [];

const apiKey = "pZuoa3KGvXpVVq5iV8dOMI3nYb7Q0WpVvBsTuUbF";

getCurrentImageOfTheDay();

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
  searchInput.value = "";
});

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetchImageOfTheDay(currentDate);
}

function getImageOfTheDay(date) {
  fetchImageOfTheDay(date);
  saveSearch(date);
  addSearchToHistory();
}

function fetchImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayImageOfTheDay(data);
    })
    .catch((error) => console.log(error));
}

function displayImageOfTheDay(data) {
  currentImageContainer.innerHTML = `
    <h2>Picture of the Day (${data.date})</h2>
    <img src="${data.url}" alt="${data.title}">
    <p>${data.explanation}</p>
  `;
}

function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory() {
  searchHistory.innerHTML = "";
  searches.forEach((search) => {
    const listItem = document.createElement("li");
    listItem.textContent = search;
    listItem.addEventListener("click", () => {
      getImageOfTheDay(search);
    });
    searchHistory.appendChild(listItem);
  });
}

addSearchToHistory();

// removed duplicate functions and code