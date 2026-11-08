function flat(arr) {
  return arr.reduce(
    (acc, curr) =>
      Array.isArray(curr) ? acc.concat(flat(curr)) : acc.concat(curr),
    [],
  );
}

console.log(flat([2, [2, 3]]));
console.log(flat([4, [2, [1]]]));
