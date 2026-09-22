# solusi

Pake rumus fibonacci, angka selanjutnya = penjumlahan 2 angka sebelumnya:
= a b c
= a b (a+b)
= 1 1 1+1
= 1 1 2 3 5 8 ...dst

Karna ada 2 jalan antara "1" atau "2", maka secara visual akan mirip decision tree.

```
            0
        1       2
    1       2
```

jalan "2" (kanan) sebenernya udah dilakukin di jalan "1" tinggal di simpan / cache / memoize aja value "1" trus dipake ulang di jalan "2". trus karna jalan ke bawah perlu value dari jalan atas, maka dimulai dari bawah ke atas. makanya ternyata === fibonacci
https://www.youtube.com/watch?v=Y0lT9Fck7qI
