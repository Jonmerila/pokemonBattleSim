const pokeSelection = document.querySelector("pokeSelection");
const pokemonContainer = document.querySelector(".pokemons");
const battleDom = document.querySelector(".battledom");
const pokeButtons = document.querySelector(".pokeButtons");
const addtoBox = document.querySelector("#addPoke");

const pokeSelect = document.querySelector("#selOne");

let selectedPokemons = [];

class Pokemon {
  constructor(name, avatar, typing, weight, height, statPoints, move) {
    this.name = name;
    this.avatar = avatar;
    this.typing = Array.isArray(typing) ? typing : [typing];
    this.weight = weight;
    this.height = height;
    this.stats = statPoints; //Run function to extract stat points
    this.move = move;
  }
}

const loadPokemons = () => {
  console.log(selectedPokemons);
  selectedPokemons.forEach((pokemon) => {
    console.log(pokemon);
    let pokeCard = document.createElement("div");

    let pokeSprite = document.createElement("div");
    let img = document.createElement("img");
    img.src = pokemon.avatar;

    let pokeTitle = document.createElement("h3");
    pokeTitle.innerText = pokemon.name;
    let pokeHp = document.createElement("strong");
    let currentHp = pokemon.stats.hp;
    pokeHp.innerHTML = `HP: ${currentHp}/${pokemon.stats.hp}`;

    let pokestats = document.createElement("div");
    let statpara = (document.createElement("p").innerText = "Stats: ");
    let statList = document.createElement("ul");

    let poketype = document.createElement("p");
    let allTypes = pokemon.typing
      .map((typeObj) => typeObj.type.name)
      .join(", ");
    poketype.innerHTML = `Type(s): ${allTypes}`;

    Object.keys(pokemon.stats).forEach((key) => {
      let li = document.createElement("li");
      if (key === "hp") {
        li.innerHTML = `base ${key}: ${pokemon.stats[key]}`;
        statList.append(li);
      } else {
        li.innerHTML = `${key}: ${pokemon.stats[key]}`;
        statList.append(li);
      }
    });
    pokeSprite.append(img);
    pokestats.append(statpara, statList);
    pokeCard.append(pokeSprite, pokeTitle, pokeHp, poketype, pokestats);
    pokemonContainer.append(pokeCard);
  });
};

const getPokemonData = async (url) => {
  let pokeFetch = await fetch(url);
  let pokeData = await pokeFetch.json();

  let pokemonName = pokeData.name;
  let pokeAvatar = pokeData.sprites.front_default;
  let pokeType = pokeData.types;
  let pokemonWeight = pokeData.weight;
  let pokemonHeight = pokeData.height;
  let allStats = pokeData.stats;
  let pokemonMove = pokeData.moves[0].move;
  let stat = {};

  allStats.forEach((statObj) => {
    stat[statObj.stat.name] = statObj.base_stat;
  });
  console.log(stat);
  let pokemon = new Pokemon(
    pokemonName,
    pokeAvatar,
    pokeType,
    pokemonWeight,
    pokemonHeight,
    stat,
    pokemonMove
  );
  console.log(pokemon);

  selectedPokemons.push(pokemon);
  loadPokemons();
};

const createDropDown = (data) => {
  data.forEach((pokemon) => {
    let option = document.createElement("option");
    let pokeId = pokemon.url.split("/").slice(-2, -1)[0];
    option.value = pokeId;
    option.innerText = pokemon.name;
    pokeSelect.append(option);
  });
};

const getAllPokemons = async () => {
  let pokeFetch = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  let pokeData = await pokeFetch.json();
  let pokeResults = pokeData.results;

  createDropDown(pokeResults);

  addtoBox.addEventListener("click", () => {
    //Create a new instance of pokemon class with selected pokemon in dropdown menu.
    console.log(pokeSelect.value);
    getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokeSelect.value}`);
  });
};

getAllPokemons();
