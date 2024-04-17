const pokeSelection = document.querySelector("pokeSelection");
const pokemonContainer = document.querySelector(".pokemons");
const battleDom = document.querySelector(".battledom");
const pokeButtons = document.querySelector(".pokeButtons");
const addtoBox = document.querySelector("#addPoke");
const activePoke = document.querySelector(".activePokemon");

let battleText = document.querySelector(".battleText");

let startBattle = document.createElement("button");
startBattle.innerText = "Start Battle!";
startBattle.classList.add("startBattle");

let compareStatsBtn = document.createElement("button");
compareStatsBtn.classList.add("comparePokemon");
compareStatsBtn.innerText = "Compare Pokémon";

let selectedPokemons = [];
let statList;

const pokeSelect = document.querySelector("#selOne");
let firstStats = 0;
let secondStats = 0;

const compareSize = (poke1, poke2, size) => {
  let imgAdd1 = false;
  let imgAdd2 = false;
  if (poke1[size] > poke2[size]) {
    firstStats++;
    if (!imgAdd1) {
      poke1[size] += ` <img src="./icons/angleup.svg">`;
      imgAdd1 = true;
      console.log(imgAdd1);
      console.log(poke1[size]);
    }
    if (!imgAdd2) {
      poke2[size] += ` <img src="./icons/angledown.svg">`;
      imgAdd2 = true;
    }
  } else if (poke1[size] < poke2[size]) {
    secondStats++;
    if (!imgAdd1) {
      poke1[size] += ` <img src="./icons/angledown.svg">`;
      imgAdd1 = true;
    }
    if (!imgAdd2) {
      poke2[size] += ` <img src="./icons/angleup.svg">`;
      imgAdd2 = true;
    }
  } else {
    if (!imgAdd1) {
      poke1[size] += ` <img src="./icons/angleequal.svg">`;
      imgAdd1 = true;
    }
    if (!imgAdd2) {
      poke2[size] += ` <img src="./icons/angleequal.svg">`;
      imgAdd2 = true;
    }
  }
  return { poke1, poke2 };
};

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
    this.stats = statPoints;
    this.move = move;
    this.currentHp = currentHp;
  }
  static comparePoke(poke1, poke2) {
    let ul1 = document.createElement("ul");
    let ul2 = document.createElement("ul");

    console.log("Entering condition:", poke1.height > poke2.height);

    // Ta in en poke och jämför med den andra och ifall den har större/mindre, ge en angle svg
    Object.keys(poke1.stats).forEach((key) => {
      console.log(newPoke1);
      let li1 = document.createElement("li");
      let li2 = document.createElement("li");
      // _______________________________________________ Ivysaur & wartorle, ivysaur weight o height visar inte higher eller lower.
      if (poke1.stats[key] > poke2.stats[key]) {
        li1.innerHTML = `${key}: ${poke1.stats[key]} <img src="./icons/angleup.svg">`;
        li2.innerHTML = `${key}: ${poke2.stats[key]} <img src="./icons/angledown.svg">`;
        firstStats++;
      } else if (poke1.stats[key] < poke2.stats[key]) {
        console.log("lower");
        li1.innerHTML = `${key}: ${poke1.stats[key]} <img src="./icons/angledown.svg">`;
        li2.innerHTML = `${key}: ${poke2.stats[key]} <img src="./icons/angleup.svg">`;
        secondStats++;
      } else if (poke1.stats[key] === poke2.stats[key]) {
        li1.innerHTML = `${key}: ${poke1.stats[key]} <img src="./icons/angleequal.svg">`;
        li2.innerHTML = `${key}: ${poke2.stats[key]} <img src="./icons/angleequal.svg">`;
      }

      ul1.append(li1);
      ul2.append(li2);
      console.log("First stats: " + firstStats);
      console.log("second stats: " + secondStats);
      console.log(poke1);
      if (firstStats > secondStats) {
        battleText.innerHTML = `${poke1.name} has higher stats than ${poke2.name}.`;
      } else if (firstStats < secondStats) {
        battleText.innerHTML = `${poke2.name} has higher stats than ${poke1.name}.`;
      } else {
        battleText.innerHTML = `${poke1.name} has the same stats as ${poke2.name}.`;
      }
    });
    let comparedpokeHeight = compareSize(poke1, poke2, "height");
    let comparedPokeweight = compareSize(poke1, poke2, "weight");
    console.log("Final stats: ");
    console.log(ul1);

    console.log(statList);
    let newUl = ul1.cloneNode(true);
    console.log(newUl);
    loadPokemons(ul1, ul2);
  }
}

