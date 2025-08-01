const express = require("express");
const router = express.Router();
const db = require("../config/database"); // Import koneksi database

// --- TAMPILKAN DAFTAR PEMBELIAN ---
router.get("/pembelian", async (req, res) => {
  try {
    const [rows] = await db.execute(`
            SELECT p.id_pembelian, prod.nama_produk, p.jumlah_beli, p.total_harga, p.tanggal_beli, p.nama_pembeli, p.status_pembelian
            FROM Pembelian p
            JOIN Produk prod ON p.id_produk = prod.id_produk
            ORDER BY p.tanggal_beli DESC
        `);
    res.render("pembelian", {
      pembelian: rows,
      success: req.query.success || null,
      error: req.query.error || null,
    });
  } catch (err) {
    console.error("Error fetching pembelian:", err);
    res.render("pembelian", {
      pembelian: [],
      success: null,
      error: "Gagal mengambil data pembelian.",
    });
  }
});

// --- HALAMAN INPUT PEMBELIAN ---
router.get("/pembelian/input", async (req, res) => {
  try {
    const [products] = await db.execute(
      "SELECT id_produk, nama_produk, harga FROM Produk"
    );
    res.render("input_pembelian", { products: products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.redirect("/admin/pembelian?error=Gagal mengambil data produk.");
  }
});

// --- PROSES INPUT PEMBELIAN ---
router.post("/pembelian/input", async (req, res) => {
  const { id_produk, jumlah_beli, nama_pembeli } = req.body;

  if (!id_produk || !jumlah_beli || !nama_pembeli) {
    return res.redirect(
      "/admin/pembelian/input?error=Semua field harus diisi."
    );
  }

  try {
    const [product] = await db.execute(
      "SELECT harga FROM Produk WHERE id_produk = ?",
      [id_produk]
    );
    if (product.length === 0) {
      return res.redirect(
        "/admin/pembelian/input?error=Produk tidak ditemukan."
      );
    }

    const harga_satuan = product[0].harga;
    const total_harga = harga_satuan * parseInt(jumlah_beli);

    // Cek stok
    const [stock] = await db.execute(
      "SELECT jumlah_stok FROM StokProduk WHERE id_produk = ?",
      [id_produk]
    );
    if (stock.length === 0 || stock[0].jumlah_stok < parseInt(jumlah_beli)) {
      return res.redirect("/admin/pembelian/input?error=Stok tidak mencukupi.");
    }

    // Mulai transaksi database
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Kurangi stok
      await connection.execute(
        "UPDATE StokProduk SET jumlah_stok = jumlah_stok - ? WHERE id_produk = ?",
        [parseInt(jumlah_beli), id_produk]
      );

      // Tambah data pembelian
      await connection.execute(
        "INSERT INTO Pembelian (id_produk, jumlah_beli, total_harga, tanggal_beli, nama_pembeli, status_pembelian) VALUES (?, ?, ?, NOW(), ?, ?)",
        [id_produk, parseInt(jumlah_beli), total_harga, nama_pembeli, "Selesai"]
      );

      await connection.commit();
      res.redirect("/admin/pembelian?success=Pembelian berhasil ditambahkan!");
    } catch (transactionError) {
      await connection.rollback();
      throw transactionError; // Lemparkan error agar ditangkap oleh catch di luar
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error processing pembelian:", err);
    res.redirect(
      "/admin/pembelian/input?error=Gagal menambahkan pembelian: " + err.message
    );
  }
});

// --- PROSES PEMBATALAN PEMBELIAN ---
router.post("/pembelian/cancel/:id", async (req, res) => {
  const id_pembelian = req.params.id;

  try {
    const [pembelian] = await db.execute(
      "SELECT id_produk, jumlah_beli, status_pembelian FROM Pembelian WHERE id_pembelian = ?",
      [id_pembelian]
    );

    if (pembelian.length === 0) {
      return res.redirect("/admin/pembelian?error=Pembelian tidak ditemukan.");
    }

    if (pembelian[0].status_pembelian === "Dibatalkan") {
      return res.redirect(
        "/admin/pembelian?error=Pembelian sudah dibatalkan sebelumnya."
      );
    }

    const id_produk = pembelian[0].id_produk;
    const jumlah_beli = pembelian[0].jumlah_beli;

    // Mulai transaksi database
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Kembalikan stok
      await connection.execute(
        "UPDATE StokProduk SET jumlah_stok = jumlah_stok + ? WHERE id_produk = ?",
        [jumlah_beli, id_produk]
      );

      // Update status pembelian menjadi 'Dibatalkan'
      await connection.execute(
        "UPDATE Pembelian SET status_pembelian = ? WHERE id_pembelian = ?",
        ["Dibatalkan", id_pembelian]
      );

      await connection.commit();
      res.redirect(
        "/admin/pembelian?success=Pembelian berhasil dibatalkan dan stok dikembalikan."
      );
    } catch (transactionError) {
      await connection.rollback();
      throw transactionError;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error cancelling pembelian:", err);
    res.redirect(
      "/admin/pembelian?error=Gagal membatalkan pembelian: " + err.message
    );
  }
});

module.exports = router;
