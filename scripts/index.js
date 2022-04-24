//imports
import { fetchInfCharacters } from "./requesterCommand.js";
import { fetchInfWeapon } from "./requesterCommand.js";

import { creatWish } from "./gachaFunctions.js"
import { resetAll } from "./gachaFunctions.js"

//import Inf Characters Array[[fiveStarCharacterList], [fourStarCharacterList]]
let charactersInfList;
fetchInfCharacters()
  .then(response => charactersInfList = response)

//import inf weapon Array[fiveStarWeaponList, fourStarWeaponList, threeStarWeaponList]
let weaponInfList;
fetchInfWeapon()
  .then(response => weaponInfList = response)

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
  creatWish(buttonValue, charactersInfList, weaponInfList, HTMLgachaLogPainel, HTMLgachaCounter); //buttonValue (1x or 10x), charactersInfList, HTMLgachaLogPainel (DOMselector)
}))
HTMLresetButton.addEventListener(`click`, () => {
  resetAll(HTMLgachaLogPainel, HTMLgachaCounter)
})