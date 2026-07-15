const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");
const pokemonInfo = document.getElementById("pokemon-info");

const animateWidth = (element, width) => {
    requestAnimationFrame(() => {
        element.style.width = `${width}%`;
    });
};

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon?limit=151`).then((res) => res.json());
        response.results.forEach((pokemon) => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
};

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonStats = document.getElementById("pokemon-stats");
    const pokemonAbilities = document.getElementById("pokemon-abilities");
    const imageContainer = document.getElementById("pokemon-image-container");

    if (!pokemonUrl) {
        pokemonName.textContent = "";
        pokemonImage.removeAttribute("src");
        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = "";
        imageContainer.removeAttribute("data-type");
        return;
    }

    pokemonInfo.classList.add("is-loading");

    try {
        const response = await fetch(pokemonUrl).then((res) => res.json());

        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = "";

        pokemonName.textContent = response.name;

        pokemonImage.style.opacity = "0";
        pokemonImage.style.transform = "scale(0.9)";
        pokemonImage.src = response.sprites.other["official-artwork"].front_default || response.sprites.front_default || "";
        pokemonImage.onload = () => {
            pokemonImage.style.opacity = "1";
            pokemonImage.style.transform = "scale(1)";
        };

        response.stats.forEach((stat) => {
            const li = document.createElement("li");
            li.className = "stat-item";

            const head = document.createElement("div");
            head.className = "stat-head";

            const label = document.createElement("span");
            label.textContent = stat.stat.name.replace("-", " ");

            const value = document.createElement("span");
            value.className = "stat-value";
            value.textContent = stat.base_stat;

            head.appendChild(label);
            head.appendChild(value);

            const track = document.createElement("div");
            track.className = "stat-track";

            const fill = document.createElement("div");
            fill.className = "stat-fill";

            track.appendChild(fill);
            li.appendChild(head);
            li.appendChild(track);
            pokemonStats.appendChild(li);

            const statPercent = Math.min((stat.base_stat / 200) * 100, 100);
            animateWidth(fill, statPercent);
        });

        response.abilities.forEach((ability) => {
            const li = document.createElement("li");
            li.classList.add("ability-container");

            const abilityName = document.createElement("span");
            abilityName.textContent = ability.ability.name;

            const abilityBar = document.createElement("div");
            abilityBar.classList.add("ability-bar");

            const abilityFill = document.createElement("div");
            abilityFill.classList.add("ability-fill");

            abilityBar.appendChild(abilityFill);
            li.appendChild(abilityName);
            li.appendChild(abilityBar);
            pokemonAbilities.appendChild(li);

            const randomPower = Math.floor(Math.random() * 60) + 40;
            animateWidth(abilityFill, randomPower);
        });

        const types = response.types.map((t) => t.type.name).join(", ");
        imageContainer.setAttribute("data-type", `Tipo: ${types}`);
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    } finally {
        setTimeout(() => {
            pokemonInfo.classList.remove("is-loading");
        }, 120);
    }
};

window.pokemonSelected = pokemonSelected;
