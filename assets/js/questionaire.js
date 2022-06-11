//might have array that checks if a pokemon has been used in a question already and rerolls the pokemon used for the question

//set lives to 3
lives = 3;
//set score to 0
score = 0;
guess = "";
answer = "";
randomPokemon = "";
randomOptions = [];
//loop while lives are more than zero
while (lives > 0) {
    //set loop for current amount of pokemon
    for (i = 0; i < 905; i++) {
        randomPokemon =  //randomize pokemon
        //add answer to options
        randomOptions.push(randomPokemon);
        //set answer equal to the randomized Pokemon
        answer = randomPokemon;

        //append question number and hints
        "Question #" + i;
        "This Pokemon is " + pokemonType + " and is #" + pokedexNumber + " in the National Pokedex.";
        //maybe we can put a blacked out overlay on the sprite


        for (j = 0; j < 3; j++) {
            //randomize 3 other options and add to array
            option = //randomize pokemon
            randomOptions.push(option);
        }

        //randomize option positions
        for (k = randomOptions.length - 1; k > 0; k--) {
            l = math.floor(math.random()*k);
            m = randomOptions[k];
            randomOptions[k] = randomOptions[l];
            randomOptions[l] = m;
        }

        for (n = randomOptions.length - 1; n > 0; n--) {
            //append four option buttons below quiz
            randomOptions[n];
        }

        //have event listener for buttons and set button pressed equal to guess

        switch (true) {
            case guess == answer:
                score++;
                //highlight answer and display card
                break;
            case guess != answer:
                lives -= 1;
                //highlight correct answer and display card
                break;
            case quitButton:
                lives = 0;
                //open score name submit field with score result
                break;
        }
    }
};

//when lives are zero open game over notification with score name submit and score results