# soal

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

# contoh

Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

# solusi

jadi perlu cek apakah huruf di t sama dengan s, walaupun t adalah kata acak.

## cara sendiri:

1. t.length !== s.length return false. karna kalo panjang kata karakter beda dah pasti bukan anagram.
2. looping text s, setiap karakter s[i] ada di t maka hapus karakter nya `s[i].includes(t) then t.replace(s[i], '')`

## cara optimal:

1. tetep, sama kayak atas
2. sort ascending huruf di kata s dan t. jadi karna udah urut berarti simply s === t
