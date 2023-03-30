const GenerateButton = document.getElementById('generate');
const Joke = document.getElementById('joke');
const LikeButton = document.getElementById('like');
const DislikeButton = document.getElementById('dislike');
const GenerateNewButton = document.getElementById('generate-new');
const LikedJokesButton = document.getElementById('liked-jokes');
const DislikedJokesButton = document.getElementById('disliked-jokes');
const LikedJokesList = document.getElementById('liked-jokes-list');
const DislikedJokesList = document.getElementById('disliked-jokes-list');
const CloseButtons = document.getElementsByClassName('close');
const JokeApi = 'https://sv443.net/jokeapi/v2/joke/Pun?blacklistFlags=nsfw,religious,political,sexist,explicit&type=single';
const headerText = document.querySelector('h1');
const headerTextContent = headerText.textContent;

LikeButton.style.display = 'none';
DislikeButton.style.display = 'none';
GenerateNewButton.style.display = 'none';

class LikedJokes {
    constructor() {
        this.jokes = [];
    }

    addJoke(joke) {
        this.jokes.push(joke);
    }

    getJokes() {
        return this.jokes;
    }
}

class DislikedJokes {
    constructor() {
        this.jokes = [];
    }

    addJoke(joke) {
        this.jokes.push(joke);
    }

    getJokes() {
        return this.jokes;
    }
}

const likedJokes = new LikedJokes();
const dislikedJokes = new DislikedJokes();

GenerateButton.addEventListener('click', () => {
    fetch(JokeApi)
        .then(response => response.json())
        .then(data => {
            //if (data.joke && data.flags.racist === true){    
            if (data.joke){               
                    if (likedJokes.getJokes().includes(data.joke) || dislikedJokes.getJokes().includes(data.joke)) {
                    GenerateButton.click();
                    } else {
                        Joke.innerHTML = data.joke;
                        LikeButton.style.display = 'inline-block';
                        DislikeButton.style.display = 'inline-block';
                        GenerateButton.style.display = 'none';
                        GenerateNewButton.style.display = 'none';
                    }
            } else {
                try{
                for (let i = 0; i < 5; i++) {
                    GenerateButton.click();
                }
                } catch (error) {
                    Joke.innerHTML = 'No more jokes';
                }
            }
        })
        .catch(error => console.log(error));
});

GenerateNewButton.addEventListener('click', () => {
    GenerateButton.click();
});

LikeButton.addEventListener('click', () => {
    likedJokes.addJoke(Joke.innerHTML);
    LikeButton.style.display = 'none';
    DislikeButton.style.display = 'none';
    GenerateNewButton.style.display = 'inline-block';
});

DislikeButton.addEventListener('click', () => {
    dislikedJokes.addJoke(Joke.innerHTML);
    LikeButton.style.display = 'none';
    DislikeButton.style.display = 'none';
    GenerateNewButton.style.display = 'inline-block';
});

for (let i = 0; i < CloseButtons.length; i++) {
    CloseButtons[i].addEventListener('click', () => {
        CloseButtons[i].parentElement.parentElement.parentElement.style.display = 'none';
    });
}

LikedJokesButton.addEventListener('click', () => {
    const LikedJokesPopup = document.getElementById('liked-jokes-popup');
    LikedJokesPopup.style.display = 'block';
    LikedJokesList.innerHTML = '';
    likedJokes.getJokes().forEach(joke => {
        const li = document.createElement('li');
        li.innerHTML = '&#128077;' + joke;
        LikedJokesList.appendChild(li);
    });
});

DislikedJokesButton.addEventListener('click', () => {
    const DislikedJokesPopup = document.getElementById('disliked-jokes-popup');
    DislikedJokesPopup.style.display = 'block';
    DislikedJokesList.innerHTML = '';
    dislikedJokes.getJokes().forEach(joke => {
        const li = document.createElement('li');
        li.innerHTML = '&#128078;' + joke;
        DislikedJokesList.appendChild(li);
    });
});

headerText.textContent = '';
let x = 0;
const animateHeaderText = () => {
    if (x < headerTextContent.length) {
        headerText.textContent += headerTextContent[x];
        x++;
        setTimeout(animateHeaderText, 500);
    }
}
animateHeaderText();