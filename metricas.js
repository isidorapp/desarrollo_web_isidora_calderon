// datos inventados

document.addEventListener("DOMContentLoaded", () => {

    // gráfico tipos de miembros
    const ctxMiembros = document
        .getElementById("graficoMiembros")
        .getContext("2d");
    
        
    new Chart(ctxMiembros, {
        type: "pie",
        data: {
            labels: ["Estudiantes", "Funcionarios", "Académicos"],
            datasets: [{
                data: [120, 45, 30],
                backgroundColor: ["#dc628d", "#560e2d", "#d4b8c8"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });


    // gráfico actividades
    const ctxAct = document
        .getElementById("graficoActividades")
        .getContext("2d");

    new Chart(ctxAct, {
        type: "bar",
        data: {
            labels: ["Deportivas", "Artísticas", "Tecnológicas", "Sociales", "Recreativas"],
            datasets: [{
                label: "Cantidad de Actividades",
                data: [85, 40, 60, 25, 50],
                backgroundColor: "#dc628d"
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

});