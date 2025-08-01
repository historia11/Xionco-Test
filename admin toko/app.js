const express = require('express');
const app = express();
const port = 3000;
const adminRoutes = require('./routes/admin'); 


app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files (CSS, JS)
app.use(express.static('public'));

// Gunakan router admin untuk semua rute yang diawali dengan /admin
app.use('/admin', adminRoutes);

// Rute utama (redirect ke halaman admin pembelian)
app.get('/', (req, res) => {
    res.redirect('/admin/pembelian');
});

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});