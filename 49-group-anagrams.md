# soal

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

# contoh

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

# solusi

Idenya adalah bikin 1 object buat nampung hasil sort setiap kata sebagai key, dan value nya adalah index dari strs.
misal: ["eat", "tea"] -> results = { aet: [1, 2]}

trus buat bikin output tinggal loop values dari `results` :
`return Object.values(results).map(val => val.map(i => strs[i]))`
