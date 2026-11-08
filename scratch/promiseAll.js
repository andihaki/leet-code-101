function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;

    if (promises.length === 0) {
      resolve(result);
      return;
    }

    promises.forEach((p, i) =>
      Promise.resolve(p)
        .then((val) => {
          result[i] = val;
          if (++count === promises.length) resolve(result);
        })
        .catch(reject),
    );
  });
}

promiseAll([
  new Promise((resolve) => setTimeout(() => resolve("slow"), 100)),
  Promise.resolve("fast"),
  "already a value",
]).then((values) => console.log(values));
