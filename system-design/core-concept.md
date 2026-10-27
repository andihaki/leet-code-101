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

reliable: system up and response with correct data.

## Single Point of Failure (SPOF)

kalo server instance cuma 1 dan error, maka aplikasi error dan bikin SPOF, resolve nya dengan redundancy, ada 1 primary, 1 secondary / standby instance, bisa active-active / actice-passive. tapi redudancy punya kekurangan: cost, kompeksitas (failover handling, monitoring),

runbooks: documentation how to handle an issue when alert / issue happended.

\*if this thing fails right now, what stops working, who notices, and how do we recover?

## Latency vs Throughput

Ibarat jalan toll maka:

- bandwidth: berapa jalur toll
- throughput: berapa **banyak** mobil yang lewat selama sejam. **berapa banyak proses**
- latency: **waktu** mobil dari pintu tall A ke B. **berapa lama proses**

### Latency

last:
https://algomaster.io/learn/system-design/latency-vs-throughput#8-the-trade-offs-between-latency-and-throughput
