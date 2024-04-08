const pokeSelection = document.querySelector("pokeSelection");
const pokemonContainer = document.querySelector(".pokemons");
const battleDom = document.querySelector(".battledom");
const pokeButtons = document.querySelector(".pokeButtons");
const addtoBox = document.querySelector("#addPoke");
const activePoke = document.querySelector(".activePokemon");

let startBattle = document.createElement("button");
startBattle.innerText = "Start Battle!";
startBattle.classList.add("startBattle");

const pokeSelect = document.querySelector("#selOne");

let selectedPokemons = [];

class Pokemon {
  constructor(
    name,
    avatar,
    typing,
    weight,
    height,
    statPoints,
    move,
    currentHp
  ) {
    this.name = name;
    this.avatar = avatar;
    this.typing = Array.isArray(typing) ? typing : [typing];
    this.weight = weight;
    this.height = height;
    this.stats = statPoints; //Run function to extract stat points
    this.move = move;
    this.currentHp = currentHp;
  }
}

const comparePokemons = (poke1, poke2, currentStat) => {
  //   let pokeone = poke1.stat[currentStat];
  //   let poketwo = poke2.stat[currentStat];
  //   let poke1 = selectedPokemons[0].stats;
  //   let poke2 = selectedPokemons[1].stats;
  //   console.log(poke1);
  //   Object.keys(poke1).forEach((key) => {
  //     if (poke1[key] > poke2[key]) {
  //       //Ad svg up angle to pokemon 1 and down angle to pokemon 2
  //       console.log(`Pokemon 1 has higher ${key} than Pokemon 2.`);
  //     } else if (poke2[key] > poke1[key]) {
  //       //add svg up angle to pokemon 2 and down angle to pokemon 1
  //       console.log(`Pokemon 2 has higher ${key} than Pokemon 1.`);
  //     } else {
  //       console.log(`Pokemon 1 and Pokemon 2 have equal ${key}.`);
  //     }
  //   });
};

