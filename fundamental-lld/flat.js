function flat(arr) {
    return arr.reduce((acc, curr) => {
        if (Array.isArray(curr)) {
            return acc.concat(flat(curr))
        }
        return acc.concat(curr);
    }, [])
}

console.log(flat([[1,2,3],[4,5],[6]] ));
console.log(flat([2,[2,3]]));
console.log(flat([4,[2,[1]]]));
console.log(flat([]));