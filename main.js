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

const randNumGenerator = (lower, upper) => {
    // The number of possible values we could return
    let range = upper - lower;
    // go through our usual procedure for generating a random integer
    // Results in the range [lower-upper)
    return Math.floor(Math.random() * range) + lower;
}

/**
 * @NOTE often times when you use an API, you'll need to "clean"
 * the data. data from API comes with a lot of information and
 * cleaning the data means trimming it down to only the things
 * you need.
 * 
 * @TODO create a function called loadPokemon which:
 *      - calls the PokeAPI to get a random Pokemon
 *      - cleans the raw Pokemon data to be usable
 *      - updates the UI accordingly
 */
function loadPokemon(pokedexID) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokedexID}`;
    // Use the built-in fetch function to call an API
    fetch(url)
        // use a callback function to process data when it comes in
        // Don't end with a semicolon for to use a callback after!
        .then(function(response){
            // HTTP Response, not the data we're going for
            // console.log(response);

            // Pokémon JSON data, what we're going for
            // Returning from the callback function, not loadPokemon
            return response.json();
        })
        // Use another callback to use data after it comes through
        .then(function(jsonData) {
            // The actual data we want to use, from the first callback
            // console.log(jsonData);

            /**
             * Clean Pokémon data. final object should look like: 
             * 
             * {
             *  id: dex number,
             *  name: name,
             *  image: the url of the sprite (front_default),
             *  base {
             *      hp: hp;
             *      atk: base attack;
             *      def: base defense;
             *      sp_atk: base special attack;
             *      sp_def: base special defense;
             *      spd: base speed
             *  }
             * }
             */

            let pokemon = {
                id: jsonData.id,
                name: jsonData.name,
                image: jsonData.sprites.other.home.front_default,
                base: {
                    hp: jsonData.stats[0].base_stat,
                    atk: jsonData.stats[1].base_stat,
                    def: jsonData.stats[2].base_stat,
                    sp_atk: jsonData.stats[3].base_stat,
                    sp_def: jsonData.stats[4].base_stat,
                    spd: jsonData.stats[5].base_stat
                }
            };

            updateUI(pokemon);
        })
}

/**
 * @TODO create an event handler for #random_btn which:
 *      - gets the generation value the user selected in the 
 *        radio inputs
 *      - gets a random Pokedex number within that generation range
 *      - gets and loads the data of a Pokemon with the specified Pokedex number
 */

let randomButton = document.querySelector("#random_btn");
randomButton.onclick = function(event) {
    event.preventDefault();

    // Get the element with a checked radio option
    let selectedOption = document.querySelector("input[name='generation']:checked");
    // Get the value of said element, cast as a number
    let generation = Number(selectedOption.value);

    // Use the generationRange switch to get the selected generation's upper and lower bounds
    let genRange = getGenerationRange(generation);

    // Get a random dex ID
    let randomDexNumber = randNumGenerator(genRange.lower, genRange.upper);

    // Call the API!
    loadPokemon(randomDexNumber);
}