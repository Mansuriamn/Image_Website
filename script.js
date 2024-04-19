const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const img_contain = document.querySelector(".img_contain");
const load = document.querySelector(".load");
let page = 1;

const Come = async (search_data, pageno) => {
    const key = `MeM_AMHlez-GtfG8eXJwZY-HGbWjccm6s_Bi33Yu2M4`; // Replace this with your Unsplash access key
    const url = `https://api.unsplash.com/search/photos?query=${search_data}&per_page=28&page=${pageno}&client_id=${key}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.results.length > 0) {
            if (data.total_pages === pageno) {
                load.style.display = "none";
            } else {
                load.style.display = "block";
            }

            // Clear previous images
            if (pageno === 1) {
                img_contain.innerHTML = '';
            }

            data.results.forEach(photo => {
                const imgelement = document.createElement('div');
                imgelement.classList.add('imgdiv');

                imgelement.innerHTML = `<img src="${photo.urls.regular}">`;
                const overleyelement = document.createElement('div');
                overleyelement.classList.add('overle');
                imgelement.appendChild(overleyelement);
                img_contain.appendChild(imgelement);

                const text = document.createElement('h3');
                text.innerText = `${photo.alt_description}`;
                overleyelement.appendChild(text);
            });
        } else {
            img_contain.innerHTML = `<h2>No Image Found.</h2>`;
            load.style.display = "none"; // Hide load button if there are no images
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const search_data = search.value.trim();
    if (search_data !== "") {
        page = 1;
        Come(search_data, page);
    } else {
        img_contain.innerHTML = `<h2>Please enter a search term.</h2>`;
        load.style.display = "none"; // Hide load button if there's no search term
    }
});

load.addEventListener('click', () => {
    Come(search.value.trim(), ++page);
});
// Function to generate a random search term
function getRandomSearchTerm() {
    const searchTerms = ["nature", "city", "animals", "architecture"]; // Add more search terms as needed
    return searchTerms[Math.floor(Math.random() * searchTerms.length)];
}

// Function to initialize the page with random images
function initializePage() {
    const randomSearchTerm = getRandomSearchTerm();
    Come(randomSearchTerm, page);
}

// Call initializePage when the page loads
window.addEventListener('load', initializePage);
