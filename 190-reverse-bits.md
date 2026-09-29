# soal

Reverse bits of a given 32 bits signed integer.

# contoh

Example 1:
Input: n = 2
Output: 1073741824
Explanation:
Integer Binary

```
2           00000000000000000000000000000010
1073741824  01000000000000000000000000000000
```

# mikir

Inget 32 bit = 32 digit angka 0 atau 1. jadi walaupun binary 2 = `10` perlu nambah 30 angka 0 lagi di depannya.
Konversi ke binary:

```
let binary = "";
while (n) {
    binary += n % 2;
    n = Math.floor(n / 2);
}
```

karna outputnya cuma `01`, jadi perlu namabahin suffix `0`

```
while (binary.length < 32) {
    binary += "0"
}
```

outputnya = `01000000000000000000000000000000`, tinggal konversi ke number. tapi agak tricky buat mainan indeks.

```
let result = 0;
for (let i=0; i<binary.length; i++) {
    result += 2 ** (32 - i - 1) * binary[i]
}
return result
```

kenapa perlu `32 - i - 1` soalnya gini, indeks mulainya dari 0. trus kalo binary index ke-0 = di kali 31, indeks ke-1 = di kali 30

```
indeks ke-i | val       |   binary[i]   | val ** binary[i] * 2
0           | 32 - 0 - 1|   0           | 2 ** 31 * 0 = 0
1           | 32 - 1 - 1|   1           | 2 ** 30 * 1 =  1073741824
```

# cara cepet

kalo boleh pake build in func, `n.toString(2)` otomatis konversi number ke binary

```
let binary = n.toString(2).split('').reverse().join('');
while (binary.length < 32) {
    binary += "0"
}
return parseInt(binary, 2) // konversi balik dari binary ke number
```
