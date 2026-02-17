# 🛠️ Technical Stack & Feature Specification

## 1. Digital Sitemap (SVG Logic)
- **Teknologi**: `flutter_svg` + `xml` library.
- **Mekanisme**: Flutter memparsing string SVG dari Backend -> Mencari elemen berdasarkan ID blok -> Menyuntikkan atribut `fill` warna baru sesuai status unit dari API -> Merender hasil modifikasi.
- **Upload**: Marketing dapat mem-paste string XML SVG langsung dari clipboard mobile ke backend.

## 2. Real-time Synchronization
- **Teknologi**: Socket.io (WebSockets).
- **Flow**: NestJS Emit -> Flutter Listen via Riverpod StreamProvider -> UI Update instan tanpa refresh halaman.

## 3. e-KYC & Security
- **Local Validation**: Face detection menggunakan `google_ml_kit` di sisi client.
- **Security**: Data nomor telepon buyer disensor (masked) di API sebelum di-unlock melalui sistem Wallet.