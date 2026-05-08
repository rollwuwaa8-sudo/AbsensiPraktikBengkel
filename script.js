const scriptURL = 'https://script.google.com/macros/s/AKfycbzVqrq0F-DMaqbrGKVz1V2Gx7tCr0KtIFm4N7NHiXAz_YE2dxrPbCI2S1ujL2Rv4J5X1A/exec';
const form = document.getElementById('absensiForm');
const btn = document.getElementById('btnKirim');
const pesan = document.getElementById('pesan');
const isiTabel = document.getElementById('isiTabel');
const rekapanContainer = document.getElementById('rekapanContainer');

// Set tanggal hari ini secara otomatis[cite: 1, 2]
document.getElementById('tanggal').valueAsDate = new Date();

// Fungsi mengambil data terbaru dari Google Sheets
function muatRekapan() {
    fetch(scriptURL)
        .then(res => res.json())
        .then(data => {
            isiTabel.innerHTML = ""; 
            data.forEach(row => {
                const tr = document.createElement('tr');
                // row[0] adalah Nama, row[2] adalah Status[cite: 1, 2]
                tr.innerHTML = `<td>${row[0]}</td><td>${row[2]}</td>`;
                isiTabel.appendChild(tr);
            });
            rekapanContainer.style.display = "block";
        })
        .catch(err => console.error("Gagal memuat data", err));
}

// Muat data saat halaman dibuka
muatRekapan();

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    pesan.textContent = "Sedang mengirim...";
    pesan.style.color = "black";

    const payload = {
        nama: document.getElementById('nama').value,
        tanggal: document.getElementById('tanggal').value,
        status: document.getElementById('status').value
    };

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(res => {
        pesan.textContent = "Presensi Berhasil Dikirim!";
        pesan.style.color = "green";
        form.reset();
        document.getElementById('tanggal').valueAsDate = new Date();
        muatRekapan(); // Perbarui tabel setelah absen[cite: 1, 2]
    })
    .catch(err => {
        pesan.textContent = "Gagal. Pastikan URL Script benar.";
        pesan.style.color = "red";
    })
    .finally(() => { btn.disabled = false; });
});
