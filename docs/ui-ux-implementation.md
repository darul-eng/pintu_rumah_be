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
- **Sitemap**: Menggunakan `InteractiveViewer` untuk pinch-to-zoom (max 5.0x).
- **Animations**: `flutter_animate` untuk transisi halus saat status unit berubah warna.
- **Feedback**: Shimmer effect sebagai skeleton loading saat fetching data dari NestJS.