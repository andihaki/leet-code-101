# soal

Given an integer array nums, return the length of the longest strictly increasing subsequence.

# contoh

Input: nums = [9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

# solusi dfs depth first search

<!-- dfs(5): 7, j=6: 101>7 → 1+1=2; j=7: 18>7 -->

# solusi dynamic programming

Dynamic programming selalu mulai dari base case? jadi minimal length setiap `num of nums` = 1, jadi mulai looping mundur dari nums.length -1 ke-0.

- `let dp = Array(nums.length).fill(1)` data dengan default value = base case.
- `for (let i=nums.length-1; i>=0; i++)` looping descending excluding index terakhir, karna base case = 1
- `for (let j=i+1; j<nums.length; j++)` looping asc buat cek afakah data index ke nums.length-2 < nums.length-1
- `if (nums[i]<nums[j]) dp[i]=Math.max(dp[i], 1+dp[j])` ganti nilai `dp` kalo nums.length-2 < nums.length-1 = true
- `return Math.max(...dp)` ambil angka terbesar
