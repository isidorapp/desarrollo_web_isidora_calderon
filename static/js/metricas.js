const COLORES = ['#dc628d', '#560e2d', '#d4b8c8', '#a0446b', '#f0a0c0', '#8b1a4a'];

document.addEventListener('DOMContentLoaded', () => {
    cargarMiembrosPorDia();
    cargarActividadesPorTipo();
    cargarActividadesPorComuna();
});

function cargarMiembrosPorDia() {
    fetch('/api/estadisticas/miembros-por-dia')
        .then(function(response) {
            if (!response.ok) { throw new Error('Error de red'); }
            return response.json();
        })
        .then(function(data) {
            var labels = data.map(function(d) { return d.dia; });
            var valores = data.map(function(d) { return d.cantidad; });

            var ctx = document.getElementById('graficoMiembrosPorDia').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Miembros registrados',
                        data: valores,
                        borderColor: '#560e2d',
                        backgroundColor: 'rgba(220, 98, 141, 0.2)',
                        pointBackgroundColor: '#dc628d',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: { display: true, text: 'Día' }
                        },
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Cantidad de miembros' },
                            ticks: { stepSize: 1 }
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        })
        .catch(function() {
            document.getElementById('errorMiembrosDia').style.display = 'block';
        });
}


function cargarActividadesPorTipo() {
    fetch('/api/estadisticas/actividades-por-tipo')
        .then(function(response) {
            if (!response.ok) { throw new Error('Error de red'); }
            return response.json();
        })
        .then(function(data) {
            var labels = data.map(function(d) {
                return d.tipo.charAt(0).toUpperCase() + d.tipo.slice(1);
            });
            var valores = data.map(function(d) { return d.cantidad; });

            var ctx = document.getElementById('graficoActividadesPorTipo').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: valores,
                        backgroundColor: COLORES.slice(0, labels.length)
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        })
        .catch(function() {
            document.getElementById('errorActTipo').style.display = 'block';
        });
}


function cargarActividadesPorComuna() {
    fetch('/api/estadisticas/actividades-por-comuna')
        .then(function(response) {
            if (!response.ok) { throw new Error('Error de red'); }
            return response.json();
        })
        .then(function(data) {
            var labels = data.map(function(d) { return d.comuna; });
            var valores = data.map(function(d) { return d.cantidad; });

            var ctx = document.getElementById('graficoActividadesPorComuna').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total de actividades',
                        data: valores,
                        backgroundColor: '#dc628d',
                        borderColor: '#560e2d',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: { display: true, text: 'Comuna' }
                        },
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Total de actividades' },
                            ticks: { stepSize: 1 }
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        })
        .catch(function() {
            document.getElementById('errorActComuna').style.display = 'block';
        });
}