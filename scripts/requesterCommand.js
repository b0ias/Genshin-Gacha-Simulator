export const fetchInfCharacters = async () => {
    //get names characters
    const getNameCharactersUrl = `https://api.genshin.dev/characters/`
    const charactersNamesPromiseResult = await fetch(getNameCharactersUrl)
    let charactersNameList = await charactersNamesPromiseResult.json();

    //get characters informations
    const getCharactersInfUrl = name => `https://api.genshin.dev/characters/${name}`
    const infCharactersPromises = Array(charactersNameList.length).fill().map((_, index) =>
        fetch(getCharactersInfUrl(charactersNameList[index])).then(response => response.json()))
        const charactersInfList = await Promise.all(infCharactersPromises);

    //associate URL name and set type = character
    for (let i = 0; i < charactersInfList.length; i++) {
        charactersInfList[i].urlName = charactersNameList[i];
        charactersInfList[i].itemType = "character";
    }

    //organize characters informations
    let fiveStarCharacterList = [];
    let fourStarCharacterList = [];

    for (let i = 0; i < charactersInfList.length; i++) {
        if (charactersInfList[i].rarity == 5) {
            fiveStarCharacterList.push(charactersInfList[i]);
        } else if (charactersInfList[i].rarity == 4) {
            fourStarCharacterList.push(charactersInfList[i]);
        }
    }
    return [fiveStarCharacterList, fourStarCharacterList];
}
export const fetchInfWeapon = async () => {
    //get names weapon list
    const getNamesWeaponUrl = `https://api.genshin.dev/weapons/`;
    const weaponNamesWPromise = await fetch(getNamesWeaponUrl);
    const weaponNamesList = await weaponNamesWPromise.json()

    //get weapon names
    const getInfWeaponUrl = weapon => `https://api.genshin.dev/weapons/${weapon}`;
    const weaponInfPromise = Array(weaponNamesList.length).fill("").map((_, index) => fetch(getInfWeaponUrl(weaponNamesList[index])).then(response => response.json()))

    const infWeaponList = await Promise.all(weaponInfPromise);

    //associate URL name
    for (let i = 0; i < infWeaponList.length; i++) {
        infWeaponList[i].urlName = weaponNamesList[i];
        infWeaponList[i].itemType = "weapon";
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