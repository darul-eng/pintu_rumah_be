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

## 4. On-Demand & Bulk Mapping Logic (Coordinate-Based)
- **Mechanism**: Menggantikan SVG parsing dengan **Coordinate Pinning**. Sistem menyimpan koordinat (X, Y) relatif terhadap ukuran gambar.
- **On-Transaction Pinning**: Saat marketing merubah status unit menjadi 'SOLD' atau 'BOOKED', jika unit tersebut belum memiliki koordinat, aplikasi akan mewajibkan marketing untuk mengetuk posisi unit tersebut pada gambar siteplan sebagai langkah terakhir.
- **Bulk Setup Mode**: Admin/Marketing baru dapat masuk ke "Setup Mode" untuk menandai banyak unit sekaligus dalam satu sesi (Tap gambar -> Pilih No. Blok -> Simpan -> Ulangi).
- **Storage**: Koordinat disimpan dalam tabel `Unit` sebagai `posX (Float)` dan `posY (Float)`.