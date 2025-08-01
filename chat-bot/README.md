# 🤖 Simple AI Chatbot

Proyek ini adalah implementasi *chatbot* sederhana yang terintegrasi dengan Google Gemini API, memungkinkan percakapan interaktif melalui antarmuka web.

---

## Fitur Utama

* **Antarmuka Chat Interaktif:** UI web yang bersih untuk mengirim dan menerima pesan.
* **Integrasi Google Gemini API:** Menggunakan model AI Gemini untuk menghasilkan respons yang cerdas dan relevan.
* **Backend Node.js/Express.js:** Menangani komunikasi antara *frontend* dan Gemini API.
* **Manajemen API Key Aman:** Menggunakan variabel lingkungan (`.env`) untuk menyimpan API Key.

---

## Teknologi yang Digunakan

* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [`dotenv`](https://www.npmjs.com/package/dotenv) (untuk variabel lingkungan)
    * [`@google/generative-ai`](https://www.npmjs.com/package/@google/generative-ai) (untuk integrasi Gemini API)
* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (ES6+) dengan Fetch API

---

## Persyaratan Sistem

* [Node.js](https://nodejs.org/en/download/) (v14 atau lebih tinggi disarankan)
* Akses internet (untuk terhubung ke Google Gemini API)

---

## Instalasi dan Setup

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal Anda.

### 1. Klon Repositori

```bash
git clone <URL_REPOSITORI_ANDA>
cd simple-chatbot # Atau nama folder proyek Anda
