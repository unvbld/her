const loveButton = document.getElementById("loveButton");
const errorMessage = document.getElementById("errorMessage");
const loadingContainer = document.querySelector(".loading-container");
const loadingBar = document.getElementById("loadingBar");
const tryAgainButton = document.getElementById("tryAgainButton");
const backgroundMusic = document.getElementById("backgroundMusic");

let isMusicPlaying = false;
let attempts = 0; // Track the number of attempts

function resetLoadingBar() {
    loadingBar.style.width = "0%";
}

function startLoading() {
    attempts++; // Increment the attempt count
    loadingContainer.style.display = "block";
    loveButton.style.display = "none";
    tryAgainButton.style.display = "none";
    resetLoadingBar();

    if (!isMusicPlaying) {
        backgroundMusic.play(); // Start playing music
        isMusicPlaying = true;
    }

    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loadingBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingContainer.style.display = "none";
                if (attempts < 3) {
                    errorMessage.style.display = "block";
                    tryAgainButton.style.display = "block";
                } else {
                    errorMessage.textContent = "Move On"; // Change the error message
                    errorMessage.style.display = "block";
                }
            }, 2000);
        }
    }, 30);
}

function resetGame() {
    errorMessage.style.display = "none";
    loveButton.style.display = "block";
    resetLoadingBar();

    if (isMusicPlaying) {
        backgroundMusic.pause(); // Pause music
        isMusicPlaying = false;
    }

    if (attempts < 3) {
        tryAgainButton.style.display = "block";
    }
    startLoading();
}

loveButton.addEventListener("click", startLoading);
tryAgainButton.addEventListener("click", resetGame);
