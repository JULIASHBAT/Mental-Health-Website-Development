const pages = {
    "home": "white",
    "self-helping": "lightblue",
    "about": "lightgreen",
    "professional-help": "lightred",
    "Stress-tools":"red"

};
const pagesHTML = {
    "home": "home.html",
    "self-helping": "self-helping.html",
    "about": "about.html", 
    "professional-help": "Professional-help.html",
    "stress-tools":"Stress-tools.html"
};



const showPage = (page => {
//

    // Check if the page has an associated color and change the background
    // if (pages[page]) {
    //  document.querySelector("h1").innerText = page;
    //     document.querySelector('#content').style.backgroundColor = pages[page];
    //     console.log(pages[page]);
    // } else {
    //     console.log("No color found for ", page);
    // }

    // Check if the page has an associated HTML file and load it
    if (pagesHTML[page]) {
        loadExternalHTML(pagesHTML[page]);
    } else {
        console.log("No HTML file found for ", page);
    }
});

function loadExternalHTML(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            document.getElementById('htmlpages').innerHTML = html;
        })
        .catch(error => console.error('Error loading the HTML file:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnThemeMode").addEventListener("click", function() {
        document.documentElement.classList.toggle("dark");
        document.getElementById("btnThemeMode").innerText = document.documentElement.classList.contains("dark") ? "Light" : "Dark";
    });

    document.getElementById("menuBtn").addEventListener("click", function() {
        var menu = document.getElementById("menu");
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
        }
    });
    document.querySelectorAll("a").forEach(function(el) {
        el.addEventListener("click", function() {
            const pageName = el.innerText.toLowerCase();
            console.log(1121+pageName);
            showPage(pageName);
        });
    });

    // Optionally load a default page on DOMContentLoaded
    // showPage('home'); // Uncomment this line if you want to load the 'home' page by default
});
