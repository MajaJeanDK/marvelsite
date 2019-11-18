let jsonMovies = { //JavaScript variabel for vores film-liste
               //JSON liste over vores film-objekter
    "movie": [
        {
            // Et objekt
            "Title": "Captain America - The First Avenger",
            "YoutubeId": "s6V754RPnZc",
            /**
             * "Year": "2011",
             * "imdbRating": "6.9",
             * "Plot": "Steve Rogers, a rejected military soldier transforms into Captain America after taking a dose of a 'Super-Soldier serum'. But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization."
             */
        },
        {
            "Title": "Captain Marvel",
            "YoutubeId": "Z1BCujX3pw8",
            /**
             * "Year": "2019",
             * "imdbRating": "7.0",
             * "Plot": "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races."
             */
        },
        {
            "Title": "Iron Man",
            "YoutubeId": "sTQZj2B5vNw",
            /**
             * "Year": "2008",
             * "imdbRating": "7.9",
             * "Plot": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
             */
        },
        {
            "Title": "Iron Man 2",
            "YoutubeId": "BoohRoVA9WQ",
            /**
             * "Year": "2010",
             * "imdbRating": "7.0",
             * "Plot": "With the world now aware of his identity as Iron Man, Tony Stark must contend with both his declining health and a vengeful mad man with ties to his father's legacy."
             */
         },
        {
            "Title": "Thor",
            "YoutubeId": "vJUDu40Z_RY",
            /**
             * "Year": "2011",
             * "imdbRating": "7.0",
             * "Plot": "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders."
             */
         },
        {
            "Title": "The Incredible Hulk",
            "YoutubeId": "xbqNb2PFKKA",
            /**
             * "Year": "2008",
             * "imdbRating": "6.7",
             * "Plot": "Bruce Banner, a scientist on the run from the U.S. Government, must find a cure for the monster he turns into, whenever he loses his temper."
             */
         }
    ]
}


// mit omdbapi.com-link når jeg søger på titlen i URL'en. inkl. min API nøgle.
let url = "https://www.omdbapi.com/?apikey=f2c0c816&t=";

// Film: Captain America: The First Avenger, Captain Marvel, Iron Man, Iron Man 2, Thor, The Incredible Hulk
//let movies = ["Captain%20America%20-%20The%20First%20Avenger", "Captain%20Marvel", "Iron%20Man", "Iron%20Man%202", "thor", "The%20Incredible%20Hulk"]

// vi laver en variabel "container" for vores section-element der skal indeholde vores informationer.
let container = document.getElementById("grid-item-c");
// vi laver en variabel "sectionUl" for vores ul-element der skal indeholde vores link-liste (mobil).
let sectionUl = document.getElementById("ul-nav-item");

// Kode for at generere vores youtube-links.
let youtube = {

    /** Forventer et argument der enten er en youtube URL eller et id, og returnerer id'et tilbage. */
    getIdFromUrl: function (videoIdOrUrl) {
        if (videoIdOrUrl.indexOf('https') === 0) {
            return videoIdOrUrl.split('v=')[1];
        } else {
            return videoIdOrUrl;
        }
    },
    /** Forventer et argument der enten er en youtube URL eller et id, og returnerer den indsatte URL for videoen.*/
    generateEmbedUrl: function (videoIdOrUrl) {
        return 'https://www.youtube.com/embed/' + youtube.getIdFromUrl(videoIdOrUrl);
    }
};

// Vi laver et for loop som tager fat på alle vores film's informationer igennem deres JSON-URL.
for (let i = 0; i < jsonMovies.movie.length; i++) {
    let movie = jsonMovies.movie[i]; // variabel "movie" der indeholder movies nr. i (vores aray af json-objekter). Loopet tækker objekterne fra 0 til antallet af værdier i vores array-liste. hvor variablen i indeholder tallet vi er nået til i vores array.
    let fetchUrl = url + movie.Title; // vi sammensætter vores url med vores url-variabel og vores titel fra vores json--movie-objekt.
    fetch(fetchUrl)
    //Når vores "promise" er gennemført, trækker vi vores JSON data fra vores svarende objekt.
        .then(repsonse => {
            return repsonse.json();
        })
        .then(data => {
            const infobox = document.createElement("div");
            infobox.setAttribute("class", "infodiv");

            const h1 = document.createElement("h1");
            h1.setAttribute("class", "title");
            h1.setAttribute("id", movie.Title); // unikt id til menuen

            const pYear = document.createElement("p");
            pYear.setAttribute("class", "year");

            const pRating = document.createElement("p");
            pRating.setAttribute("class", "rating");

            const pPlot = document.createElement("p");
            pPlot.setAttribute("class", "description");

            h1.innerText = data.Title;
            var d = new Date(); // nuværrende tidspunkt
            var n = d.getFullYear(); // få årstallet for i år
            var np = n - parseInt(data.Year); // konverterer om til en int
            pYear.innerText = n + " (" + np + " Years old.)";
            pRating.innerText = "IMDB Rating: " + data.imdbRating;
            pPlot.innerText = data.Plot;

            // kodedelen for at vise vores videoer
            const videoBox = document.createElement("div");
            videoBox.setAttribute("class", "videoDiv");

            let videoEmbedIframe = document.createElement("iframe");
            // vores src har vores embed-url samt vores youtubeId fra vores json-movie-objekt
            videoEmbedIframe.setAttribute("src", youtube.generateEmbedUrl(movie.YoutubeId))
            videoEmbedIframe.setAttribute("allowFullscreen", '')

            // kodedel for min navigations-menu
            const liNav = document.createElement("li");
            const aNav = document.createElement("a")
            // Vi giver hvert anchor-element en source til hvert movie.Title-objekt.
            aNav.setAttribute("href", '#' + movie.Title);

            // vi laver selve teksten til vores menupunkter
            aNav.innerText = movie.Title;


            // appendChilds til mine informations-elementer
            infobox.appendChild(h1);
            infobox.appendChild(pYear);
            infobox.appendChild(pRating);
            infobox.appendChild(pPlot);
            container.appendChild(infobox);

            // appendChilds til mine video-elementer
            videoBox.appendChild(videoEmbedIframe);
            infobox.appendChild(videoBox);

            // appendChilds til mine menu-elementer
            liNav.appendChild(aNav);
            sectionUl.appendChild(liNav);
            }

        )
    }


// funktionalitet for min toggle menu
function openNav() {
    document.getElementById("mySidepanel").style.width = "80%";
}

function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}

/* Funktionalitet hvis browservindue resizes til desktop-størrelse med open toggle-menu */
function resizeOpenNavWhenDesktop(x) {
    if (x.matches) { // If media query matches
        document.getElementById("mySidepanel").style.width = "200px";
    } else {
        closeNav();
    }
}

var x = window.matchMedia("(min-width: 768px)")
resizeOpenNavWhenDesktop(x) // Call listener function at run time
x.addListener(resizeOpenNavWhenDesktop) // Attach listener function on state changes