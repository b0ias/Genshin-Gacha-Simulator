//imports
import { fetchInfCharacters } from "./requesterCommand.js";
import { fetchInfWeapon } from "./requesterCommand.js";

import { creatWish } from "./gachaFunctions.js"
import { resetAll } from "./gachaFunctions.js"

//import Inf Characters Array[[fiveStarCharacterList], [fourStarCharacterList]]
let infCharactersList;
fetchInfCharacters()
  .then(response => infCharactersList = response)

//import inf weapon Array[inf weapons list]
let infWeaponList;
fetchInfWeapon()
  .then(response => infWeaponList = response)

await fetchInfCharacters();
await fetchInfWeapon();

//selector DOM elements
const gachaButton = document.querySelectorAll("[data-gachaButton]"); //Array[0:1, 1:10]
const HTMLresetButton = document.querySelector("[data-resetButton]");
const HTMLgachaCounter = document.querySelectorAll("[data-gachaCounter]"); //Array[0:"all", 1:"T3", 2:"T4", 3:"T5"]
const HTMLgachaLogPainel = document.querySelector("[data-gachaLogPanel]");

//events
gachaButton.forEach(button => button.addEventListener("click", () => {
  const buttonValue = button.dataset.gachabutton;
  creatWish(buttonValue, infCharactersList, HTMLgachaLogPainel, HTMLgachaCounter); //buttonValue (1x or 10x), infCharactersList, HTMLgachaLogPainel (DOMselector)
}))
HTMLresetButton.addEventListener(`click`, () => {
  resetAll(HTMLgachaLogPainel, HTMLgachaCounter)
})