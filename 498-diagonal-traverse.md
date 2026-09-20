# soal

Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

# contoh

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Example 2:
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]

# solusi

dari Example 1, coba mapping index dari Output
Output: `[1,     2,      4,      7,      5,      3,      6,      8,      9]`
index : `[0,0   0,1     1,0     2,0     1,1     0,2     2,1     1,2     2,2]`
idx sum:`[0     1       1       2       2       2       3       3       4]`

keliatan ada pola kalo sum nya linear ascending, berarti tinggal loop bisa aja. trus karna array 2 dimensi, jadi perlu 2x loop

```javasript
const result [], temp = {};
for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
        const sum = i + j;
        console.log({ i, j, sum })
        // if (temp[sum] === undefined) temp[sum] = [];
        // temp[sum].push(mat[i][j])
    }
}
```

tapi kalo langsung push `mat[i][j]` ke result, hasilnya masih ampas.
current output : [1,4,2,7,5,3,8,6,9]
expected output: [1,2,4,7,5,3,6,8,9]

ada pola lagi, notice `4, 2` -> `2, 4` dan `8, 6` -> `6, 8` kebalik. jadi perlu `temp` object buat nampung `sum` sebagai key dan index `mat[i][j]` sebagai value. Terus terakhir tinggal reverse aja value-nya `key%2 === 0`
