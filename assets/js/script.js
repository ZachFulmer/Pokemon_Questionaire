var mainPage = document.querySelector("#main-page");
var rulesPage = document.querySelector("#rule-page");
var gameStartPage = document.querySelector("#game-start-page");
var displayPokemonContainer = document.querySelector("#display-pokemon");
var displayFactsGroup = document.querySelector("#fact-group");
var leaderboardPage = document.querySelector("#leaderboard-page");
var pokemonImageEl = document.querySelector("#pokemon-image");

var rulesHandler = function(event)
{
    if(event.target.id == "test-your-skill")
    {
        mainPage.classList.replace("visible","hidden");
        rulesPage.classList.replace("hidden","visible");
        gameStartPage.classList.replace("visible","hidden");
        leaderboardPage.classList.replace("visible","hidden");
    }
};

var startGameHandler = function(event)
{
    if(event.target.id == "start-game")
    {
        mainPage.classList.replace("visible","hidden");
        rulesPage.classList.replace("visible","hidden");
        gameStartPage.classList.replace("hidden","visible");
        leaderboardPage.classList.replace("visible","hidden");

        startGame();
    }
};

var answerBtnHandler = function(event)
{
    if(event.target.id == "answer-1" || event.target.id == "answer-2" || event.target.id == "answer-3" || event.target.id == "answer-4")
    {
        if(event.target.textContent == game.gameData.correctAnswer)
        {
            game.userScore += 10;
            game.updateScore();
            displayAnswer(true);
        }
        else
        {
            // Incorrect Answer
            game.lives -= 1;
            game.updateLives();
            game.userScore -= 10;
            game.updateScore();
            if(game.lives == 0)
            {
                gameStartPage.classList.replace("visible","hidden");
                leaderboardPage.classList.replace("hidden","visible");

                displayFactsGroup.classList.replace("visible","hidden");
                $("#answer-1").removeClass("hidden");
                $("#answer-2").removeClass("hidden");
                $("#answer-3").removeClass("hidden");
                $("#answer-4").removeClass("hidden");

                displayPokemonContainer.style.backgroundColor = "#f08700";

                displayScoreboard();

            }
            else
            {
                displayAnswer(false);
            }

        }
    }
    else if(event.target.id == "nextBtn")
    {
        displayFactsGroup.classList.replace("visible","hidden");
        $("#answer-1").removeClass("hidden");
        $("#answer-2").removeClass("hidden");
        $("#answer-3").removeClass("hidden");
        $("#answer-4").removeClass("hidden");

        displayPokemonContainer.style.backgroundColor = "#f08700";

        getRandomPokemon();
    }
    else if(event.target.id == "exitBtn")
    {
        gameStartPage.classList.replace("visible","hidden");
        leaderboardPage.classList.replace("hidden","visible");

        displayFactsGroup.classList.replace("visible","hidden");
        $("#answer-1").removeClass("hidden");
        $("#answer-2").removeClass("hidden");
        $("#answer-3").removeClass("hidden");
        $("#answer-4").removeClass("hidden");

        displayPokemonContainer.style.backgroundColor = "#f08700";

        displayScoreboard();
    }
};

var restartBtnHandler = function(event)
{
    resetRankings();
    startGame();
};

var game = 
{
    userName: "",
    userScore: 0,
    lives: 3,
    gameover: false,
    gameData: 
    {
        artUrl: "",
        fact1: "",
        fact2: "",
        fact3: "",
        poke1: "",
        poke2: "",
        poke3: "",
        poke4: "",
        correctAnswer: ""
    },
    updateLives: function()
    {
        var life1 = document.querySelector("#life-one");
        var life2 = document.querySelector("#life-two");
        var life3 = document.querySelector("#life-three");

        switch(this.lives)
        {
            case 0:
                this.gameover = true;
                life1.style.visibility = "hidden";
                life2.style.visibility = "hidden";
                life3.style.visibility = "hidden";
                break;
            case 1:
                life2.style.visibility = "hidden";
                break;
            case 2:
                life3.style.visibility = "hidden";
                break;
            case 3:
                life1.style.visibility = "visible";
                life2.style.visibility = "visible";
                life3.style.visibility = "visible";           
                break;
        }
    },
    updateScore: function()
    {
        var scoreDisplay = document.querySelector("#scoreCount");

        scoreDisplay.innerHTML = "Score: " + this.userScore;
    }
};

