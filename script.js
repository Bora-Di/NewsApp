document.getElementById('menu_icon').addEventListener('click', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
});

const selectCategory = async (event, category) => {
    const container = document.querySelector(".container");
    const apiKey = "e3f7a7d4279144f9b0d0cfd4dae9483b";
    const country = "ma";
    let requestUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

    const generateUI = (articles) => {
        container.innerHTML = "";
        for (let item of articles) {
            let card = document.createElement("div");
            card.classList.add("news-card");
            card.innerHTML = `
                <div class="news-image-container">
                    <img src="${item.urlToImage || "./newspaper.jpg"}" alt=""/>
                </div>
                <div class="news-content">
                    <div class="news-title">${item.title}</div>
                    <div class="news-description">${item.description || item.content || ""}</div>
                    <a href="${item.url}" target="_blank" class="view-button">Read more</a>
                </div>`;
            container.appendChild(card);
        }
    };

    try {
        let response = await fetch(requestUrl);
        if (!response.ok) {
            alert("Data unavailable at the moment. Please try later.");
            return;
        }
        let data = await response.json();
        generateUI(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }

    document.querySelectorAll(".option").forEach(el => el.classList.remove("active"));
    event.target.classList.add("active");
};

window.onload = () => {
    selectCategory({target: document.querySelector(".option.active")}, "general");
};
