## 1. Konsep Pemrograman Utama

### **A. Arsitektur Modular**

Bagi aplikasi Anda ke dalam modul-modul independen. Ini memudahkan Anda untuk fokus pada satu fitur tanpa merusak fitur lain.

* **Contoh Modul:** `AuthModule`, `UserModule`, `PropertyModule` (Katalog), `SitemapModule` (Real-time update), dan `LeadModule` (Sistem pembayaran/saldo).

### **B. Data Transfer Objects (DTO) & Validation**

Jangan pernah percaya pada data yang dikirim oleh user (terutama Marketing).

* **Konsep:** Gunakan DTO untuk mendefinisikan bentuk data yang masuk.
* **Library:** `class-validator` dan `class-transformer`.
* **Manfaat:** Jika marketing mengirim harga rumah dengan format teks padahal harusnya angka, API akan otomatis menolak sebelum diproses ke database.
* **Catatan Implementasi:** Untuk beberapa filter query seperti `projectId` di endpoint `GET /units`, kita menggunakan tipe `string` biasa (bukan format UUID wajib) agar bisa mendukung ID kustom atau slug proyek seperti `proj-puri-harmoni-002`, selama nilainya valid di database.

### **C. Guards & Custom Decorators (Security)**

Karena Anda memiliki dua peran (Buyer & Marketing), gunakan **Guards** untuk membatasi akses.

* **Konsep:** Buat `@Roles('MARKETING')` atau `@Roles('BUYER')`.
* **Manfaat:** Menjamin Buyer tidak bisa mengakses API untuk mengubah status unit di sitemap.

### **D. Interceptors untuk Caching**

Gunakan Interceptor untuk otomatis membungkus request yang sering diakses (seperti daftar perumahan).

* **Konsep:** Jika data ada di Redis, Interceptor akan langsung mengembalikan data tersebut tanpa memanggil fungsi di Controller.

---

## 2. Library Kunci yang Wajib Digunakan

| Kategori | Library | Kegunaan |
| --- | --- | --- |
| **ORM (Database)** | `@prisma/client` & `prisma` | Query database dengan *type-safety*. Sangat membantu menghindari error penulisan nama kolom. |
| **Real-time** | `@nestjs/websockets` & `socket.io` | Menangani update warna sitemap secara instan ke aplikasi Flutter. |
| **Security** | `@nestjs/passport` & `passport-jwt` | Menangani sistem login dan penguncian API menggunakan token. |
| **Caching** | `cache-manager` & `cache-manager-redis-yet` | Menghubungkan NestJS dengan Redis secara mulus. |
| **File Upload** | `multer` | Mengelola upload foto KTP, ID Card, dan foto progres rumah. |
| **Validation** | `class-validator` | Validasi input data (e.g., memastikan email valid, nomor HP sesuai format). |
| **Documentation** | `@nestjs/swagger` | Otomatis membuat dokumentasi API (seperti Swagger UI). Sangat berguna saat Anda coding Flutter agar tahu endpoint mana yang harus dipanggil. |

---

## 4. Tips Tambahan untuk Solo Developer

1. **Gunakan Environment Variables (`@nestjs/config`):** Jangan pernah menulis password database atau kunci rahasia API langsung di kode. Simpan di file `.env`.
2. **Logging:** Gunakan logger bawaan NestJS atau library `winston` agar jika aplikasi error di VPS, Anda bisa melacak penyebabnya dengan mudah melalui log file.
3. **Auto-Generated API Client:** Karena Anda pakai NestJS (TypeScript) dan Flutter (Dart), Anda bisa menggunakan *Swagger Codegen* untuk membuat fungsi-fungsi API di Flutter secara otomatis. Ini menghemat waktu pengerjaan hingga puluhan jam.

---

## 5. Modul Auth & User (MVP)

### Endpoint
- `POST /auth/register` (email, password, fullName, phone)
- `POST /auth/login` (email, password)
- `GET /auth/me` (Bearer token)
- `GET /users/me` (Bearer token)
- `PATCH /users/me` (Bearer token, fullName/phone)

### Environment
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`