const ulHasValues = (ulElem) => {
  let liElem = ulElem.querySelectorAll("li");
  for (let i = 0; i < liElem.length; i++) {
    if (liElem[i].innerText.trim() !== "") {
      return true;
    }
  }
  return false;
};

const loadPokemons = (newUl1, newUl2) => {
  let filledUl;
  console.log(newUl1);
  if (newUl1) {
    filledUl = ulHasValues(newUl2);
  }
  activePoke.innerHTML = "";
  if (selectedPokemons.length > 2) {
    selectedPokemons.shift();
  }
  let poke1 = selectedPokemons[0];
  let poke2 = selectedPokemons[1];
  console.log(selectedPokemons);

  selectedPokemons.forEach((pokemon, index) => {
    let pokeCard = document.createElement("div");
    pokeCard.classList.add("pokemon-card");
    if (activePoke.classList.contains("battleMode")) {
      pokeCard.classList.add("battleMode");
    }
    if (index > 0) {
      pokeCard.classList.add("cardTwo");
    }

    let pokeSprite = document.createElement("div");
    let img = document.createElement("img");
    console.log(pokemon.avatar);
    img.src = pokemon.avatar;

    let pokeTitle = document.createElement("h3");
    pokeTitle.innerText = pokemon.name;
    let pokeHpCont = document.createElement("div");
    pokeHpCont.classList.add("pokeHp");

    const baseHp = pokemon.stats.hp;
    let currentHp = pokemon.currentHp;
    let pokeHp = document.createElement("strong");
    let hpBar = document.createElement("progress");
    hpBar.value = currentHp;
    hpBar.max = baseHp;
    pokeHp.innerHTML = `HP: ${currentHp}/${baseHp}`;

    let pokeSize = document.createElement("div");
    pokeSize.classList.add("size");
    let pokeWeight = document.createElement("p");
    if (pokemon.weight.toString().includes("<img>")) {
      pokeWeight.innerHTML = pokemon.weight;
    } else {
      pokeWeight.innerHTML = `Weight: ${pokemon.weight}`;
    }

    let pokeHeight = document.createElement("p");
    if (pokemon.height.toString().includes("<img>")) {
      pokeHeight.innerHTML = pokemon.height;
    } else {
      pokeHeight.innerHTML = `Height: ${pokemon.height}`;
    }
    pokeSize.append(pokeWeight, pokeHeight);

    pokeHpCont.append(pokeHp, hpBar);

    if (!activePoke.classList.contains("battleMode")) {
      let pokestats = document.createElement("div");
      pokestats.classList.add("pokeStats");
      let statpara = (document.createElement("p").innerText = "Stats: ");

      let poketype = document.createElement("div");
      poketype.classList.add("typings");
      poketype.innerHTML = "Type(s): ";
      let allTypes;
      let color;
      pokemon.typing.forEach((type) => {
        console.log(type.type.name);
        let p = document.createElement("p");
        p.innerText = type.type.name;
        switch (p.innerText) {
          case "grass":
            color = "#03fc62";
            break;
          case "bug":
            color = "#cafc03";
            break;
          case "dragon":
            color = "#111c99";
            break;
          case "electric":
            color = "#f5ee31";
            break;
          case "fighting":
            color = "#b81414";
            break;
          case "fire":
            color = "#f53e31";
            break;
          case "flying":
            color = "#b1f6fc";
            break;
          case "ghost":
            color = "#6312e6";
            break;
          case "ground":
            color = "#fcd777";
            break;
          case "ice":
            color = "#77e8fc";
            break;
          case "normal":
            color = "#bdbdbd";
            break;
          case "poison":
            color = "#cf4dff";
            break;
          case "psychic":
            color = "#ff8ae6";
            break;
          case "rock":
            color = "#ccb995";
            break;
          case "water":
            color = "#427de3";
            break;
          case "fairy":
            color = "#f78fed";
            break;

          default:
            break;
        }
        p.style.backgroundColor = color;
        poketype.append(p);
      });

      if (newUl1) {
        if (index === 0) {
          console.log("First index");
          statList = newUl1.cloneNode(true);
          console.log("statList", statList);
        } else {
          statList = newUl2;
        }
      } else {
        statList = document.createElement("ul");
        statList.classList.add("statList");
        Object.keys(pokemon.stats).forEach((key) => {
          let li = document.createElement("li");
          if (key !== "currentHp") {
            if (poke2) {
              if (
                pokemon.stats[key] > poke2.stats[key] &&
                pokemon.stats[key] === poke1.stats[key]
              ) {
                li.innerHTML = `base ${key}: ${pokemon.stats[key]}`;
              } else if (
                pokemon.stats[key] === poke2.stats[key] &&
                pokemon.stats[key] > poke1.stats[key]
              ) {
                li.innerHTML = `base ${key}: ${pokemon.stats[key]}`;
              } else if (pokemon.stats[key] < poke1.stats[key]) {
                li.innerHTML = `base ${key}: ${pokemon.stats[key]}`;
              } else {
                li.innerHTML = `base ${key}: ${pokemon.stats[key]} `;
              }
            } else {
              li.innerHTML = `${key}: ${pokemon.stats[key]}`;
            }
            statList.append(li);
          }
        });
      }

      pokeSprite.append(img);
      pokestats.append(statpara, statList);
      pokeCard.append(
        pokeSprite,
        pokeTitle,
        pokeHpCont,
        poketype,
        pokeSize,
        pokestats
      );
      activePoke.append(pokeCard);
    } else {
      pokeHpCont.prepend(pokeTitle);
      pokeCard.append(pokeSprite, pokeHpCont);
      pokeSprite.append(img);
      activePoke.append(pokeCard);
    }
  });

  if (selectedPokemons.length > 1) {
    pokeButtons.append(startBattle, compareStatsBtn);
  }
};

