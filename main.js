const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
let searchQuery = '';
const APP_ID = '9753f33f';
const APP_KEY= '2691f4f2c2e5b89a09ebae1ce3a5529e';

const handleSearch = (event) => {
    event.preventDefault(); //method
    searchQuery = event.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
};

searchForm.addEventListener('submit', handleSearch);

const fetchAPI = async () => { // same as async function name
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q='${searchQuery}'&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(response);
    console.log (data);
}
const formatNumber = (numberToFormat) => {
  return Intl.NumberFormat().format(Math.round(numberToFormat))
}

 

const generateHTML = (results) => {
    let generatedHTML = "";
    const numberOfResults = results.length;
    console.log(numberOfResults);
    const highlightNumber = Math.floor(Math.random() * numberOfResults);
    console.log(highlightNumber);
    results.map((result, index) => {
        const itemClasses = index === highlightNumber ? 'item special' : 'item';

        generatedHTML += 
        `
        <div class=${itemClasses}>
                    <img src=${result.recipe.image}>
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-btn" href= ${result.recipe.url} target="_blank">View Recipe</a>
                    </div>
                    <p class="item-data">Calories: ${formatNumber(result.recipe.calories)}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
    }
