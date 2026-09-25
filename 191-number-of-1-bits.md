# soal

Given a positive integer n, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).

# contoh

Example 1:
Input: n = 11
Output: 3

Explanation:
The input binary string 1011 has a total of three set bits.

Example 2:
Input: n = 128
Output: 1
Explanation:
The input binary string 10000000 has a total of one set bit.

Example 3:
Input: n = 2147483645
Output: 30
Explanation:
The input binary string 1111111111111111111111111111101 has a total of thirty set bits.

# mikir

Itung berapa total angka satu dari binary number nya.

```
n   =   hasil bagi      |   sisa bagi
n   =   Math.floor(n/2) |   n%2
11  =   5               |   1
    =   2               |   1
    =   1               |   0
    =   0               |   1

binary number dari 11 = 1011, maka angka 1 = 3
```
