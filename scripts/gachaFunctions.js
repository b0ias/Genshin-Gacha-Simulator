//declaring the counters
const WishCounter = {
    all: 0,
    t5: 0,
    t4: 0,
    t3: 0
}
const PityCounter = {
    t5: 0,
    t4: 0,
}

//update Counter
const updateValueCounterAndPityCounter = (resultRarityProbablyTest) => {
    //wish counter
    WishCounter.all += 1;
    const rarityCounter = {
        0: "t5",
        1: "t4",
        2: "t3"
    }
    const WishRarity = rarityCounter[resultRarityProbablyTest];

    WishCounter[WishRarity] += 1;

    //pity counter
    PityCounter.t5++;
    PityCounter.t4++;
    PityCounter[WishRarity] = 0;
}
const updateHTMLCounter = (HTMLgachaCounter) => {
    const rarityCounter = {
        0: "all",
        1: "t5",
        2: "t4",
        3: "t3"
    }
    for(let i = 0; i < HTMLgachaCounter.length; i++){
        HTMLgachaCounter[i].innerHTML = WishCounter[rarityCounter[i]]
    }
}

const resetCounters = (HTMLgachaCounter) => {
    const rarityCounter = {
        0: "all",
        1: "t5",
        2: "t4",
        3: "t3"
    }
    for(let i = 0; i < Object.keys(WishCounter).length; i++){
        WishCounter[rarityCounter[i]] = 0;
    }
    for(let i = 0; i < HTMLgachaCounter.length; i++){
        HTMLgachaCounter[i].innerText = 0;
    }
    PityCounter[0] = 0;
    PityCounter[1] = 0;
}

//probably tests
const getRealProbability = (arrayProbably) => {
    let cumulativeProbability = 0;
    let realProbability = [];
    for (let i = 0; i < arrayProbably.length; i++) {
        cumulativeProbability += arrayProbably[i];
        realProbability[i] = cumulativeProbability;
    }
    return realProbability;
}
const getProbabilityResult = (realProbability, arrayList) => {
    const luckyNumber = Math.random() * 100;
    for (let i = 0; i < realProbability.length; i++) {
        if (luckyNumber <= realProbability[i]) {
            return arrayList[i];
        }
    }
}
const probablyTest = (arrayProbably, arrayList) => {
    const realProbability = getRealProbability(arrayProbably) //cumulative probability: [10, 30, 60] => [10, 40, 100]
    return getProbabilityResult(realProbability, arrayList) //probability return answer
}

//equality probably tests
const getEqualityProbably = (arrayList) => {
    const arrayProbably = Array(arrayList.length).fill(100 / arrayList.length)
    let cumulativeProbability = 0;
    let realProbability = [];
    for (let i = 0; i < arrayProbably.length; i++) {
        cumulativeProbability += arrayProbably[i];
        realProbability[i] = cumulativeProbability;
    }
    return realProbability;
}
const equalityProbablyTest = (arratList) => {
    const equalityProbably = getEqualityProbably(arratList); //cumulative equality probability: list.length = 4 => [25, 50, 75, 100]
    return getProbabilityResult(equalityProbably, arratList) //probability return answer
}

const getProbability = () => {
    let probably = []
    //Five star probability
    const FiveStarPrabability = {
        76 : 20,
        77 : 14,
        78 : 10,
        79 : 7,
        80 : 5,
        90 : 100
    }
    console.log(FiveStarPrabability[PityCounter.t5 + 1] != undefined)
    for (let i = 0; i < Object.keys(FiveStarPrabability).length; i++){
        if(FiveStarPrabability[PityCounter.t5 + 1] != undefined){
            probably[0] = FiveStarPrabability[PityCounter.t5 + 1]
        } else{
            probably[0] = 0.6
        }
    }

    //Four star probability
    if(PityCounter.t4 == 10 - 1) {
        console.log("chegou")

        if(probably[0] < 1,6){
            probably[0] = 1,6
        }
        probably[1] = 100 - probably[0];
    } else{
        probably[1] = 2.5
    }

    //three star probability
    probably[2] = 100 - (probably[0] + probably[1])

    //return
    console.log(probably)
    return probably
}

