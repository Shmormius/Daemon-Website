document.addEventListener("DOMContentLoaded", function() {
    fetch("halloween.json")
        .then(response => response.json())
        .then(data => {
            const bookJournal = document.getElementById("halloween-movies");

            data.forEach(movie => {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");

                // Create HTML structure for each movie entry
                movieDiv.innerHTML = `
                    <div class="left-movie">
                        <img src="${movie.cover}" class="movie-cover" id = "${movie.id}">
                        <div class="details">
                            <div class="title">
                                <p>${movie.title}</p>
                            </div>
                            <div class="director">
                                <p>Directed by ${movie.director}</p>
                            </div>
                            <div class="star-rating">
                                ${getStarRating(movie.ratingscary)}
                                ${getStarRating(movie.ratingenjoyment)}
                                ${getStarRating(movie.ratinghalloween)}
                            </div>
                            <div class="Date-watched">
                                <p>Watched: ${movie.dateWatched}</p>
                            </div>
                        </div>
                    </div>
                    <div class="right-movie">
                        
                    </div>
                `;

                // Append movie div to the movie journal container
                bookJournal.appendChild(movieDiv);
            });
        })
        .catch(error => console.error("Error fetching movie data:", error));

    // Function to generate star rating HTML
    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStar = 5 - (fullStars + halfStar);

        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        }
        if (halfStar) {
            starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        }
        for (let i = 0; i < emptyStar; i++) {
            starsHTML += '<i class="fa-regular fa-star"></i>';
        }
        return starsHTML;
    }
});

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const halloween = new Date(`October 31, ${currentYear} 00:00:00`);
    
    if (now > halloween) {
        halloween.setFullYear(currentYear + 1);
    }

    const diff = halloween - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("time").innerHTML = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);