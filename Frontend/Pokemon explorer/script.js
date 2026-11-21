
const API_URL = "https://pokeapi.co/api/v2/pokemon";

let allPokemon = [];
let newPokemon = [];
let filteredPokemon = [];

let offset = 0;
const LIMIT = 20;

let currentPage = 1;
const POKEMON_PER_PAGE = 12;


// DOM ELEMENTS

const pokemonGrid = document.getElementById("pokemon-grid");

const search = document.getElementById("search-input");
const typeFilter = document.getElementById("type-filter");
const weaknessFilter = document.getElementById("weakness-filter");
const abilityFilter = document.getElementById("ability-filter");

const noResults = document.getElementById("no-results");
const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");

const sortSelect = document.getElementById("sort-select");

const rangeStart = document.getElementById("range-start");
const rangeEnd = document.getElementById("range-end");

const applyFilter = document.getElementById("apply-filter");
const resetFilter = document.getElementById("reset-filter");

const loadMore = document.getElementById("load-more");

const nextPage = document.getElementById("next-page");
const prevPage = document.getElementById("prev-page");
const pageNumber = document.getElementById("page-number");

const pokemonModal = document.getElementById("pokemon-modal");
const closeModal = document.getElementById("close-modal");
const modalDetail = document.getElementById("modal-details");

const heightFilters = document.querySelectorAll('input[name="height"]');
const weightFilters = document.querySelectorAll('input[name="weight"]');


// ALL 18 POKEMON TYPES

const TYPE_NAMES = [
    "normal", "fire", "water", "electric",
    "grass", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark",
    "steel", "fairy"
];


// CACHE TYPE API RESPONSES

const typeCache = new Map();


// CLOSE MODAL

closeModal.addEventListener("click", () => {
    pokemonModal.hidden = true;
});


// POKEMON GRID CLICK EVENT

pokemonGrid.addEventListener("click", (e) => {

    const selectedCard = e.target.closest(".pokemon-card");

    if (!selectedCard) return;

    const id = selectedCard.dataset.id;

    const selectedPokemon = allPokemon.find((pokemon) => {
        return pokemon.id === Number(id);
    });

    if (selectedPokemon) {
        showPokemonDetails(selectedPokemon);
    }

});


// NEXT PAGE

nextPage.addEventListener("click", () => {

    const totalPages = Math.ceil(
        filteredPokemon.length / POKEMON_PER_PAGE
    );

    if (currentPage < totalPages) {
        currentPage++;
        renderPokemon();
    }

});


// PREVIOUS PAGE

prevPage.addEventListener("click", () => {

    if (currentPage > 1) {
        currentPage--;
        renderPokemon();
    }

});


// LOAD MORE

loadMore.addEventListener("click", () => {

    if (loadMore.disabled) return;

    offset += LIMIT;
    fetchPokemon();

});


// SEARCH EVENT

search.addEventListener("input", () => {
    pokemonFilter();
});


// HEIGHT FILTER EVENT

heightFilters.forEach((checkbox) => {

    checkbox.addEventListener("change", () => {
        pokemonFilter();
    });

});


// WEIGHT FILTER EVENT

weightFilters.forEach((checkbox) => {

    checkbox.addEventListener("change", () => {
        pokemonFilter();
    });

});


// TYPE FILTER EVENT

typeFilter.addEventListener("change", () => {
    pokemonFilter();
});


// WEAKNESS FILTER EVENT

weaknessFilter.addEventListener("change", () => {
    pokemonFilter();
});


// ABILITY FILTER EVENT

abilityFilter.addEventListener("change", () => {
    pokemonFilter();
});


// APPLY FILTER BUTTON

applyFilter.addEventListener("click", () => {
    pokemonFilter();
});


// RESET FILTER BUTTON

resetFilter.addEventListener("click", () => {

    search.value = "";
    typeFilter.value = "";
    weaknessFilter.value = "";
    abilityFilter.value = "";

    heightFilters.forEach((checkbox) => {
        checkbox.checked = false;
    });

    weightFilters.forEach((checkbox) => {
        checkbox.checked = false;
    });

    rangeStart.value = 1;
    rangeEnd.value = 151;

    pokemonFilter();

});


// SORT EVENT

sortSelect.addEventListener("change", () => {

    switch (sortSelect.value) {

        case "number":
            allPokemon.sort((a, b) => a.id - b.id);
            break;

        case "name":
            allPokemon.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "height":
            allPokemon.sort((a, b) => a.height - b.height);
            break;

        case "weight":
            allPokemon.sort((a, b) => a.weight - b.weight);
            break;

    }

    pokemonFilter();

});


// FETCH POKEMON

