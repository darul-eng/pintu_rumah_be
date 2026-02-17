# 🚀 Detailed Roadmap & AI Rules

## Gunakan file di folder /docs sebagai referensi utama. Boleh memberikan saran teknologi atau desain di luar yang sudah tertulis di sana tapi meminta persetujuan perubahan kepada saya. Jika saran di setujui tambahkan hal tersebut ke dalam docs (sesuaikan). Jika context akan habis buatlah rangkuman yang telah dan yang akan dilakukan secara detail sehingga bisa di alihkan ke model yang lain.

## Phase 1: Foundation (Auth & Profile)
- Setup NestJS & Prisma.
- Implementasi JWT & Role (Buyer/Marketing).
- Setup Flutter Adaptive Theme & Riverpod.

## Phase 2: Siteplan Engine (The Core)
- **BE**: Endpoint `PATCH /projects/:id/svg` untuk simpan raw SVG.
- **BE**: Logic auto-generate `Unit` berdasarkan ID yang ditemukan di XML SVG.
- **FE**: Implementasi `xml` parser dan `flutter_svg` dynamic rendering.
- **FE**: UI Zoomable Siteplan dengan `InteractiveViewer`.

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
- Setiap ada perubahan pada SVG Engine, pastikan tidak merusak fungsi Zoom/Pan di Flutter.