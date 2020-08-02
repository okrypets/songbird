export const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const getDataById = (id, data) => data.filter(it => it.id === id);

export default {};