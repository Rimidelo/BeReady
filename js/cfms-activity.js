fetch('data/cfmsActivity.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('activityChart').getContext('2d');
        const config = {
            type: 'line',
            data: data.chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        onClick: null,
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            boxWidth: 0
                        }
                    },
                    datalabels: {
                        color: 'green',
                        anchor: 'end',
                        align: 'top',
                        formatter: function (value, context) {
                            return value;
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        };
        const activityChart = new Chart(ctx, config);

        // Populate the table header
        const tableHeader = document.querySelector('#activityTable thead tr');
        tableHeader.innerHTML = `
            <th>תאריך</th>
            <th>תוצאה - ${data.resultType}</th>
            <th></th>
        `;

        // Populate the table body
        const tableBody = document.querySelector('#activityTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows
        data.tableData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.date}</td>
                <td data-type="result">${row.result}</td>
                <td>
                    <button class="btn btn-secondary view-btn btn-icon"></button>
                    <button class="btn btn-warning edit-btn btn-icon"></button>
                    <button class="btn btn-danger delete-btn btn-icon"></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error loading data:', error));
