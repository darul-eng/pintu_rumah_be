## 1. Modul Interactive Digital Sitemap (Core Feature #1)

Fitur ini bukan sekadar gambar diam, melainkan **Engine Visual** yang menghubungkan data Database dengan koordinat layar.

* **Deskripsi Teknis:** * Sitemap diproses sebagai file **SVG**. Setiap elemen rumah (poligon) memiliki atribut `id` yang unik (contoh: `<path id="blok_a12" ... />`).
* **Di Backend (NestJS):** Menyimpan status unit (`available`, `booked`, `sold`) dan mencocokkannya dengan `id` di SVG tersebut.
* **Di Frontend (Flutter):** Menggunakan library `flutter_svg` untuk merender denah. Logika aplikasi akan mencari ID yang sesuai dan mengubah warna (`fill color`) secara dinamis.


* **Alur Real-time:** Saat Marketing mengubah status di aplikasi, NestJS mengirimkan sinyal melalui **Socket.io**. Tanpa *refresh*, warna kotak di HP semua Buyer yang sedang melihat perumahan tersebut akan berubah (misal: dari Hijau ke Merah).

## 2. Modul Edukasi & Kalkulator Transparansi (Core Feature #2)

Tujuannya adalah memberikan informasi jujur yang sering disembunyikan marketing konvensional.

* **Deskripsi Teknis:**
* **Kalkulator Biaya All-in:** Tidak hanya menghitung bunga efektif/flat, tapi juga biaya *BPHTB (Pajak Pembeli)*, *Biaya Notaris*, *Asuransi Jiwa/Kebakaran*, dan *Biaya Provisi*.
* **Logic Backend:** NestJS menyimpan rumus perhitungan pajak yang berlaku (misal: `(NPOP - NPOPTKP) x 5%`).
* **Data Transparansi:** Menyediakan perbandingan spesifikasi material bangunan (misal: Bata Merah vs Hebel) dan jarak tempuh nyata ke fasilitas publik menggunakan integrasi *Distance Matrix* (opsional).



## 3. Modul Verifikasi e-KYC & Whitelisting (Core Feature #3)

Fitur "Gerbang" untuk menjamin hanya marketing resmi yang bisa masuk ke sistem manajemen sitemap.

* **Deskripsi Teknis:**
* **OCR & Face Match:** Menggunakan kamera Flutter untuk mengambil foto KTP dan Selfie. Data dikirim ke NestJS.
* **Backend Validation:** NestJS memeriksa domain email (misal: harus `@developer-a.com`). Jika menggunakan email umum (Gmail), sistem mewajibkan unggah dokumen legalitas (NIB/IMB).
* **Manual Review Dashboard:** Karena Anda membangun sendiri, buatlah halaman Admin sederhana di NestJS (menggunakan *EJS* atau *AdminJS*) untuk menyetujui atau menolak pendaftaran marketing berdasarkan bukti yang mereka unggah.



## 4. Modul Pay-per-Lead & Wallet (Core Feature #4)

Mesin penghasil uang (Monetisasi) aplikasi Anda.

* **Deskripsi Teknis:**
* **Kredit Sistem:** Marketing memiliki saldo di dalam akun mereka (Tabel `wallets` di PostgreSQL).
* **Lock/Unlock Data:** Data nomor WhatsApp Buyer dienkripsi atau disembunyikan di database. Saat Marketing mengklik "Unlock", NestJS akan:
1. Memeriksa kecukupan saldo.
2. Memotong saldo (`decrement`).
3. Mencatat log transaksi.
4. Mengirimkan data kontak asli ke aplikasi Marketing.


* **Lead Scoring:** Sistem memberikan tag "Hot Lead" jika Buyer sudah menyelesaikan simulasi KPR dan profil keuangannya sesuai dengan harga unit tersebut.



## 5. Modul Update Progres Lapangan (Core Feature #5)

Fitur pendukung untuk membangun kepercayaan (*Trust*) bagi Buyer.

* **Deskripsi Teknis:**
* Marketing dapat mengunggah foto progres (misal: "Pemasangan Atap 80%") langsung dari lokasi.
* **Storage:** Foto disimpan di **Cloudflare R2** atau VPS lokal.
* **Notification:** Buyer yang telah memfavoritkan atau memesan unit tersebut akan mendapatkan *Push Notification* (via Firebase Cloud Messaging) setiap ada pembaruan progres fisik bangunan.



---

### **Hubungan Antar Modul dalam Database (Prisma Schema Teaser)**

Agar fitur-fitur di atas berjalan, Anda akan membutuhkan tabel yang saling berelasi:

* `User`: Data Buyer dan Marketing.
* `Project`: Data perumahan dan file SVG Sitemap-nya.
* `Unit`: Detail per nomor rumah (Blok, Status, Harga).
* `Lead`: Catatan siapa Buyer yang tertarik pada unit apa, dan apakah sudah "dibeli" oleh Marketing.
* `WalletTransaction`: Catatan arus uang/kredit dari sisi Marketing.