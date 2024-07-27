const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const api_Key = "e3f7a7d4279144f9b0d0cfd4dae9483b";
const country = "ma";
const options = [
    "general", 
    "entertainment", 
    "health", 
    "science", 
    "sports",
    "technology",
];

let requestUrl;

const generateUI = (articles) => {
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
        <div class="news-image-container">
          <img src="${item.urlToImage || "./newspaper.jpg"}" alt=""/>
        </div>
        <div class="news-content">
          <div class="news-title">
            ${item.title}
          </div>
          <div class="news-description">
            ${item.description || item.content || ""}
          </div>
          <a href="${item.url}" target="_blank" class="view-button">Read more</a>
        </div>`;
        container.appendChild(card);
    }
};

const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestUrl);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try later.");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    requestUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_Key}`;
    e.target.classList.add("active");
    getNews();
};

const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `
        <button class="option ${
        i === "general" ? "active" : ""}"
        onclick="selectCategory(event, '${i}')">${i}</button>`;
    }
};

const init = () => {
    optionsContainer.innerHTML = "";
    createOptions();
    getNews();
};

window.onload = () => {
    requestUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
};
