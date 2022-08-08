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

        case 0:
            return { lower: 1, upper: 906 };
    }
}

/**
 * @NOTE i moved the code to update the UI from out json code along into a function.
 * since JSON and objects are interchangeable in JS it was extremely flexible. the
 * only major difference is that widths of stat bars are normalized to the 1-255
 * range since pokemon like Blissey have a max base stat.
 */
function updateUI(pokemonObj) {
    // Get a reference to the heading and set it to the pokemon's id (dex #) and name
    let nameHeading = document.querySelector("#poke_name");
    nameHeading.innerHTML = `#${pokemonObj.id} - ${pokemonObj.name.toUpperCase()}`;

    // Get a reference to the image and set the src to the pokemon's image
    let pokeImg = document.querySelector("#poke_img");
    pokeImg.src = pokemonObj.image;

    // Get a list of stat bars
    let statDivs = document.querySelectorAll("#poke_stats div");

    // and loop through them to change their width
    for (let i = 0; i < statDivs.length; i++) {
        // Get the id of the current stat bar, which we can use to get the pokemons's corresponding stat
        let stat = statDivs[i].id;

        // Set the current stat bar's width to normalized base state width
        // This uses bracket notation for accessing an object's properties--since the contents of the
        // brackets are strings, we can use a variable
        statDivs[i].style["width"] = `${pokemonObj.base[stat] / 255 * 100}%`;
    }
}

/**
 * @TODO create a function called randNumGenerator which takes two parameters
 * (lower and upper) and returns a random integer  between [lower, upper).
 * use an arrow function
 */

/**
 * @NOTE often times when you use an API, you'll need to "clean"
 * the data. data from API comes with a lot of information and
 * cleaning the data means trimming it down to only the things
 * you need.
 * 
 * @TODO create a function called getPokemon which:
 *      - calls the PokeAPI to get a random Pokemon
 *      - cleans the raw Pokemon data to be usable
 *      - updates the UI accordingly
 */

/**
 * @TODO create an event handler for #random_btn which:
 *      - gets the generation value the user selected in the 
 *        radio inputs
 *      - gets a random Pokedex number within that generation range
 *      - gets and loads the data of a Pokemon with the specified Pokedex number
 */