# 🛠️ Technical Stack & Feature Specification

## 1. Coordinate-Based Sitemap (Overlay Engine)
- **Teknologi**: Flutter `Stack`, `InteractiveViewer`, dan `Positioned`; Backend menyajikan gambar denah (JPG/PNG) sebagai file/URL tanpa manipulasi SVG.
- **Mekanisme**: Denah dikirim sebagai gambar statis dari backend. Flutter menumpuk (overlay) widget marker di atasnya berdasarkan koordinat persentase (`posX`, `posY`) yang diambil dari database.
- **Upload**: Marketing/Admin mengupload file gambar denah melalui endpoint Project; Backend hanya menyimpan referensi file tanpa parsing XML.

## 2. Real-time Synchronization
- **Teknologi**: Socket.io (WebSockets).
- **Flow**: NestJS Emit -> Flutter Listen via Riverpod StreamProvider -> UI Update instan tanpa refresh halaman.

## 3. e-KYC & Security
- **Local Validation**: Face detection menggunakan `google_ml_kit` di sisi client.
- **Security**: Data nomor telepon buyer disensor (masked) di API sebelum di-unlock melalui sistem Wallet.

## 4. On-Demand & Bulk Mapping Logic (Coordinate-Based)
- **Mechanism**: Menggantikan SVG parsing dengan **Coordinate Pinning**. Sistem menyimpan koordinat (X, Y) relatif terhadap ukuran gambar.
- **On-Transaction Pinning**: Saat Marketing/Admin merubah status unit menjadi `SOLD` atau `BOOKED` dan unit belum memiliki koordinat, aplikasi mengarahkan user ke layar pemetaan untuk menetapkan `posX`/`posY` terlebih dahulu.
- **Bulk Setup Mode**: Admin/Marketing baru dapat masuk ke "Setup Mode" untuk menandai banyak unit sekaligus dalam satu sesi (Tap gambar -> Pilih No. Blok -> Simpan -> Ulangi).
- **Storage**: Koordinat disimpan dalam tabel `Unit` sebagai `posX (Float)` dan `posY (Float)`.