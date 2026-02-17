Berikut adalah rangkuman teknis dan estimasi biaya operasional bulanan untuk aplikasi **PintuRumah**:

---

## 🛠️ Stack Teknologi (Tech Stack)

| Komponen | Teknologi | Alasan |
| --- | --- | --- |
| **Mobile App** | **Flutter (Dart)** | Satu basis kode untuk iOS & Android. Sangat responsif untuk fitur *interactive sitemap*. |
| **Backend API** | **NestJS (Node.js)** | Arsitektur rapi, mendukung TypeScript, dan sangat stabil untuk fitur *real-time* lewat WebSockets. |
| **Real-time Engine** | **Socket.io** | Memastikan perubahan status unit (Sold/Ready) di sitemap langsung muncul di layar user tanpa *refresh*. |
| **Database** | **PostgreSQL + Prisma ORM** | Database relasional yang kuat untuk data properti. Prisma memudahkan pengelolaan data via kode. |
| **Sitemap Format** | **SVG (Scalable Vector Graphics)** | Denah blok yang ringan, tidak pecah saat di-*zoom*, dan setiap unit bisa dimanipulasi warnanya via ID. |
| **Authentication** | **Firebase Auth** | Menangani login, verifikasi nomor HP/WhatsApp, dan keamanan akun dengan mudah. |
| **Deployment** | **Docker + PM2** | Untuk membungkus aplikasi agar ringan dijalankan di VPS dan memastikan server tetap hidup. |

---

## 💰 Perkiraan Biaya Bulanan (Self-Hosted di VPS)

Dengan membangun sendiri dan menggunakan VPS, Anda bisa memangkas biaya hingga ke level terendah. Berikut estimasi jika aplikasi sudah berjalan (MVP):

| Kategori | Layanan | Biaya (Estimasi) |
| --- | --- | --- |
| **Server Utama** | VPS (Contabo/Hetzner) 4GB - 8GB RAM | ± Rp100.000 - Rp160.000 |
| **Storage (Foto/KTP)** | Cloudflare R2 / Supabase Storage | Rp0 (Gratis di bawah 10GB) |
| **Database Backup** | S3 / Lokal Backup | ± Rp25.000 |
| **Domain & SSL** | Namecheap / Niagahoster + Cloudflare | ± Rp15.000 (Dibagi 12 bulan) |
| **WhatsApp/SMS OTP** | Firebase / WhatsApp Link | ± Rp50.000 (Sesuai pemakaian) |
| **Email Bisnis** | Zoho Mail / ImprovMX | Rp0 (Gunakan paket gratis) |
| **TOTAL** |  | **± Rp190.000 - Rp300.000 / Bulan** |

> **Catatan:** Biaya ini belum termasuk biaya publikasi satu kali (*one-time fee*) untuk Google Play Store ($25) dan biaya tahunan Apple Developer ($99).

---

## 🏗️ Keuntungan Strategi Ini untuk Anda

1. **Irit Resource:** NestJS sangat efisien jika dikelola dengan PM2 di dalam VPS. Anda tidak perlu menyewa layanan Cloud bertingkat yang mahal.
2. **Scalable:** Jika nanti pengguna meledak, Anda tinggal melakukan *upgrade* spek VPS (Vertical Scaling) tanpa harus merombak kode.
3. **Keamanan:** Dengan e-KYC manual di awal (Marketing upload foto ID + Selfie), Anda menghemat biaya API verifikasi pihak ketiga yang biasanya mahal (Rp5rb/cek).
4. **Integritas Data:** Model bisnis *Pay-per-Lead* bisa langsung Anda tanamkan dalam logika NestJS (sistem saldo/kredit) sehingga lebih terkontrol.