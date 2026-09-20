# soal

Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

# contoh

Example 1:
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

Example 2:
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

# mikir simpel

`in place` jadi ganti value langsung di array `matrix` ga boleh bikin array baru

1. jadi perlu nest loop buat cari angka 0 ada diindeks berapa, tampung di variables `zeroes = []` ketika `matrix[i][j] === 0`
2. loop `zeroes` + nest loop lagi `matrix`. ketika indeks row + column zeroes match matrix, maka ganti dengan `0`.

logika:
buat Contoh 1.
zeroes = `[ [ 1, 1 ] ]`
matrix = `[          [0,1]
            [1,0]   [1,1]   [1,2]
                    [2,1]
]`

snippet:

```javascript
for (const val of zeroes) {
  const [row, column] = val;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (row === i || column === j) {
        matrix[i][j] = 0;
      }
    }
  }
}
```
