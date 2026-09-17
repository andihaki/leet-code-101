# soal

Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

# contoh

Example 1:

Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
Example 2:

Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

# solusi

`array in-place` kayaknya ga boleh nambah array baru buat nambung data setelah array di reverse. Jadinya ide solve-nya pakai array swap `[a, b] = [b, a]`.

## cara sendiri:

1. loop array kayak biasa tapi cuma setengah aja `Math.ceil((s.length-1)/2)`, kenapa pake `Math.ceil` bukan `floor` aja? karna ada case array-nya ganjil

## cara optimal:
