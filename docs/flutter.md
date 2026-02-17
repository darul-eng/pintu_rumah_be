### **1. Konsep Utama: Adaptive & Clean Architecture**

* **Platform-Specific UI:** Kita akan menggunakan logika `if (Platform.isIOS)` atau library `flutter_platform_widgets` untuk secara otomatis mengganti widget (misal: `CircularProgressIndicator` di Android menjadi `CupertinoActivityIndicator` di iOS).
* **State Management (Riverpod):** Dipilih karena sangat kuat untuk menangani data *real-time* (status unit sitemap) dan lebih aman daripada Provider biasa.
* **Responsive Design:** Menggunakan widget `LayoutBuilder` agar tampilan denah perumahan menyesuaikan ukuran layar HP, dari yang kecil hingga yang berlayar lebar.

---

### **2. Core Fitur: Interactive Sitemap (SVG)**

* **Teknologi:** Manipulasi file **SVG** secara dinamis.
* **Konsep:**
* **Zoom & Pan:** Menggunakan widget `InteractiveViewer`.
* **Dynamic Coloring:** Memparsing XML dari SVG, mencari ID blok (misal: `id="A12"`), lalu mengubah warnanya berdasarkan status dari Backend (NestJS) sebelum ditampilkan di layar.
* **Hit-Testing:** Mendeteksi ketukan jari pada area spesifik di dalam denah untuk memunculkan detail rumah.



---

### **3. UI/UX: Cantik, Menarik, & Simpel**

* **Design System:** Menggunakan **Material 3** sebagai basis, namun dengan sentuhan **Cupertino** untuk elemen navigasi di iOS.
* **Visual Enhancements:**
* **Typography:** Plus Jakarta Sans atau Inter (bersih & modern).
* **Skeleton Loading:** Library `shimmer` untuk pengalaman memuat data yang elegan.
* **Micro-interactions:** Animasi halus menggunakan `Lottie` atau `AnimatedContainer`.
* **Efek Blur (iOS):** Implementasi `BackdropFilter` untuk memberikan efek kaca (*frosted glass*) pada bar navigasi iPhone.



---

### **4. Library Kunci (Tech Stack Flutter)**

| Kategori | Library Utama | Kegunaan Detail |
| --- | --- | --- |
| **Adaptif** | `flutter_platform_widgets` | Membungkus widget agar otomatis berubah gaya (Material/Cupertino). |
| **Sitemap** | `flutter_svg` & `xml` | Merender dan memodifikasi file denah digital secara programmatis. |
| **State** | `flutter_riverpod` | Mengelola data unit, saldo marketing, dan status login. |
| **Network** | `dio` | Menangani koneksi API ke NestJS dengan fitur Interceptor (Auth). |
| **Real-time** | `socket_io_client` | Sinkronisasi warna sitemap seketika saat ada unit yang terjual. |
| **Storage** | `hive` | Cache data perumahan di memori HP agar aplikasi tetap cepat dibuka. |
| **Auth/OTP** | `firebase_auth` | Verifikasi nomor WhatsApp/SMS dan keamanan akun. |
| **Image** | `cached_network_image` | Menampilkan foto progres pembangunan tanpa memboroskan kuota. |

---

### **5. Alur Kerja e-KYC (Marketing)**

* **Capture:** Menggunakan library `camera`.
* **Face Detection:** Menggunakan `google_ml_kit` untuk memastikan foto selfie adalah wajah asli sebelum diunggah ke server NestJS.
* **Upload:** Foto dikirim secara asinkron ke Cloudflare R2/VPS melalui API NestJS.

---

### **Ringkasan Arsitektur Akhir (Full Stack)**

* **Backend:** **NestJS** + **PostgreSQL** + **Redis** (di dalam **VPS** dengan **Docker**).
* **Frontend:** **Flutter Adaptif** (Material 3 + Cupertino).
* **Bridge:** **REST API** (untuk data umum) + **WebSockets** (untuk sitemap real-time).