const isShiny = () => {
  let roll = Math.floor(Math.random() * 201);
  if (roll < 11) {
    return true;
  }
  return false;
};
let shinyChance;
const getPokemonData = async (url, mon) => {
  let pokeFetch = await fetch(url);
  let pokeData = await pokeFetch.json();
  let pokemonName = pokeData.name;
  shinyChance = isShiny();
  let pokeAvatar;
  if (shinyChance) {
    pokeAvatar = pokeData.sprites.front_shiny;
  } else {
    pokeAvatar = pokeData.sprites.front_default;
  }
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
  mon = new Pokemon(
    pokemonName,
    pokeAvatar,
    pokeType,
    pokemonWeight,
    pokemonHeight,
    stat,
    pokemonMove,
    currentHp
  );

  selectedPokemons.push(mon);
  loadPokemons();
  return mon;
};

let newPoke1;
let newPoke2;

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

  addtoBox.addEventListener("click", async () => {
    //Create a new instance of pokemon class with selected pokemon in dropdown menu.
    if (selectedPokemons.length < 1) {
      newPoke1 = await getPokemonData(
        `https://pokeapi.co/api/v2/pokemon/${pokeSelect.value}`,
        newPoke1
      );
    } else if (selectedPokemons.length === 1) {
      newPoke2 = await getPokemonData(
        `https://pokeapi.co/api/v2/pokemon/${pokeSelect.value}`,
        newPoke2
      );
    } else {
      newPoke1 = { ...newPoke2 };
      newPoke2 = await getPokemonData(
        `https://pokeapi.co/api/v2/pokemon/${pokeSelect.value}`,
        newPoke2
      );
    }
    console.log(newPoke1, newPoke2);
  });
};

