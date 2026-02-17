# 🏠 **Rangkuman Proyek: Aplikasi "PintuRumah"**

**Konsep Utama:** Platform properti satu-pintu (*Single-App*) yang mengedepankan transparansi bagi pembeli dan efisiensi operasional bagi developer melalui fitur *real-time sitemap*.

---

## **1. Arsitektur Pengguna (Single App, Dual Role)**

Aplikasi ini menggunakan sistem satu aplikasi yang dapat diunduh oleh siapa saja, namun menyediakan dua pengalaman berbeda:

* **Mode Buyer (Pembeli):** Fokus pada edukasi, transparansi harga, dan pencarian unit secara visual.
* **Mode Marketing (Developer):** Fokus pada pengelolaan stok unit di lapangan dan manajemen calon pembeli (*leads*).

---

## **2. Fitur Unggulan (Core Features)**

### **A. Digital Interactive Sitemap**

Ini adalah fitur visual utama yang mendigitalkan denah blok perumahan:

* **Status Unit Real-Time:** Unit dibedakan berdasarkan warna:
* 🟢 **Hijau:** Tersedia (*Available*).
* 🟡 **Kuning:** Sedang proses pengajuan KPR/Booking.
* 🔴 **Merah:** Sudah terjual/Serah terima.


* **Interaksi Langsung:** Klik pada kotak unit di peta untuk melihat spesifikasi detail, arah hadap rumah, foto progres pembangunan, dan simulasi cicilan khusus unit tersebut.

### **B. Modul Edukasi & Anti-Zonk**

Menghilangkan asimetri informasi antara marketing dan pembeli:

* **Kamus & Panduan KPR:** Penjelasan transparan mengenai KPR Subsidi vs Non-Subsidi.
* **Kalkulator Biaya Real:** Menghitung total dana yang dibutuhkan (termasuk pajak, notaris, asuransi), bukan hanya cicilan bulanan.
* **Checklist Survei:** Panduan bagi buyer saat meninjau lokasi agar tidak terjebak janji manis.

### **C. Gateway Verifikasi Marketing**

Untuk menjaga kredibilitas, fitur "Marketing" hanya terbuka jika user lolos verifikasi:

* **E-KYC:** Scan KTP dan *Liveness Detection* (verifikasi wajah).
* **Validasi Instansi:** Unggah ID Card kantor dan verifikasi domain email resmi (untuk developer besar) atau unggah dokumen legalitas proyek/NIB (untuk developer kecil).

---

## **3. Model Bisnis (Strategi Monetisasi)**

Aplikasi tidak mengambil komisi dari harga rumah (menghindari kebocoran transaksi ke WhatsApp), melainkan menggunakan model **Pay-per-Lead (PPL)** dan **SaaS**:

1. **Sistem Unlock Leads (Kredit):**
* Data kontak Buyer (nomor WhatsApp) disensor di dashboard marketing.
* Marketing harus membeli "Kredit" (Top-up saldo) untuk membuka kunci data tersebut.
* Biaya terpotong per-klik saat marketing ingin menghubungi buyer.


2. **Tiering Leads:** Harga membuka data buyer berbeda berdasarkan kualitas profilnya (misal: Buyer yang sudah lolos simulasi keuangan memiliki harga lebih tinggi).
3. **Bank Referral:** Komisi dari perbankan setiap kali buyer mengajukan KPR melalui tombol resmi di aplikasi.
4. **SaaS Subscription:** Biaya langganan bagi developer untuk menggunakan sistem manajemen sitemap digital.

---

## **4. Teknis Alur Kerja (User Journey)**

1. **Pendaftaran:**
* **Buyer:** Daftar dengan email/No HP biasa.
* **Marketing:** Daftar + Verifikasi Wajah + Verifikasi ID Card/Dokumen Legalitas.


2. **Interaksi:**
* Buyer melihat sitemap  Melakukan simulasi cicilan  Klik "Hubungi Marketing".


3. **Konversi:**
* Marketing mendapatkan notifikasi "Hot Lead"  Menggunakan saldo untuk *Unlock* nomor WA  Lanjut berkomunikasi via WhatsApp.


4. **Update Stok:**
* Begitu ada transaksi, Marketing langsung mengetuk unit di sitemap aplikasi untuk merubah status menjadi "Booked" atau "Sold" agar dilihat oleh seluruh pengguna lain secara *real-time*.



---

## **5. Strategi Data (Whitelist Developer)**

* **Database Awal:** Mengambil data dari portal pemerintah (Sikumbang/SiPetruk).
* **Partnership:** Bekerja sama dengan asosiasi (REI/HIMPERRA).
* **Crowdsourcing:** Validasi manual pada pendaftar pertama dari sebuah perumahan baru untuk dijadikan standar verifikasi bagi marketing selanjutnya di proyek yang sama.

---

## **6. Nilai Jual Unik (USP)**

* **Bagi Buyer:** "Beli rumah tanpa takut tertipu; data unit pasti akurat."
* **Bagi Developer:** "Hemat biaya marketing; hanya melayani calon pembeli yang benar-benar mampu secara finansial."