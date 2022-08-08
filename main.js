/**
 * @NOTE this function takes one parameter, the generation number,
 * and returns an object containing two props:
 *      - lower: the lower inclusive bound of the Pokedex ids for this
 *        generation
 *      - upper: the upper exclusive bound of the Pokedex ids for this
 *        generation
 */
function getGenerationRange(genNum) {
    /**
     * @NOTE using a switch statement here which is basically a
     * glorified if-statement. depending on the value that's passed in
     * the specified case will run. learn more about switch statements here:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
     */
    switch (genNum) {
        case 1:
            return { lower: 1, upper: 152 };
        
        case 2:
            return { lower: 152, upper: 252 };

        case 3:
            return { lower: 252, upper: 387 };

        case 4:
            return { lower: 387, upper: 494 };

        case 5:
            return { lower: 494, upper: 650 };

        case 6:
            return { lower: 650, upper: 722 };

        case 7:
            return { lower: 722, upper: 810 };

        case 8:
            return { lower: 810, upper: 906 };
    }
}

/**
 * @NOTE this is function very similar to randNumGenerator seen in
 * the week1 milestone. i've modified it a bit so that it takes
 * two parameters (lower and upper) and returns a random integer
 * between [lower, upper)
 */
function randNumGenerator(lower, upper) {
    // the number of possible choices to make
    let possibleChoices = upper - lower;

    // generate a number between [0, possibleChoices)
    let result = Math.random() * possibleChoices;

    // shift the interval to start at lower
    result += lower;

    // return the floored result to get an integer
    return Math.floor(result);
}

/**
 * @NOTE often times when you use an API, you'll need to "clean"
 * the data. data from API comes with a lot of information and
 * cleaning the data means trimming it down to only the things
 * you need.
 * 
 * @TODO create a function called getPokemon which:
 *      - calls the PokeAPI to get a random Pokemon
 *      - cleans the raw Pokemon data to be usable
 *      - updates the UI according
 */

/**
 * @TODO create a function called updateUI which takes one parameter
 * (a pokemon object as created in getPokemon) and updates the UI of the
 * website accordingly. use an arrow function. 
 */

/**
 * @TODO create an event handler for #random_btn which:
 *      - gets the generation value the user selected in the 
 *        radio inputs
 *      - gets a random Pokedex number within that generation range
 *      - gets and loads the data of a Pokemon with the specified Pokedex number
 */