const criticalHit = () => {
  let roll = Math.floor(Math.random() * 101);
  if (roll < 11) {
    return true;
  }
  return false;
};

compareStatsBtn.addEventListener("click", () => {
  Pokemon.comparePoke(newPoke1, newPoke2);
});

const singleAttack = (attacker, defender) => {
  let cardTwo = document.querySelector(".cardTwo");
  console.log(attacker);
  console.log(`${attacker.name} attacks first.`);
  battleText.textContent = "";
  let damage = pokemonAttack(attacker, defender);
  if (criticalHit()) {
    damage *= 1.5;
    damage = Math.floor(damage);
    battleText.innerHTML = "<bold>CRITICAL HIT! </bold>";
  }
  let atkPoke = document.createElement("strong");
  atkPoke.innerText = attacker.name;
  atkPoke.style.color = "blue";
  defender.currentHp -= damage;

  battleText.innerHTML += `<strong>${attacker.name}</strong> Dealt <strong>${damage}</strong> damage to <strong>${defender.name}</strong>!`;

  void battleText.offsetWidth;
  battleText.classList.add("typing");
  if (defender.currentHp <= 0) {
    defender.currentHp = 0;
    console.log(defender.name + " has fainted.");
    setTimeout(() => {
      battleText.innerHTML = "BATTLE OVER! " + defender.name + " has fainted!";
      startBattle.disabled = false;
      compareStatsBtn.disabled = false;
    }, 2000);

    loadPokemons(ul1, ul2);
    return;
  }
  loadPokemons(ul1, ul2);
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
  battleText.innerHTML = `<strong>${attacker.name}</strong> attacks first.`;

  const battleLoop = () => {
    if (poke1.currentHp > 0 && poke2.currentHp > 0) {
      setTimeout(() => {
        battleText.innerHTML = "";
        singleAttack(attacker, defender);
        [attacker, defender] = [defender, attacker];
        battleLoop();
      }, 3000);
    }
  };
  if (poke1.currentHp > 0 && poke2.currentHp > 0) {
    battleLoop();
  }

  loadPokemons(ul1, ul2);
};

let ul1 = document.createElement("ul");
let ul2 = document.createElement("ul");

startBattle.addEventListener("click", () => {
  let cardTwo = document.querySelector(".cardTwo");
  cardTwo.classList.add("battleMode");
  let cards = document.querySelectorAll(".pokemon-card");
  cards.forEach((card) => {
    card.classList.add("battleMode");
    console.log(card.classList);
  });
  activePoke.classList.add("battleMode");
  console.log(cardTwo.classList);
  startBattle.disabled = true;
  compareStatsBtn.disabled = true;
  console.log(selectedPokemons);

  const url = newPoke2.avatar;
  const parts = url.split("/");
  const secondLastPart = parts[parts.length - 2]; // Second last part of the URL
  const isPokemonShiny = secondLastPart === "shiny";
  const pokeNum = parts[parts.length - 1].split(".")[0];
  console.log(isPokemonShiny, url, pokeNum);
  console.log(selectedPokemons);
  if (isPokemonShiny) {
    newPoke2.avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokeNum}.png`;
    selectedPokemons[1].avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokeNum}.png`;
  } else {
    newPoke2.avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeNum}.png`;
  }
  console.log(newPoke1.avatar);

  let li1 = document.createElement("li");
  let li2 = document.createElement("li");
  document.querySelectorAll(".statList").forEach((card, index) => {
    console.log(card.innerHTML);
    if (index === 0) {
      console.log("pokemon move added..");
      li1.innerHTML = `<p>Move: ${selectedPokemons[index].move.name} </p>`;
      ul1.append(li1);
      console.log(ul1);
    } else {
      console.log("pokemon move2 added..");

      li2.innerHTML = `<p>Move: ${selectedPokemons[index].move.name} </p>`;
      ul2.append(li2);
    }
    console.log(ul1, ul2);
    loadPokemons(ul1, ul2);
  });
  battleStart();
});

getAllPokemons();
//783 rader innan comment deletion
//586 rader efter comment deletion
