function createPokemonCard(pokemon) {
    const container = document.getElementById("pokemonContainer");
  
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
  
    const image = document.createElement("img");
    image.classList.add("pokemon-image");
    image.src = pokemon.imageUrl;
    card.appendChild(image);
  
    const name = document.createElement("div");
    name.classList.add("pokemon-name");
    name.textContent = pokemon.name;
    card.appendChild(name);
  
    const viewButton = document.createElement("button");
    viewButton.classList.add("view-button");
    viewButton.textContent = "View Details";
    viewButton.addEventListener("click", () => {
      viewPokemonDetails(pokemon);
    });
    card.appendChild(viewButton);
  
    container.appendChild(card);
  }
  
  function viewPokemonDetails(pokemon) {
    const container = document.getElementById("pokemonContainer");
    container.innerHTML = "";
  
    const detailsCard = document.createElement("div");
    detailsCard.classList.add("pokemon-card");
  
    const image = document.createElement("img");
    image.classList.add("pokemon-image");
    image.src = pokemon.imageUrl;
    detailsCard.appendChild(image);
  
    const name = document.createElement("div");
    name.classList.add("pokemon-name");
    name.textContent = pokemon.name;
    detailsCard.appendChild(name);
  
    const type = document.createElement("div");
    type.textContent = "Type: " + pokemon.types.join(", ");
    detailsCard.appendChild(type);
  
    const ability = document.createElement("div");
    ability.textContent = "Ability: " + pokemon.abilities.join(", ");
    detailsCard.appendChild(ability);
  
    const height = document.createElement("div");
    height.textContent = "Height: " + pokemon.height;
    detailsCard.appendChild(height);
  
    const weight = document.createElement("div");
    weight.textContent = "Weight: " + pokemon.weight;
    detailsCard.appendChild(weight);
  
    const backButton = document.createElement("button");
    backButton.classList.add("view-button");
    backButton.textContent = "Back to Collection";
    backButton.addEventListener("click", () => {
      container.innerHTML = "";
      displayPokemons();
    });
    detailsCard.appendChild(backButton);
  
    container.appendChild(detailsCard);
  }
  
  function fetchPokemonData(pokemonId) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => ({
        name: data.name,
        imageUrl: data.sprites.front_default,
        types: data.types.map((type) => type.type.name),
        abilities: data.abilities.map((ability) => ability.ability.name),
        height: data.height,
        weight: data.weight,
      }))
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
        return null;
      });
  }
  
  function displayPokemons() {
    const pokemons = [
      { id: 1, name: "Bulbasaur" },
      { id: 2, name: "Ivysaur" },
      { id: 3, name: "Venusaur" },
      { id: 4, name: "Charmander" },
      { id: 5, name: "Charmeleon" },
      { id: 6, name: "Charizard" },
      { id: 7, name: "Squirtle" },
      { id: 8, name: "Wartortle" },
      { id: 9, name: "Clastoise" },
    ];
  
    const container = document.getElementById("pokemonContainer");
    container.innerHTML = "";
  
    pokemons.forEach((pokemon) => {
      fetchPokemonData(pokemon.id).then((data) => {
        if (data) {
          createPokemonCard(data);
        }
      });
    });
  }
  
  displayPokemons();  