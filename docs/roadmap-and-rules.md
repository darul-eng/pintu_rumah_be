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
5. **No Hallucination on Sitemap**: Karena fitur Sitemap adalah core, AI harus selalu merujuk pada logika: `ID di SVG == Unit.blockNumber di Database`.

## Phase 1: Foundation (Auth & Profile)
- Setup NestJS & Prisma.
- Implementasi JWT & Role (Buyer/Marketing).
- Setup Flutter Adaptive Theme & Riverpod.

## Phase 2: Siteplan Engine (The Core)
- **BE**: Endpoint `PATCH /projects/:id/svg` untuk simpan raw SVG.
- **BE**: Logic auto-generate `Unit` berdasarkan ID yang ditemukan di XML SVG.
- **FE**: Implementasi `xml` parser dan `flutter_svg` dynamic rendering.
- **FE**: UI Zoomable Siteplan dengan `InteractiveViewer`.
- **FE/BE**: Implementasi fitur upload file SVG dan logic auto-create Unit berdasarkan ID yang ditemukan di dalam file.

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