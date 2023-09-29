const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main')
const search = document.getElementById('search')
const form = document.getElementById('form')
getMovies(APIURL);

async function getMovies(url) {
    const respData = await fetch(url);
    const response = await respData.json();
    console.log(response);
    showMovies(response.results)
}


function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { poster_path, vote_average, title, overview } = movie;

        const moviesEl = document.createElement('div');
        moviesEl.classList.add('movieList')

        moviesEl.innerHTML = `
    <img src= "${IMGPATH + poster_path}" 
    title=   "${title}" ></img>
    <div class="movie-info">
                <h3>Movie : ${title}</h3>
                <span>IMDB : ${vote_average * 1.00}</span>
            </div>
    <div class="overview">
    <h3>Overview:</h3>
    ${overview}
    </div>
    `;
        main.appendChild(moviesEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const search_term = search.value;
    if (search_term) {
        getMovies(SEARCHAPI + search_term);
        search.value = ""
    }
});