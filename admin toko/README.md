Untuk Proyek "Admin Page Pembelian"


```markdown
# 🛒 Sistem Admin Toko: Input & Pembatalan Pembelian

Proyek ini adalah sistem admin sederhana berbasis web untuk mengelola data pembelian dan stok produk di sebuah toko. Admin dapat menginput pembelian baru, melihat daftar pembelian, dan membatalkan pembelian yang sudah ada.

---

## Fitur Utama

* **Manajemen Pembelian:**
    * Input data pembelian baru (memilih produk, jumlah, nama pembeli).
    * Pembatalan pembelian (mengubah status dan mengembalikan stok produk).
    * Daftar semua pembelian dengan status.
* **Manajemen Stok Produk:** Otomatis memperbarui stok saat pembelian atau pembatalan.
* **Inisialisasi Database Otomatis:** Database dan tabel akan dibuat serta diisi dengan data awal secara otomatis saat aplikasi pertama kali dijalankan (untuk lingkungan pengembangan).
* **Antarmuka Pengguna Sederhana:** UI berbasis web yang intuitif untuk admin.

---

## Teknologi yang Digunakan

* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [EJS](https://ejs.co/) (Embedded JavaScript, sebagai *template engine*)
    * [`mysql2`](https://www.npmjs.com/package/mysql2) (driver untuk MySQL/MariaDB)
* **Database:**
    * [MySQL](https://www.mysql.com/) / [MariaDB](https://mariadb.org/) (database relasional)
* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (untuk interaksi dasar)

---

## Persyaratan Sistem

* [Node.js](https://nodejs.org/en/download/) (v14 atau lebih tinggi disarankan)
* **MySQL Server** atau **MariaDB Server** yang terinstal dan berjalan.
    * (Disarankan menggunakan [XAMPP](https://www.apachefriends.org/index.html) / [Laragon](https://laragon.org/) / [WAMP](https://www.wampserver.com/)).

---

## Instalasi dan Setup

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal Anda.

### 1. Klon Repositori

```bash
git clone https://github.com/historia11/Xionco-Test.git)
xionco test/cd admin-toko
- Instal Dependensi
   npm install
- Konfigurasi Database
- Jalankan Aplikasi
   node app.js
