function safeHandler(fn) {
  return function (...args) {
    console.log("fn ", fn);
    console.log("args ", args);
    try {
      //   return fn.apply(this, args);
      return fn(...args);
    } catch (error) {
      console.error("[Error] in", fn.name || "unknown function", error.message);
    }
  };
}

function wrapAllMethods(obj) {
  const wrapped = {};
  for (const [key, value] of Object.entries(obj)) {
    wrapped[key] = typeof value === "function" ? safeHandler(value) : value;
  }
  return wrapped;
}

const sum = safeHandler((a, b) => {
  return a + b + c;
});
const subtract = (a, b) => {
  return a - b;
};
const power = (a, b) => {
  return a * b;
};
const safes = wrapAllMethods({ subtract, power });

console.log("Result: ", sum(1, 2));
console.log("Result: ", safes.subtract(3, 2));
console.log("Result: ", safes.power(3, 2));
