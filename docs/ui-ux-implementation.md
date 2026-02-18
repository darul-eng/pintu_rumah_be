# 🎨 UI/UX Implementation: Adaptive Glassmorphism

## 1. Design System
- **Konsep**: "PintuRumah Teal" (Modern & Professional).
- **Visual Style**: Glassmorphism (Frosted Glass) menggunakan `BackdropFilter`.
- **Corner Radius**: 24px untuk kartu utama, 14px untuk input fields.
- **Typography**: Plus Jakarta Sans (Modern Sans-Serif).

## 2. Adaptive Strategy
- **Library**: `flutter_platform_widgets`.
- **iOS**: Navigasi minimalis, efek blur pada AppBar, gesture back-swipe.
- **Android**: Material 3 dengan warna aksen dinamis dan sistem drawer/bottom nav.

## 3. Interactive Engine
- **Sitemap**: Menggunakan `InteractiveViewer` untuk pinch-to-zoom (max 5.0x) pada gambar denah JPG/PNG dengan overlay marker status unit.
- **Animations**: `flutter_animate` untuk transisi halus saat status unit berubah warna.
- **Feedback Loading**: Shimmer effect sebagai skeleton loading saat fetching data dari NestJS.

## 4. User Interaction: The Pinning Flow
- **Mandatory Mapping Trigger**: Setelah Marketing/Admin menekan aksi perubahan status (misalnya "Booking Sekarang" atau "Tandai Terjual (SPK3)") dan unit belum memiliki koordinat, aplikasi mengarahkan ke layar pemetaan untuk menetapkan posisi unit.
- **Mapping Gesture**: Posisi dipilih dengan gesture **double tap** pada gambar denah, kemudian dikonfirmasi melalui bottom sheet sebelum disimpan ke database.
- **Edit & Hapus Marker**: Marker yang sudah ada dapat diperbarui melalui tombol pengaturan marker dan dihapus dengan long press pada marker yang di-highlight, diikuti konfirmasi.
- **Visual Marker**: Titik (Dot) yang muncul di atas gambar menggunakan warna dinamis:
  - Kosong/Hijau: Available
  - Kuning: Booked
  - Merah: Sold
- **Interactive Map (Buyer)**: User (Buyer) dapat mengetuk dot tersebut untuk melihat detail unit. Jika unit belum ditandai oleh marketing (koordinat `null`), maka unit tersebut belum muncul sebagai titik interaktif di denah Buyer.
- **Feedback Notifikasi**: Aksi pemetaan dan perubahan status di frontend menggunakan toast di bagian atas layar untuk memberikan feedback yang cepat dan tidak mengganggu konten utama.