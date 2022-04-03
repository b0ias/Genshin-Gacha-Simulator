export const fetchInfCharacters = async () => {
    //get names characters
    const getNameCharactersUrl = `https://api.genshin.dev/characters/`
    const namesCharactersPromiseResult = await fetch(getNameCharactersUrl)
    let nameCharactersList = await namesCharactersPromiseResult.json();

    //get characters informations
    const getCharactersInfUrl = name => `https://api.genshin.dev/characters/${name}`
    const infCharactersPromises = Array(nameCharactersList.length).fill().map((_, index) =>
        fetch(getCharactersInfUrl(nameCharactersList[index])).then(response => response.json()))
        const infCharactersList = await Promise.all(infCharactersPromises);

    //associate URL name
    for (let i = 0; i < infCharactersList.length; i++) {
        infCharactersList[i].urlName = nameCharactersList[i];
    }

    //organize characters informations
    let fiveStarCharacterList = [];
    let fourStarCharacterList = [];

    for (let i = 0; i < infCharactersList.length; i++) {
        if (infCharactersList[i].rarity == 5) {
            fiveStarCharacterList.push(infCharactersList[i]);
        } else if (infCharactersList[i].rarity == 4) {
            fourStarCharacterList.push(infCharactersList[i]);
        }
    }
    return [fiveStarCharacterList, fourStarCharacterList];
}
export const fetchInfWeapon = async () => {
    //get names weapon list
    const getNamesWeaponUrl = `https://api.genshin.dev/weapons/`;
    const namesWeaponPromise = await fetch(getNamesWeaponUrl);
    const namesWeaponList = await namesWeaponPromise.json()

    //get weapon names
    const getInfWeaponUrl = weapon => `https://api.genshin.dev/weapons/${weapon}`;
    const infWeaponPromise = Array(namesWeaponList.length).fill("").map((_, index) => fetch(getInfWeaponUrl(namesWeaponList[index])).then(response => response.json()))

    const infWeaponList = await Promise.all(infWeaponPromise);

    //associate URL name
    for (let i = 0; i < infWeaponList.length; i++) {
        infWeaponList[i].urlName = namesWeaponList[i];
    }

    //organize characters informations
    let fiveStarWeaponList = [];
    let fourStarWeaponList = [];
    let threeStarWeaponList = [];

    for (let i = 0; i < infWeaponList.length; i++) {
        if (infWeaponList[i].rarity == 5) {
            fiveStarWeaponList.push(infWeaponList[i]);
        } else if (infWeaponList[i].rarity == 4) {
            fourStarWeaponList.push(infWeaponList[i]);
        } else if (infWeaponList[i].rarity == 3) {
            threeStarWeaponList.push(infWeaponList[i]);
        }
    }
    return [fiveStarWeaponList, fourStarWeaponList, threeStarWeaponList];
}