Learn Low Level Design

# hoisting

`let`, `const`, `class` and `function` expression ( const a = function b() {} ) = NOT hoisted or not accessible until variable declaration called Temporary Dead Zone.
`var`, `function` declaration, `import` is hoisted.

# closure

kombinasi dari function + lexical environment.

# coercion

auto conversion, contoh: `"9"/"3" = 3`.
`Number(undefined); // NaN`, `Number(null); // 0`

# primitive vs referece. shallow vs deep copy

- `Object.assing(destionation, ...source);` // Object.assing(user, role1, role2) buat shallow copy
- `structuredClone(obj);` // buat copy nested object / deep copy, kecuali function

# prototype chain

## constructor

```
const boxes = [
  { value: 1, getValue() { return this.value; } },
  { value: 2, getValue() { return this.value; } },
  { value: 3, getValue() { return this.value; } },
];
```

same as

```
function Box(value) {
  this.value = value;
}
Box.prototype.getValue = function () {
  return this.value;
};
const boxes = [new Box(1), new Box(2), new Box(3)];
```

or

```
class Box {
  constructor(value) {
    this.value = value;
  }
  getValue() {
    return this.value;
  }
}
const boxes = [new Box(1), new Box(2), new Box(3)];
```

## setPropertyOf -> extends

```
function Base() {}
function Derived() {}
Object.setPrototypeOf(Derived.prototype, Base.prototype);
// equal to
class Base {}
class Derived extends Base {}
```

# class

## Inheritance

it need `super` to access parent `this`

```
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
```

# High Order Function

# last

11

https://eloquentjavascript.net/05_higher_order.html#h-TcUD2vzyMe
