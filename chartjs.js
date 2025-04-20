// Hivatkozás a táblázatra
const table = document.getElementById('dataTable');


document.addEventListener("DOMContentLoaded", () => {
    // Hivatkozás a táblázatra
    const table = document.getElementById('dataTable');

    // Generate a 5x5 table with random numbers from 1-100
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('td');
            cell.textContent = Math.floor(Math.random() * 100) + 1;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }


    
// Initialize Chart.js
const ctx = document.getElementById('lineChart').getContext('2d');
console.log(ctx);
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5'], // X-axis labels
        datasets: [{
            label: 'Selected Row Data',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});




// Add click event to table rows
table.addEventListener('click', (event) => {
    const table = document.getElementById('dataTable');
    const row = event.target.parentNode;
    if (row.tagName === 'TR') {
        const rowData = Array.from(row.children).map(cell => Number(cell.textContent));
        chart.data.datasets[0].data = rowData;
        chart.update();
    }
});

});

