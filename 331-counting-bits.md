# soal

Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Do not solve it with built-in functions (i.e., like \_\_builtin_popcount in C++).

# contoh

Example 1:
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10

Example 2:
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101

# mikir

perlu hitung ada berapa angka 1 dari setiap indeks ke-n. mirip kayak [Number of 1 bits](./191-number-of-1-bits.md), tapi beda dikit disini n = loop `i..n`.
