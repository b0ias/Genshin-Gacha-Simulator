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
    let fiveStarCharacterList = charactersInfList.filter(character => character.rarity == 5);
    let fourStarCharacterList = charactersInfList.filter(character => character.rarity == 4);

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

    const weaponInfList = await Promise.all(weaponInfPromise);

    //associate URL name
    for (let i = 0; i < weaponInfList.length; i++) {
        weaponInfList[i].urlName = weaponNamesList[i];
        weaponInfList[i].itemType = "weapon";
    }

    //organize characters informations
    let fiveStarWeaponList = weaponInfList.filter(weapon => weapon.rarity == 5);
    let fourStarWeaponList = weaponInfList.filter(weapon => weapon.rarity == 4);;
    let threeStarWeaponList = weaponInfList.filter(weapon => weapon.rarity == 3);;

    return [fiveStarWeaponList, fourStarWeaponList, threeStarWeaponList];
}