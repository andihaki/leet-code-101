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

# cara yang bener

space complexity: O(1)
time complexity: O(m.n)
https://youtu.be/T41rL0L3Pnw?t=506

Hmmm, masih kurang paham, tapi kurang lebih summary nya:

1. row/column baris pertama = marker, apakah row / column perlu di 0 kan
2. apply 0 marker tadi ke inner cells
3. column pertama di 0-kan kalo `matrix[0][0] === 0`
4. row pertama di 0-kan kalo `rowZero = true`

## visualisasi

```
        col0    col1    col2
row0   [ c0 ]  [ c1 ]  [ c2 ]   <- column markers
row1   [ r1 ]  [    ]  [    ]
row2   [ r2 ]  [    ]  [    ]
```

```
1 1 1
1 0 1
1 1 1
```

## Step / block 1

"ku tandai kau", row sama kolom pertama di `0` in

```javascript
matrix[0][j] = 0;
if (i > 0) {
  matrix[i][0] = 0;
}
```

```
1 0 1
0 0 1
1 1 1
```

`rowZero` tetap 1, karna `matrix[i][j]` bukan 0 => `if (matrix[i][j] === 0) {`

## 2

ubah

```
1 0 1
0 0 1
1 1 1
```

jadi

```
1 0 1
0 0 0
1 0 1
```

"kok bisa?" karna row/kolom index 0 adalah marker. maka loop index mulai index ke-1.

```javascript
for (let i = 1; i < row; i++) {
    for (let j = 1; j < column; j++) {
      if (matrix[0][j] === 0 || matrix[i][0] === 0) {
        matrix[i][j] = 0;
```

## 3

inner circle (row column indeks > 0) udah di-0-in.
lanjut cek KOLOM indeks ke-0 perlu di 0-in ga?:
`if (matrix[0][0] === 0) {`

## 4

terakhir ROW indeks ke-0 perlu di 0-in?
`if (rowZero) {`
