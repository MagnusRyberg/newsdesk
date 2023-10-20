// script.js

const newsContainer = document.getElementById("news-container");

async function fetchRSSFeed(feed) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed.url}`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(`Error fetching ${feed.title} RSS feed: ${error}`);
        return [];
    }
}

function displayArticles(articles, source) {
    articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.className = "article";
        articleElement.setAttribute("data-source", source); // Add the data-source attribute
        articleElement.innerHTML = `
            <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
            <p>${article.pubDate}</p>
            <p>${article.description}</p>
        `;
        newsContainer.appendChild(articleElement);
    });
}

async function loadRSSFeeds() {
    for (const feed of rssLinks) {
        const articles = await fetchRSSFeed(feed);
        displayArticles(articles, feed.title); // Pass the feed title to displayArticles
    }
}

loadRSSFeeds();
