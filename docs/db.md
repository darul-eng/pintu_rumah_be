### **Prisma Database Schema**

```prisma
// Konfigurasi Database
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. MODUL USER & AUTH
enum Role {
  BUYER
  MARKETING
  ADMIN
}

model User {
  id              String    @id @default(uuid())
  email           String    @unique
  password        String
  fullName        String
  phone           String?
  role            Role      @default(BUYER)
  
  // Data Verifikasi Marketing (e-KYC)
  isVerified      Boolean   @default(false)
  idCardUrl       String?   // Foto KTP
  selfieUrl       String?   // Foto Selfie
  officeIdCardUrl String?   // Foto ID Card Kantor
  companyName     String?   
  
  // Relasi
  wallet          Wallet?
  leadsOwned      Lead[]    @relation("MarketingLeads") // Leads yang dibeli marketing
  leadsCreated    Lead[]    @relation("BuyerLeads")     // Ketertarikan yang dibuat buyer
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// 2. MODUL PROYEK & SITEMAP
model Project {
  id          String   @id @default(uuid())
  name        String
  description String
  location    String
  svgSiteplan String?  // String XML/SVG mentah untuk sitemap
  units       Unit[]
  createdAt   DateTime @default(now())
}

enum UnitStatus {
  AVAILABLE // Hijau
  BOOKED    // Kuning
  SOLD      // Merah
}

model Unit {
  id          String     @id @default(uuid())
  projectId   String
  project     Project    @relation(fields: [projectId], references: [id])
  
  blockNumber String     // Contoh: "A12" (Harus sama dengan ID di SVG)
  price       Float
  type        String     // Contoh: "Tipe 36/72"
  status      UnitStatus @default(AVAILABLE)
  
  leads       Lead[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

// 3. MODUL PAY-PER-LEAD & WALLET
model Wallet {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  balance   Float    @default(0)
  
  transactions WalletTransaction[]
}

model WalletTransaction {
  id        String   @id @default(uuid())
  walletId  String
  wallet    Wallet   @relation(fields: [walletId], references: [id])
  amount    Float
  type      String   // "TOPUP" atau "DEBIT"
  description String // Contoh: "Unlock Lead: Budi - Unit A12"
  createdAt DateTime @default(now())
}

// 4. MODUL LEADS (SISTEM KUNCI DATA)
model Lead {
  id              String   @id @default(uuid())
  
  // Siapa yang tertarik?
  buyerId         String
  buyer           User     @relation("BuyerLeads", fields: [buyerId], references: [id])
  
  // Tertarik pada unit apa?
  unitId          String
  unit            Unit     @relation(fields: [unitId], references: [id])
  
  // Siapa marketing yang sudah membeli data ini?
  marketingId     String?
  marketing       User?    @relation("MarketingLeads", fields: [marketingId], references: [id])
  
  isUnlocked      Boolean  @default(false) // Status apakah data kontak sudah dibeli marketing
  buyerScore      Int      @default(0)     // Skor kelayakan KPR (0-100)
  
  createdAt       DateTime @default(now())
}

```

---

### **Penjelasan Teknis untuk Fitur Anda:**

1. **Sitemap (SVG Mapping):** Perhatikan field `blockNumber` pada model `Unit`. Nilai ini harus sama persis dengan atribut `id` di file SVG Anda. Saat Flutter melakukan render, ia akan mencocokkan `blockNumber` dari database dengan elemen di SVG untuk menentukan warna.
2. **Sistem Unlock Leads:**
* Saat Buyer klik "Hubungi Marketing", sebuah data `Lead` dibuat dengan `isUnlocked = false`.
* Saat Marketing klik "Buka Kontak", NestJS akan:
* Mengurangi `Wallet.balance`.
* Mencatat di `WalletTransaction`.
* Mengubah `Lead.isUnlocked` jadi `true`.
* Menautkan `marketingId` ke lead tersebut.

3. **e-KYC & Whitelisting:** Field `idCardUrl` dan `selfieUrl` digunakan untuk menyimpan lokasi file foto di VPS/Cloudflare R2. Field `isVerified` adalah kontrol utama; jika `false`, NestJS akan memblokir akses marketing ke fitur *update sitemap*.
4. **Real-time Update:** Anda tidak perlu tabel khusus untuk real-time. Anda cukup menggunakan **Prisma Middleware** atau **Service Logic** di NestJS agar setiap kali ada update pada `Unit.status`, server memicu fungsi `socket.emit('update_unit')`.