async function fetchPokemon() {

    try {

        // Show loading message

        loadingMessage.hidden = false;
        errorMessage.hidden = true;

        loadMore.disabled = true;

        const response = await fetch(
            `${API_URL}?limit=${LIMIT}&offset=${offset}`
        );

        // Check API response

        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon list");
        }

        const data = await response.json();

        const pokemonList = data.results;

        // Fetch individual Pokémon details

        newPokemon = await Promise.all(
            pokemonList.map((pokemon) => {
                return fetchPokemonDetails(pokemon.url);
            })
        );

        // Calculate weaknesses for new Pokémon

        await Promise.all(
            newPokemon.map(async (pokemon) => {

                pokemon.weaknesses =
                    await getPokemonWeaknesses(pokemon);

            })
        );

        // Add new Pokémon to existing array

        allPokemon.push(...newPokemon);

        // Extract abilities

        const allAbilities = allPokemon.flatMap((pokemon) => {

            return pokemon.abilities.map((item) => {
                return item.ability.name;
            });

        });

        // Remove duplicate abilities

        const uniqueAbilities = [...new Set(allAbilities)].sort();

        // Populate ability dropdown

        populateAbilityFilter(uniqueAbilities);

        // Apply filters and display Pokémon

        pokemonFilter();

    } catch (error) {

        console.error("Error fetching Pokémon:", error);

        errorMessage.textContent =
            "Unable to load Pokémon. Please check your internet connection and try again.";

        errorMessage.hidden = false;

        // Restore offset if Load More failed

        if (offset > 0) {
            offset -= LIMIT;
        }

    } finally {

        // Hide loading message

        loadingMessage.hidden = true;

        loadMore.disabled = false;

    }

}


// POPULATE ABILITY DROPDOWN

function populateAbilityFilter(abilities) {

    abilities.forEach((ability) => {

        const existingOption = abilityFilter.querySelector(
            `option[value="${ability}"]`
        );

        if (!existingOption) {

            const option = document.createElement("option");

            option.value = ability;
            option.textContent = ability;

            abilityFilter.appendChild(option);

        }

    });

}


// FETCH INDIVIDUAL POKEMON DETAILS

async function fetchPokemonDetails(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
    }

    const details = await response.json();

    return details;

}


// FETCH TYPE DETAILS WITH CACHING

async function fetchTypeDetails(url) {

    if (!typeCache.has(url)) {

        const request = fetch(url)
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch type details");
                }

                return response.json();

            })
            .catch((error) => {

                // Remove failed request from cache
                // so a later retry can work

                typeCache.delete(url);

                throw error;

            });

        typeCache.set(url, request);

    }

    return typeCache.get(url);

}


// CALCULATE POKEMON WEAKNESSES

async function getPokemonWeaknesses(pokemon) {

    const typeDetails = await Promise.all(

        pokemon.types.map((item) => {
            return fetchTypeDetails(item.type.url);
        })

    );

    const weaknesses = TYPE_NAMES.filter((attackType) => {

        let multiplier = 1;

        typeDetails.forEach((details) => {

            const relations = details.damage_relations;

            if (
                relations.no_damage_from.some(
                    item => item.name === attackType
                )
            ) {

                multiplier *= 0;

            } else if (
                relations.double_damage_from.some(
                    item => item.name === attackType
                )
            ) {

                multiplier *= 2;

            } else if (
                relations.half_damage_from.some(
                    item => item.name === attackType
                )
            ) {

                multiplier *= 0.5;

            }

        });

        return multiplier > 1;

    });

    return weaknesses;

}


// DISPLAY POKEMON

function renderPokemon() {

    pokemonGrid.innerHTML = "";

    const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
    const endIndex = startIndex + POKEMON_PER_PAGE;

    filteredPokemon.slice(startIndex, endIndex).forEach((pokemon) => {
        displayPokemon(pokemon);
    });

    const totalPages = Math.ceil(
        filteredPokemon.length / POKEMON_PER_PAGE
    );

    pageNumber.textContent = currentPage;

    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage >= totalPages;

}


// DISPLAY INDIVIDUAL POKEMON CARD

function displayPokemon(pokemon) {

    const name = pokemon.name;
    const id = pokemon.id;

    const image =
        pokemon.sprites.other["official-artwork"].front_default;

    const type = pokemon.types.map((items) => {
        return items.type.name;
    });

    const typeHTML = type.map((item) => {

        return `
            <span class="type-badge type-${item}">
                ${item}
            </span>
        `;

    }).join("");

    const weakness = pokemon.weaknesses || [];

    // Extract abilities

    const abilities = pokemon.abilities.map((item) => {
        return item.ability.name;
    });

    pokemonGrid.innerHTML += `

        <div class="pokemon-card"
             data-name="${name}"
             data-types="${type.join(",")}"
             data-weaknesses="${weakness.join(",")}"
             data-abilities="${abilities.join(",")}"
             data-id="${id}"
             data-height="${pokemon.height}"
             data-weight="${pokemon.weight}">

            <img src="${image}" alt="${name}">

            <h2>${name}</h2>

            <p>#${String(id).padStart(3, "0")}</p>

            <div class="pokemon-types">
                ${typeHTML}
            </div>

        </div>

    `;

}


// CHECK HEIGHT CATEGORY

function matchesHeight(height, category) {

    switch (category) {

        case "small":
            return height < 10;

        case "medium":
            return height >= 10 && height <= 20;

        case "large":
            return height > 20;

        default:
            return false;

    }

}


// CHECK WEIGHT CATEGORY

