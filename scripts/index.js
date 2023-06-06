import View from './View.js';
import Client from './Client.js';

// All of your javascript should go here
console.log("Hello from index.js");

const inputElement = document.getElementById('input');
const saveButton = document.querySelector('.btn-save');
const resetButton = document.querySelector('.btn-reset');

const client = new Client();
const showMovie = new View();
const movieList = JSON.parse(localStorage.getItem('movies')) || [];

// Funktion, um Daten zu holen und anzeigen zu lassen
const getData = (movie) => {
    // Daten aufrufen mit Methode von client.js 
    client.getMovieData(movie)
        // Weiterverarbeitung der Daten:
        .then((data) => {
            // anzeigen der Daten mit Methode aus view.js
            showMovie.displayMovieOnPage(data);
        })
}

// Daten anzeigen
// für jedes Element in der MovieList wird die Funktion getData() aufgerufen
// und somit die Daten geholt und angezeigt
// dies passiert auch, wenn Seite neu geladen wird
const showData = () => {
    movieList.forEach(movie => {
        getData(movie);
    });
}
showData();

// Anzeige resetten
const resetDisplay = () => {
    // Inputfeld Eingabe wird resettet:
    inputElement.value = '';

    // bereits vorhandener Film wird nich nochmal angezeigt:
    showMovie.removeDisplay();
}

// Daten speichern
const saveNewData = () => {
    // neuer Titel in movieList speichern
    movieList.push(inputElement.value);

    // movieList in localStorage einfügen
    localStorage.setItem('movies', JSON.stringify(movieList));
}

saveButton.addEventListener('click', (event) => {
    if (inputElement.value !== '' && !movieList.includes(inputElement.value)) {
        saveNewData();
        resetDisplay();
        showData();

    } else if (movieList.includes(inputElement.value)) {
        alert('This title already exists');
    } else if (inputElement.value == '') {
        alert('Please type in a movie title')
    }
});

resetButton.addEventListener("click", (event) => {
    localStorage.removeItem('movies');
    showMovie.removeDisplay();
    movieList.length == 0;
    alert('Move list reset successfully!');
});
