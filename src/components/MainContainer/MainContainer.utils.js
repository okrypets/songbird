export const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const getUniqueDataArra = arr => {
    const uniqArr = arr.reduce((uniq, it) => {
        if (uniq.length > 0) {
            const isNotUniq = uniq.some(un => un.en === it.en)
            if (isNotUniq) return uniq;  
        }              
        uniq.push(it);
        return uniq;
    }, []);
    return uniqArr;
}

export const getDataById = (id, data) => data.filter(it => it.id === id);

export default {};