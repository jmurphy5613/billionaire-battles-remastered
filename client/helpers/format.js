export const putNftIntoCorrectObjectFormat = (id, name, imgLink, health, maxHealth) => {
    let current = {
        id: id,
        img: `${imgLink}`,
        name: `${name}`,
        health: health,
        maxHealth: maxHealth
    }
    return current;
}