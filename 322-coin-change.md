# soal

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

# contoh

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

# mikir

awalnya mikir bakal bisa di solve pakai sort descending + greedy. tapi tyduck berhasil karna perlu cari "kombinasi terkecil", misal:
coins = [1, 6, 7, 9, 11], amount = 13.
outputnya bisa:

- 9 + 1 + 1 + 1 + 1
- 11 + 1 + 1 // ini ketemu pake greedy
- 6 + 7 // tapi ini syulit.

# solusi

Pakai Dynamic Programming DP bottom-up buat looping setiap amount dari terkecil ke besar.
misal: amount = 13, berarti ada `DP[0]...DP[13]`.
DP[0] = 0 // base case
DP[1] = 1 // karna di coins ada coin = 1
DP[2] = 1 + DP[1]; // 1 + 1 = 2
DP[3] = 1 + DP[2];
DP[4] = 1 + DP[3];
DP[5] = 1 + DP[4];
DP[6] = 1; // pakai coin = 6
DP[7] = 1; // pakai coin = 7
DP[8] = 1 + DP[7];
DP[9] = 1 // pakai coin = 9
DP[10] = 1 + DP[9];
DP[11] = 1 // pakai coin = 11
DP[12] = 1 + DP[11]
DP[13] = DP[6] + DP[7];