var getRandomPokemon = function()
{
    var correctButton = Math.floor(Math.random() * 4) + 1;

    var returnName = "";

    var randomId = Math.floor(Math.random() * 898) + 1;
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + randomId;

    fetch(apiUrl).then(function(response)
    {
        response.json().then(function(data)
        {
            var answerBtn = document.querySelector("#answer-1");

            if(correctButton == 1)
            {
                var abilities = "";

                game.gameData.correctAnswer = data.name;
                returnName = data.name;
                game.gameData.artUrl = data.sprites.other["official-artwork"].front_default;
                game.gameData.fact1 = "This Pokemon's Pokedex number is " + randomId + ".";
                game.gameData.fact2 = "This Pokemon's is a " + data.types[0].type.name + " type pokemon.";
                for(var i = 0; i < data.abilities.length; i++)
                {
                    if((i+1) == data.abilities.length)
                    {
                        // Last Ability
                        abilities += data.abilities[i].ability.name;
                    }
                    else
                    {
                        abilities += data.abilities[i].ability.name + " | ";
                    }
                }
                game.gameData.fact3 = "This Pokemon's abilities are " + abilities;

                pokemonImageEl.setAttribute("src",game.gameData.artUrl);
                answerBtn.textContent = game.gameData.correctAnswer
            }
            else
            {
                game.gameData.poke1 = data.name
                answerBtn.textContent = data.name;
            }
        });
    });

    randomId = Math.floor(Math.random() * 898) + 1;
    apiUrl = "https://pokeapi.co/api/v2/pokemon/" + randomId;

    fetch(apiUrl).then(function(response)
    {
        response.json().then(function(data)
        {
            var answerBtn = document.querySelector("#answer-2");

            if(correctButton == 2)
            {
                var abilities = "";

                game.gameData.correctAnswer = data.name;
                returnName = data.name;
                game.gameData.artUrl = data.sprites.other["official-artwork"].front_default;
                game.gameData.fact1 = "This Pokemon's Pokedex number is " + randomId + ".";
                game.gameData.fact2 = "This Pokemon's is a " + data.types[0].type.name + " type pokemon.";
                for(var i = 0; i < data.abilities.length; i++)
                {
                    if((i+1) == data.abilities.length)
                    {
                        // Last Ability
                        abilities += data.abilities[i].ability.name;
                    }
                    else
                    {
                        abilities += data.abilities[i].ability.name + " | ";
                    }
                }
                game.gameData.fact3 = "This Pokemon's abilities are " + abilities;

                pokemonImageEl.setAttribute("src",game.gameData.artUrl);
                answerBtn.textContent = game.gameData.correctAnswer
            }
            else
            {
                game.gameData.poke2 = data.name
                answerBtn.textContent = data.name;
            }
        });
    });

    randomId = Math.floor(Math.random() * 898) + 1;
    apiUrl = "https://pokeapi.co/api/v2/pokemon/" + randomId;

    fetch(apiUrl).then(function(response)
    {
        response.json().then(function(data)
        {
            var answerBtn = document.querySelector("#answer-3");

            if(correctButton == 3)
            {
                var abilities = "";

                game.gameData.correctAnswer = data.name;
                returnName = data.name;
                game.gameData.artUrl = data.sprites.other["official-artwork"].front_default;
                game.gameData.fact1 = "This Pokemon's Pokedex number is " + randomId + ".";
                game.gameData.fact2 = "This Pokemon's is a " + data.types[0].type.name + " type pokemon.";
                for(var i = 0; i < data.abilities.length; i++)
                {
                    if((i+1) == data.abilities.length)
                    {
                        // Last Ability
                        abilities += data.abilities[i].ability.name;
                    }
                    else
                    {
                        abilities += data.abilities[i].ability.name + " | ";
                    }
                }
                game.gameData.fact3 = "This Pokemon's abilities are " + abilities;

                pokemonImageEl.setAttribute("src",game.gameData.artUrl);
                answerBtn.textContent = game.gameData.correctAnswer
            }
            else
            {
                game.gameData.poke3 = data.name
                answerBtn.textContent = data.name;
            }
        });
    });

    randomId = Math.floor(Math.random() * 898) + 1;
    apiUrl = "https://pokeapi.co/api/v2/pokemon/" + randomId;

    fetch(apiUrl).then(function(response)
    {
        response.json().then(function(data)
        {
            var answerBtn = document.querySelector("#answer-4");

            if(correctButton == 4)
            {
                var abilities = "";

                game.gameData.correctAnswer = data.name;
                returnName = data.name;
                game.gameData.artUrl = data.sprites.other["official-artwork"].front_default;
                game.gameData.fact1 = "This Pokemon's Pokedex number is " + randomId + ".";
                game.gameData.fact2 = "This Pokemon's is a " + data.types[0].type.name + " type pokemon.";
                for(var i = 0; i < data.abilities.length; i++)
                {
                    if((i+1) == data.abilities.length)
                    {
                        // Last Ability
                        abilities += data.abilities[i].ability.name;
                    }
                    else
                    {
                        abilities += data.abilities[i].ability.name + " | ";
                    }
                }
                game.gameData.fact3 = "This Pokemon's abilities are " + abilities;

                pokemonImageEl.setAttribute("src",game.gameData.artUrl);
                answerBtn.textContent = game.gameData.correctAnswer
            }
            else
            {
                game.gameData.poke4 = data.name
                answerBtn.textContent = data.name;
            }
        });
    });
};