//creat a new wish - return Array [result]
const newWish = (buttonValue, charactersInfList, weaponInfList) => {
    let resultNewWish = [];
    for (let i = 0; i < buttonValue; i++) {
        const resultRarityProbablyTest = probablyTest(getProbability(), [0, 1, 2]);
        updateValueCounterAndPityCounter(resultRarityProbablyTest);
        
        let infWishList = []
        if (resultRarityProbablyTest <= 1){
            infWishList = equalityProbablyTest([charactersInfList, weaponInfList]);
        } else if(resultRarityProbablyTest > 1){
            infWishList = weaponInfList;
        }

        resultNewWish.push(equalityProbablyTest(infWishList[resultRarityProbablyTest]));
    }
    return resultNewWish;
}

//creat a HTML of wish - return HTML of Wish
const creatWishHTML = (arrayWishes) => {
    const content = arrayWishes.reduce((accumulator, wishes) =>
        accumulator + creatInfWishHTML(wishes), "")

    const resultWishHTML =
        `
    <div class="app-gacha-logPanel-log-wish">
      <h4 class="app-gacha-logPanel-log-wish-title">${arrayWishes.length}X wishes</h4>
      ${content}
    </div>
    `
    return resultWishHTML;
}
const creatInfWishHTML = (wishes) => {
    if(wishes.itemType == "character"){
        return creatCharacterWishHTML(wishes)
    }else if(wishes.itemType == "weapon"){
        return creatWeaponWishHTML(wishes)
    }
}
const creatCharacterWishHTML = ({ name, rarity, vision, weapon, urlName}) => {
    return `
    <div class="app-gacha-logPanel-log-wish-wishPainel character-${vision.toLowerCase()}">
    <img class="app-gacha-logPanel-log-wish-wishPainel-image" src="https://api.genshin.dev/characters/${urlName}/icon" alt="image character">
    <div class="app-gacha-logPanel-log-wish-wishPainel-inf">
        <table class="app-gacha-logPanel-log-wish-wishPainel-inf-table">
            <tr>
                <td>Name:</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Rarity:</td>
                <td>${rarity} &star;</td>
            </tr>
            <tr>
                <td>Element:</td>
                <td>${vision}</td>
            </tr>
            <tr>
                <td>Weapon:</td>
                <td>${weapon}</td>
            </tr>
        </tr>  
        </table>
    </div>
  </div>\n
  `
}
const creatWeaponWishHTML = ({ name, rarity, type, passiveName, urlName}) => {
    return `
    <div class="app-gacha-logPanel-log-wish-wishPainel weapon-${rarity}Star">
        <img class="app-gacha-logPanel-log-wish-wishPainel-image" src="https://api.genshin.dev/weapons/${urlName}/icon" alt="image weapon">
        <div class="app-gacha-logPanel-log-wish-wishPainel-inf">
            <table class="app-gacha-logPanel-log-wish-wishPainel-inf-table">
                <tr>
                    <td>Name:</td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td>Rarity:</td>
                    <td>${rarity} &star;</td>
                </tr>
                <tr>
                    <td>Type:</td>
                    <td>${type}</td>
                </tr>
                <tr>
                    <td>Passive:</td>
                    <td>${passiveName}</td>
                </tr>
            </tr>  
            </table>
        </div>
    </div>\n
  `
}

export const creatWish = (buttonValue, charactersInfList, weaponInfList, HTMLgachaLogPainel, HTMLgachaCounter) => {
    const wishes = newWish(buttonValue, charactersInfList, weaponInfList); //return Array [result]
    const resultWishHTML = creatWishHTML(wishes); //return HTML of Wish
    updateHTMLCounter(HTMLgachaCounter); //HTML counter update
    HTMLgachaLogPainel.innerHTML += resultWishHTML; //put HTML into DOM
}

export const resetAll = (HTMLgachaLogPainel, HTMLgachaCounter) => {
    HTMLgachaLogPainel.innerHTML = ""; //reset log
    resetCounters(HTMLgachaCounter); //reset counter
}