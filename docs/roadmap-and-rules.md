# 🚀 Detailed Roadmap & AI Rules

## Project Context
Anda sedang membantu mengembangkan aplikasi "PintuRumah", sebuah platform properti satu-pintu.
* **Backend**: NestJS, PostgreSQL (Prisma), Redis, Socket.io.
* **Frontend**: Flutter (Riverpod, Adaptive Widgets, Glassmorphism UI).

## 🗣️ Rules Diskusi & Konsistensi
1. **Single Source of Truth (SSOT)**: AI dilarang memberikan saran yang bertentangan dengan file di folder `/docs`. Jika AI merasa ada teknologi yang lebih baik, AI harus mengajukan "Usulan Perubahan" dan menunggu persetujuan User sebelum mengubah instruksi selanjutnya. Jika disetujui tambahkan perubahan tersebut ke `/docs`
2. **Context Preservation**: Setiap kali sesi diskusi akan berakhir atau mencapai batas konteks, AI wajib membuat "Snapshot Konteks" yang berisi:
   - Fitur terakhir yang selesai dikerjakan.
   - Masalah teknis yang sedang dihadapi.
   - Langkah spesifik berikutnya agar bisa dilanjutkan oleh model AI lain tanpa kehilangan arah.
3. **Incremental Progress**: Jangan merombak kode yang sudah berjalan kecuali diminta. Fokus pada penambahan fitur sesuai fase roadmap.
4. **Code-Style Consistency**: 
   - Backend: Gunakan Class-validator dan Swagger di setiap DTO.
   - Frontend: Gunakan Riverpod Providers dan Flutter Platform Widgets (Adaptive).
5. **No Hallucination on Sitemap**: Karena fitur Sitemap adalah core, AI harus selalu merujuk pada logika: koordinat relatif `posX` dan `posY` (0.0–1.0) pada gambar denah == posisi visual unit di UI.

## Phase 1: Foundation (Auth & Profile)
- Setup NestJS & Prisma.
- Implementasi JWT & Role (Buyer/Marketing).
- Setup Flutter Adaptive Theme & Riverpod.

## Phase 2: Siteplan Engine (The Core)
- **BE**: Endpoint CRUD Project untuk upload gambar denah (JPG/PNG) sebagai dasar overlay koordinat.
- **BE**: Endpoint `GET /units/sitemap/:projectId` untuk mengirim data unit (status, warna, `posX`, `posY`) ke frontend.
- **BE**: Endpoint `PATCH /units/:id/position` dan `PATCH /units/:id/position/clear` untuk menyimpan/menghapus koordinat unit (0.0–1.0).
- **FE**: Implementasi image mapper (layar Pemetaan Unit) untuk menangkap koordinat relatif dari gesture double tap pada denah.
- **FE**: UI Zoomable Siteplan (Denah Interaktif) dengan `InteractiveViewer` + overlay dots yang dapat diketuk untuk membuka detail unit.

## Phase 3: Real-time & Interaction
- **BE**: Setup Socket.io Gateway.
- **FE**: Integrasi `socket_io_client`.
- **FE**: Trigger update warna blok saat ada event broadcast.

## Phase 4: Monetization (Wallet & Leads)
- **BE**: Logic Pay-per-Lead & Wallet Transaction.
- **FE**: UI Top-up & Unlock Contact Buyer.

## 🤖 Rules for Copilot / AI
- Selalu prioritaskan **Type Safety** (DTO di NestJS, Class Model di Flutter).
- Gunakan **Clean Architecture** (Service separate from Controller).
- Pastikan setiap endpoint backend memiliki dokumentasi Swagger (@nestjs/swagger).
- Setiap ada perubahan pada SVG Engine, pastikan tidak merusak fungsi Zoom/Pan di Flutter.
- Jika ada perubahan skema database, ingatkan pengguna untuk melakukan `npx prisma migrate`.
- **Sitemap Method**: Gunakan "Coordinate Overlay" di atas gambar JPG/PNG. Hapus referensi manipulasi XML SVG.
- **Mandatory Pinning**: Logika di Flutter harus memastikan jika `unit.posX` adalah null saat transaksi, paksa user ke layar pemetaan.
- **Responsive Logic**: Pastikan widget `Stack` menggunakan `FractionalTranslation` atau hitungan persentase agar titik tidak bergeser saat layar HP di-rotate atau berbeda ukuran.