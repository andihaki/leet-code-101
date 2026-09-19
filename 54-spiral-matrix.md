# soal

Given an m x n matrix, return all elements of the matrix in spiral order.

# contoh

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

# solusi

ada 4 pointer: left, right, top dan bottom;
left = 0, right = matrix[0].length
top = 0, bottom = matrix.length
result = []

`while loop` left < right && top < bottom. index diambil searah jarum jam dan ada 4 arah / logic:

1. atas: kiri ke kanan. loop left < right => misal isi result = [[a,b]] jadi a = top, b = indeks dinamis, jangan lupa tambah posisi pointer atas, karna value nya dah di ambil -> `top++`
2. kanan: atas ke bawah. loop top < bottom => a = indeks dinamis, b = right-1, `right--`
3. bawah: kanan ke kiri. `if top < bottom` reverse loop right-1 > left-1 => a=bottom-1, b= indeks dinamis, `bottom--`
4. kiri: bawah ke atas. `if left < right` reverse loop bottom-1 > top-1 => a=indeks dinamis, b = left, `left++`
