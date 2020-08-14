let movies = [];
async function getData() {
    const url = "https://gist.githubusercontent.com/bstech-ux/e717b74dbd7cc95a8429eadc83a5c882/raw/ca85214d461ef93c316a47a6770c4b9ba678a6b3/movies.json";
    let response = await fetch(url);
    movies = await response.json();
    displayMovies();
    setPages();
}

getData();

function displayMovies(page = 1) {
    let movie_data = "";
    let max = page * 10;
    let min = max - 10;
    // Append Data to movie_data Variable
    for (let i = min; i < max; i++) {
        let movie = movies[i];
        if (movie) {
            movie_data +=
                `<tr>
                <td scope="row">${movie.id}</td>
                <td>${movie.title}</td>
                <td>${movie.director}</td>
                <td>${movie.distributor}</td>
                <td class="rating">${movie.imdb_rating}</td>
                <td class="votes">${movie.imdb_votes}</td>
            </tr>`;
        } else {
            break;
        }
    }
    let keys = Object.keys(movies[0]);
    let table_header = '<tr>';
    for (let i = 0; i < keys.length; i++) {
        let head = `<td scope="row">${keys[i]}</td>`;
        table_header += head;
    }
    movie_data = table_header + '</tr>' + movie_data;
    $('#table_data').html(movie_data);
}


function setPages() {
    let nbPages = Math.ceil(movies.length / 10);
    let pages = "";
    for (let i = 1; i <= nbPages; i++) {
        pages += '<button type="button" onClick="displayMovies(' + i + ')">' + i + '</button>'
    }
    let previous = '<button type="button" onClick="displayMovies(' + 1 + ')">' + '<' + '</button>';
    let last = '<button type="button" onClick="displayMovies(' + nbPages + ')">' + '>' + '</button>';
    pages = `${previous} ${pages} ${last}`;
    $('#pages').append(pages);
}