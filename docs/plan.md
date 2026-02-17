# Rencana Implementasi (BE + FE)

## Strategi Pengerjaan Per Modul
Setiap modul dikerjakan berurutan dengan pola: BE dulu sampai endpoint stabil + Swagger, lalu FE untuk modul tersebut, baru lanjut modul berikutnya.

Urutan modul yang disarankan:
1. Auth & User
2. Project & Unit (Sitemap core)
3. Realtime Sitemap
4. Leads & Wallet
5. e-KYC
6. Edukasi & Kalkulator
7. Progres & Upload

## Backend (NestJS)
1. Fondasi proyek: struktur modul, env, config, logging, dan error handling dasar.
2. Database: Prisma schema sesuai relasi User, Project, Unit, Lead, Wallet, WalletTransaction; migrasi Postgres.
3. Auth & role: JWT, guards, decorator `@Roles()`, endpoint login/registrasi.
4. Core API: CRUD Project dan Unit, validasi DTO, pagination/filter.
5. Sitemap realtime: WebSocket gateway dan event update status unit.
6. Leads & wallet: create lead, unlock lead, debit wallet, catat transaksi.
7. e-KYC: upload KTP/selfie/ID card, status verifikasi, blocking akses marketing jika belum verified.
8. Edukasi & kalkulator: endpoint kalkulator biaya all-in dan data transparansi.
9. Upload progres: endpoint upload foto progres, penyimpanan R2/VPS.
10. Dokumentasi: Swagger lengkap, contoh request/response, persiapan API client untuk Flutter.
11. Operasional: health checks, rate limit, audit log, dan rencana deploy (Docker/PM2).

## Frontend (Flutter)
1. Fondasi proyek: theme (Material 3 + Cupertino), routing, state management (Riverpod).
2. Auth flow: login/registrasi, penyimpanan token, mode Buyer/Marketing.
3. API client: Dio + interceptor auth + error handling.
4. Sitemap engine: render SVG, mapping ID ke unit, dynamic coloring, zoom/pan.
5. Realtime: socket.io client untuk update status unit.
6. Detail unit: halaman detail, simulasi cicilan, kalkulator biaya.
7. Leads & wallet: flow unlock lead, tampilan saldo, riwayat transaksi.
8. e-KYC: kamera, selfie, upload dokumen, status verifikasi.
9. Progres proyek: feed foto progres, cache gambar, notifikasi.
10. Caching/offline: hive untuk data proyek/unit dasar.
11. QA & release: testing device, analytics dasar, dan kesiapan rilis.
