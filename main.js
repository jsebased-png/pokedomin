const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();
const pokemonSelected = async (pokemonUrl) => {
    try {
        const response = await fetch(pokemonUrl).then(response => response.json());

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonAbilities = document.getElementById("pokemon-abilities");

        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = "";

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        });
        
response.abilities.forEach(ability => {
    const abilityContainer = document.createElement("div");
    abilityContainer.classList.add("ability-container");

    const abilityName = document.createElement("span");
    abilityName.textContent = ability.ability.name;

    const abilityBar = document.createElement("div");
    abilityBar.classList.add("ability-bar");

    const abilityFill = document.createElement("div");
    abilityFill.classList.add("ability-fill");

    const randomPower = Math.floor(Math.random() * 100);
    abilityFill.style.width = randomPower + "%";

    abilityBar.appendChild(abilityFill);
    abilityContainer.appendChild(abilityName);
    abilityContainer.appendChild(abilityBar);

    pokemonAbilities.appendChild(abilityContainer);
});

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}
