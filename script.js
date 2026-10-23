document.addEventListener("DOMContentLoaded", function () {
    // โหลดเนื้อหาโมดูลทั้งหมดเข้ามาใน index.html
    fetch('modules.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modules-container').innerHTML = data;
            initChart(); // เรียกสร้าง Chart หลังจากโหลดข้อมูลเสร็จ
        })
        .catch(err => console.error("Error loading modules:", err));

    // Realtime Clock
    setInterval(() => {
        const now = new Date();
        const clockEl = document.getElementById('clock');
        if (clockEl) {
            clockEl.innerText = now.toLocaleString('th-TH');
        }
    }, 1000);
});

// ฟังก์ชันสลับแท็บ
function switchTab(targetId, buttonElement) {
    const panes = document.querySelectorAll('.tab-pane-content');
    panes.forEach(pane => pane.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetPane = document.getElementById(targetId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

// Hourly Production Chart
function initChart() {
    const ctxHourly = document.getElementById('hourlyChart');
    if (ctxHourly) {
        new Chart(ctxHourly.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
                datasets: [
                    { label: 'แผนการผลิต (Plan)', data: [200, 200, 200, 200, 150, 150, 200, 200], backgroundColor: '#475569' },
                    { label: 'ผลิตได้จริง (Actual)', data: [180, 190, 170, 160, 120, 130, 150, 200], backgroundColor: '#ef4444' }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#f8fafc' } } },
                scales: {
                    x: { ticks: { color: '#cbd5e1' } },
                    y: { ticks: { color: '#cbd5e1' } }
                }
            }
        });
    }
}
