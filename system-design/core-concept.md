System Design

# Core concept

## scalability

: cara handle overload traffic (read / write) dengan cari bootleneck, trus di-scale. solusi scale antara:

1. scale vertical (perlu downtime) atau horizontal
2. DB sharding kalo kebanyakan write atau DB replica kalo banyak read n cache ga cukup.

## availability

### Cascading failures

buat return response, bisa jadi perlu panggil 2 endpoint, ketika salah satu lemot bakal mempengaruhi response karna harus nunggu response dari A, baru panggil B. solving: pake circuit breaker, buat skip panggil A dan langsung ke B, tapi circuit braker perlu track API mana yang di skip, trus setelah cooldown (setTimeout) make circuit braker coba cek lagi A udah normal belum.

3 status circuit breaker:

- closed: nerima traffic
- open: blok traffic
- half-open: nerima dikit buat health check

## Reliability

last:
https://algomaster.io/learn/system-design/reliability
