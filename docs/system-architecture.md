# ⚙️ System Architecture: PintuRumah Engine

## 1. Modular Backend (NestJS)
Arsitektur dibagi menjadi modul-modul independen untuk memudahkan pengembangan solo:
- Selalu gunakan try catch jika di butuhkan
- **AuthModule**: JWT, Role-based Access (Buyer vs Marketing).
- **ProjectModule**: Manajemen data perumahan & upload string SVG Sitemap.
- **UnitModule**: Manajemen stok per nomor blok (status: Available, Booked, Sold).
- **LeadModule**: Sistem enkripsi kontak buyer & fitur "Unlock" berbayar.
- **WalletModule**: Ledger saldo marketing untuk sistem Pay-per-Lead.

## 2. Database Schema (Prisma & PostgreSQL)
- **Mapping Key**: `Unit.blockNumber` (DB) == `id` (SVG tag). Ini adalah kunci pewarnaan dinamis.
- **Atomic Transactions**: Proses "Unlock Lead" menggunakan transaksi database agar saldo tidak terpotong jika data gagal dibuka.
- **Role Control**: Field `isVerified` pada tabel User menentukan akses eksklusif marketing ke fitur update stok.

## 3. Deployment & Infrastructure
- **Containerization**: Docker & Docker Compose (PostgreSQL, Redis, NestJS).
- **Process Manager**: PM2 untuk menjaga server tetap hidup di VPS.
- **Storage**: Cloudflare R2 untuk penyimpanan foto KTP dan progres pembangunan yang ringan dan murah.

## 4. Mapping Data Structure
- **Relative Coordinates**: Koordinat disimpan dalam nilai 0.0 s/d 1.0 (persentase) terhadap lebar/tinggi gambar, bukan pixel absolut. Hal ini menjamin posisi titik tetap akurat di berbagai ukuran layar HP (Responsive).
- **Mapping Key**: `Unit.posX` & `Unit.posY`. Jika koordinat ini `null`, maka unit dianggap belum dipetakan secara visual.