const scriptURL = 'https://script.google.com/macros/s/AKfycbyZubdKN-HQmxYxJvfbKz5WJWSvJrhHcOYT7_bEGPFA94CMJtxCUCxYJIsm3yWMiuQrgQ/exec';
const form = document.getElementById('absensiForm');
const btn = document.getElementById('btnKirim');
const pesan = document.getElementById('pesan');

// Otomatis isi tanggal hari ini
document.getElementById('tanggal').valueAsDate = new Date();

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    pesan.textContent = "Mengirim data...";

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
        pesan.textContent = "Berhasil! Data tersimpan.";
        pesan.style.color = "green";
        form.reset();
        document.getElementById('tanggal').valueAsDate = new Date();
    })
    .catch(err => {
        pesan.textContent = "Gagal mengirim data.";
        pesan.style.color = "red";
    })
    .finally(() => { btn.disabled = false; });
});