function matchesWeight(weight, category) {

    switch (category) {

        case "light":
            return weight < 100;

        case "medium":
            return weight >= 100 && weight <= 300;

        case "heavy":
            return weight > 300;

        default:
            return false;

    }

}


// FILTER POKEMON

function pokemonFilter() {

    currentPage = 1;

    const searchText = search.value.toLowerCase();

    const selectedType = typeFilter.value;
    const selectedWeakness = weaknessFilter.value;
    const selectedAbility = abilityFilter.value;

    // Get selected height categories

    const selectedHeights = Array.from(heightFilters)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    // Get selected weight categories

    const selectedWeights = Array.from(weightFilters)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    const start = Number(rangeStart.value);
    const end = Number(rangeEnd.value);

    // Filter all loaded Pokémon

    filteredPokemon = allPokemon.filter((pokemon) => {

        const pokemonName = pokemon.name;

        const pokemonTypes = pokemon.types.map((item) => {
            return item.type.name;
        });

        const pokemonWeaknesses = pokemon.weaknesses || [];

        const pokemonAbilities = pokemon.abilities.map((item) => {
            return item.ability.name;
        });

        const pokemonId = Number(pokemon.id);
        const pokemonHeight = Number(pokemon.height);
        const pokemonWeight = Number(pokemon.weight);

        // Check name

        const nameMatches = pokemonName.includes(searchText);

        // Check type

        const typeMatches =
            selectedType === "" ||
            pokemonTypes.includes(selectedType);

        // Check weakness

        const weaknessMatches =
            selectedWeakness === "" ||
            pokemonWeaknesses.includes(selectedWeakness);

        // Check ability

        const abilityMatches =
            selectedAbility === "" ||
            pokemonAbilities.includes(selectedAbility);

        // Check height

        const heightMatches =
            selectedHeights.length === 0 ||
            selectedHeights.some((category) => {
                return matchesHeight(pokemonHeight, category);
            });

        // Check weight

        const weightMatches =
            selectedWeights.length === 0 ||
            selectedWeights.some((category) => {
                return matchesWeight(pokemonWeight, category);
            });

        // Check number range

        const idMatches =
            pokemonId >= start && pokemonId <= end;

        // Combine all conditions

        return (
            nameMatches &&
            typeMatches &&
            weaknessMatches &&
            abilityMatches &&
            heightMatches &&
            weightMatches &&
            idMatches
        );

    });

    // Display filtered Pokémon

    renderPokemon();

    // Show or hide no-results message

    noResults.style.display =
        filteredPokemon.length === 0 ? "block" : "none";

}


// SHOW POKEMON DETAILS MODAL

function showPokemonDetails(pokemon) {

    const name = pokemon.name;
    const id = pokemon.id;

    const image =
        pokemon.sprites.other["official-artwork"].front_default;

    const height = pokemon.height;
    const weight = pokemon.weight;

    const types = pokemon.types.map((item) => {
        return item.type.name;
    });

    const abilities = pokemon.abilities.map((item) => {
        return item.ability.name;
    });

    const stats = pokemon.stats.map((item) => {

        return {
            name: item.stat.name,
            value: item.base_stat
        };

    });


    // GENERATE TYPE HTML

    const typesHTML = types.map((type) => {

        return `
            <span class="type-badge type-${type}">
                ${type}
            </span>
        `;

    }).join("");


    // GENERATE ABILITY HTML

    const abilitiesHTML = abilities.map((ability) => {

        return `
            <span class="ability-badge">
                ${ability}
            </span>
        `;

    }).join("");


    // CONVERT HEIGHT AND WEIGHT

    const heightInMeters = (height / 10).toFixed(1);
    const weightInKg = (weight / 10).toFixed(1);


    // GENERATE STATS HTML

    const statsHTML = stats.map((stat) => {

        const percentage = Math.min(
            (stat.value / 200) * 100,
            100
        );

        return `
            <div class="stat-row">

                <span class="stat-name">
                    ${stat.name}
                </span>

                <span class="stat-value">
                    ${stat.value}
                </span>

                <div class="stat-bar">
                    <div
                        class="stat-fill"
                        style="width: ${percentage}%"
                    ></div>
                </div>

            </div>
        `;

    }).join("");


    // INSERT MODAL CONTENT

    modalDetail.innerHTML = `

        <div class="pokemon-detail">

            <h2>${name}</h2>

            <img src="${image}" alt="${name}">

            <p>#${String(id).padStart(3, "0")}</p>

        </div>

        <div class="pokemon-types">
            ${typesHTML}
        </div>

        <div class="pokemon-abilities">

            <h3>Abilities</h3>

            ${abilitiesHTML}

        </div>

        <div class="pokemon-measurements">

            <div>
                <h3>Height</h3>
                <p>${heightInMeters} m</p>
            </div>

            <div>
                <h3>Weight</h3>
                <p>${weightInKg} kg</p>
            </div>

        </div>

        <div class="pokemon-stats">

            <h3>Base Stats</h3>

            ${statsHTML}

        </div>

    `;

    pokemonModal.hidden = false;

}


// INITIALIZE APPLICATION

fetchPokemon();