const loadPokemons = () => {
  activePoke.innerHTML = "";
  if (selectedPokemons.length > 2) {
    selectedPokemons.shift();
  }
  console.log(selectedPokemons);
  let poke1 = selectedPokemons[0];
  let poke2 = selectedPokemons[1];
  selectedPokemons.forEach((pokemon, index) => {
    //compare stats, how do indentify first pokemon?
    let pokeCard = document.createElement("div");
    pokeCard.classList.add("pokemon-card");

    let pokeSprite = document.createElement("div");
    let img = document.createElement("img");
    img.src = pokemon.avatar;

    let pokeTitle = document.createElement("h3");
    pokeTitle.innerText = pokemon.name;

    let pokeHp = document.createElement("strong");
    let currentHp = pokemon.currentHp;
    const baseHp = pokemon.stats.hp;
    pokeHp.innerHTML = `HP: ${currentHp}/${baseHp}`;

    let pokestats = document.createElement("div");
    pokestats.classList.add("pokeStats");
    let statpara = (document.createElement("p").innerText = "Stats: ");
    let statList = document.createElement("ul");

    let poketype = document.createElement("p");
    let allTypes = pokemon.typing
      .map((typeObj) => typeObj.type.name)
      .join(", ");
    poketype.innerHTML = `Type(s): ${allTypes}`;

    Object.keys(pokemon.stats).forEach((key) => {
      let li = document.createElement("li");
      if (key !== "currentHp") {
        if (poke2) {
          if (
            pokemon.stats[key] > poke2.stats[key] &&
            pokemon.stats[key] === poke1.stats[key]
          ) {
            li.innerHTML = `base ${key}: ${pokemon.stats[key]} <img src="./icons/angleup.svg">`;
          } else if (
            pokemon.stats[key] === poke2.stats[key] &&
            pokemon.stats[key] > poke1.stats[key]
          ) {
            li.innerHTML = `base ${key}: ${pokemon.stats[key]} <img src="./icons/angleup.svg">`;
          } else if (pokemon.stats[key] < poke1.stats[key]) {
            li.innerHTML = `base ${key}: ${pokemon.stats[key]} <img src="./icons/angledown.svg">`;
          } else {
            li.innerHTML = `base ${key}: ${pokemon.stats[key]} <img src="./icons/angledown.svg">`;
          }
        } else {
          li.innerHTML = `${key}: ${pokemon.stats[key]}`;
        }
        statList.append(li);
      }
    });

    pokeSprite.append(img);
    pokestats.append(statpara, statList);
    pokeCard.append(pokeSprite, pokeTitle, pokeHp, poketype, pokestats);
    activePoke.append(pokeCard);
  });

  if (selectedPokemons.length > 1) {
    pokeButtons.append(startBattle);
    comparePokemons();
  }
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
  let currentHp = pokeData.stats[0].base_stat;
  console.log("Current HP: " + currentHp);
  let stat = {};

  allStats.forEach((statObj) => {
    stat[statObj.stat.name] = statObj.base_stat;
  });
  let pokemon = new Pokemon(
    pokemonName,
    pokeAvatar,
    pokeType,
    pokemonWeight,
    pokemonHeight,
    stat,
    pokemonMove,
    currentHp
  );

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
    getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokeSelect.value}`);
  });
};

/*
Attackerande Pokemon (röd) - Försvarande Pokemon (blå)
(Attack+Special Attack) - (Defense+Special defense) * 0.8 = Skada
*/

const singleAttack = (attacker, defender) => {
  console.log(attacker);
  console.log(`${attacker.name} attacks first.`);
  defender.currentHp -= pokemonAttack(attacker, defender);

  if (defender.currentHp <= 0) {
    defender.currentHp = 0;
    console.log(defender.name + " has fainted.");
    loadPokemons();
    return;
  }
  loadPokemons();
  setTimeout(() => {
    let newAttacker = attacker;
    attacker = defender;
    defender = newAttacker;
    singleAttack(defender, attacker);
  }, 3000);
};

const pokemonAttack = (attacker, defender) => {
  let damage = attacker.stats.attack + attacker.stats["special-attack"];
  let defense = defender.stats.defense + defender.stats["special-defense"];
  console.log("Damage: " + damage);
  console.log("Defense: " + defense);
  let damageResult = damage - defense * 0.8;
  let finalDamage = Math.max(Math.floor(damageResult), 10);
  console.log("Final damage: " + finalDamage);

  return finalDamage;
};

const flipCoin = () => {
  let flip = Math.floor(Math.random() * 101);
  if (flip > 50) {
    return true;
  }
  return false;
};

const battleStart = () => {
  let poke1 = selectedPokemons[0];
  let poke2 = selectedPokemons[1];

  let attacker, defender;
  if (poke1.stats.speed > poke2.stats.speed) {
    attacker = poke1;
    defender = poke2;
  } else if (poke2.stats.speed > poke1.stats.speed) {
    attacker = poke2;
    defender = poke1;
  } else {
    if (flipCoin()) {
      attacker = poke1;
      defender = poke2;
    } else {
      attacker = poke2;
      defender = poke1;
    }
  }
  singleAttack(attacker, defender);

  loadPokemons();
};

startBattle.addEventListener("click", () => {
  console.log(selectedPokemons);
  document.querySelectorAll(".pokeStats").forEach((card, index) => {
    card.innerHTML = `<p>Move: ${selectedPokemons[index].move.name}`;
  });
  battleStart();
});

getAllPokemons();
// if (
//   poke2 &&
//   pokemon.stats[key] > poke2.stats[key] &&
//   pokemon.stats[key] === poke1.stats[key]
// ) {
//   li.innerHTML = `base ${key}: ${pokemon.stats[key]} <img src="./icons/angleup.svg">`;
// } else {
//   li.innerHTML = `base ${key}: ${pokemon.stats[key]} `;
// }

//   if (poke1.stats.speed > poke2.stats.speed) {
//     console.log(`${poke1.name}(Poke 1) attacks first.`);
//     poke2.currentHp -= pokemonAttack(poke1, poke2);
//   } else if (poke2.stats.speed > poke1.stats.speed) {
//     console.log(`${poke2.name}(Poke 2) attacks first.`);
//     poke1.currentHp -= pokemonAttack(poke2, poke1);
//   } else if (flipCoin()) {
//     poke2.currentHp -= pokemonAttack(poke1, poke2);
//     console.log("Flipping coin..");
//     console.log(`${poke1.name}(Poke 1) attacks first.`);
//   } else {
//     console.log("Flipping coin..");
//     poke1.currentHp -= pokemonAttack(poke2, poke1);
//     console.log(`${poke2.name}(Poke 2) attacks first.`);
//   }
//   console.log(selectedPokemons);
