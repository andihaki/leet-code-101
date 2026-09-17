start: 15 september 2020, 14:20:00
end: 15 september 2020, 20:25:00 💥

# soal

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

# contoh

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Jadi debit air terbanyak antara dua titik adalah indeks ke 1 sampai ke 8 (sumbu x) yaitu nilainya 8 dan 7 (sumbu y).
rumus luas adalah Panjang x Lebar
= sumbu x x sumbu y
= (height[1] - height[8]) x min(height[1], height[8])
= (8 - 1) x (7)
= 7 x 7
= 49

Jadi logic solving-nya:

- ada 2 pointer kiri dan kanan
- variable result = 0, buat nampung hasil kalkulasi luas
- variable rightIndex buat nampung posisi pointer sebelah kanan
- loop biasa dengan index 0 buat pointer kiri
- ketika pointer kiri < rightIndex maka loop seperti biasa buat ambil luas, tapi
- kiri > rightIndex maka pakai while loop buat kurangi rightIndex--, lalu hitung luas dan ambil maksimal value dari result