var displayAnswer = function(isCorrect)
{
    displayFactsGroup.classList.replace("hidden","visible");
    $("#answer-1").addClass("hidden");
    $("#answer-2").addClass("hidden");
    $("#answer-3").addClass("hidden");
    $("#answer-4").addClass("hidden");

    $("#fact-1").text(game.gameData.fact1);
    $("#fact-2").text(game.gameData.fact2);
    $("#fact-3").text(game.gameData.fact3);


    var apiUrl = "https://api.pokemontcg.io/v2/cards?q=!name:" + game.gameData.correctAnswer;

    if(isCorrect)
    {
        displayPokemonContainer.style.backgroundColor = "green";
    }
    else
    {
        displayPokemonContainer.style.backgroundColor = "red";
    }
    


    fetch(apiUrl).then(function(response)
    {
        response.json().then(function(data)
        {
            console.log(data);
            pokemonImageEl.setAttribute("src", data.data[0].images.small);
        });
    });

};

var saveScore = function() {
    if(localStorage.getItem("scores") === null){
        var playerScores = [];
        playerScores.push(game.userScore);
        localStorage.setItem("scores", JSON.stringify(playerScores));
    }
    else {
        playerScores = JSON.parse(localStorage.getItem("scores"));
        playerScores.push(game.userScore);
        localStorage.setItem("scores", JSON.stringify(playerScores));
    }
};

var createRankingsEl = function() {
    var savedRankings = localStorage.getItem("scores");
    var rankingsArray = JSON.parse(localStorage.getItem("scores"));
    rankingsArray.sort();
    rankingsArray.reverse();
    for (var i = 0; i < 10; i++) {
        if (rankingsArray[i] == null) {
            $("#top-ten").append("<li class='ranking'> - - - </li>");
        }

        else{
            $("#top-ten").append("<li class='ranking'>" + rankingsArray[i] + "</li>");
        }
    }
};

var displayScoreboard = function () {
    saveScore();
    createRankingsEl();
};

var resetRankings = function () {
    $("li").remove(".ranking");
};

var resetGameData = function()
{
    game.userName = "";
    game.userScore = 0;
    game.lives = 3;
    game.gameover = false;
    game.gameData.fact1 = "";
    game.gameData.fact2 = "";
    game.gameData.fact3 = "";
    game.gameData.poke1 = "";
    game.gameData.poke2 = "";
    game.gameData.poke3 = "";
    game.gameData.poke4 = "";
    game.gameData.correctAnswer = "";
    game.updateLives();
    game.updateScore();
};

var startGame = function()
{
    resetGameData();

    mainPage.classList.replace("visible","hidden");
    rulesPage.classList.replace("visible","hidden");
    gameStartPage.classList.replace("hidden","visible");
    leaderboardPage.classList.replace("visible","hidden");

    getRandomPokemon();
};

gameStartPage.addEventListener("click",answerBtnHandler);
leaderboardPage.addEventListener("click",restartBtnHandler);
mainPage.addEventListener("click", rulesHandler);
rulesPage.addEventListener("click", startGameHandler);

