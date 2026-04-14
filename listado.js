document.addEventListener("DOMContentLoaded", () => {
    // datos iniciales por defecto
    const miembrosIniciales = [
        { nombre: "Amaro Guajardo", correo: "aguajardo@dimec.cl", tipo: "estudiante" },
        { nombre: "Diego Orellana", correo: "dorellana@dcc.cl", tipo: "academico" },
        { nombre: "Gabriel Tapia", correo: "gtapia@dcc.cl", tipo: "funcionario" },
        { nombre: "Ignacio Balbontín", correo: "ibalbontin@dcc.cl", tipo: "estudiante" },
        { nombre: "Joel Riquelme", correo: "jriquelme@dcc.cl", tipo: "academico" },
        { nombre: "Luis Muñoz", correo: "lmuñoz@dfi.cl", tipo: "funcionario" },
        { nombre: "Matías Bravo", correo: "mbravo@dii.cl", tipo: "academico" }
    ];

    // leer miembros registrados desde el formulario
    const miembrosGuardados = JSON.parse(localStorage.getItem('miembrosDCC')) || [];

    // combinar arreglos
    const miembrosDB = [...miembrosIniciales, ...miembrosGuardados];

    // variables de estado para filtros
    let miembrosFiltrados = [...miembrosDB];
    let paginaActual = 1;
    const filasPorPagina = 5; 


    // obtener elementos del dom
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    const filtroTipo = document.getElementById("filtroTipo");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const indicadorPagina = document.getElementById("indicadorPagina");

    // función para tabla
    const renderTabla = () => {
        cuerpoTabla.innerHTML = "";

        // índices de página
        const inicio = (paginaActual - 1) * filasPorPagina;
        const fin = inicio + filasPorPagina;
        const miembrosPagina = miembrosFiltrados.slice(inicio, fin);

        // crear filas
        miembrosPagina.forEach(miembro => {
            const fila = document.createElement("tr");
            
            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = miembro.nombre;
            
            const celdaCorreo = document.createElement("td");
            celdaCorreo.textContent = miembro.correo;
            
            const celdaTipo = document.createElement("td");
            // capitalizar primera letra del tipo
            celdaTipo.textContent = miembro.tipo.charAt(0).toUpperCase() + miembro.tipo.slice(1);

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCorreo);
            fila.appendChild(celdaTipo);
            cuerpoTabla.appendChild(fila);
        });

        actualizarControles();
    };

    // número de página
    const actualizarControles = () => {
        indicadorPagina.textContent = `Página ${paginaActual}`;
        
        // deshabilitar "Anterior" si estamos en la pag 1
        btnAnterior.disabled = paginaActual === 1;

        //deshabilitar "Siguiente" si no hay más elementos para otra página
        const totalPaginas = Math.ceil(miembrosFiltrados.length / filasPorPagina);
        btnSiguiente.disabled = paginaActual >= totalPaginas || totalPaginas === 0;
    };

    // obtener select
    const ordenarPor = document.getElementById("ordenarPor");

    // filtrar y ordenar
    const aplicarFiltrosYOrden = () => {
        const valorFiltro = filtroTipo.value;
        const valorOrden = ordenarPor.value;

        // filtrar
        if (valorFiltro === "todos") {
            miembrosFiltrados = [...miembrosDB];
        } else {
            miembrosFiltrados = miembrosDB.filter(miembro => miembro.tipo === valorFiltro);
        }

        // ordenar
        miembrosFiltrados.sort((a, b) => {
            if (valorOrden === "nombre_asc") {
                return a.nombre.localeCompare(b.nombre);
            } else if (valorOrden === "nombre_desc") {
                return b.nombre.localeCompare(a.nombre);
            } else if (valorOrden === "correo_asc") {
                return a.correo.localeCompare(b.correo);
            }
        });

        // reseteo paginación y mostrar tabla
        paginaActual = 1; 
        renderTabla();
    };

    // escuchar cambios en ambos menús desplegables
    filtroTipo.addEventListener("change", aplicarFiltrosYOrden);
    ordenarPor.addEventListener("change", aplicarFiltrosYOrden);

    // eventos de paginación
    btnAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderTabla();
        }
    });

    btnSiguiente.addEventListener("click", () => {
        const totalPaginas = Math.ceil(miembrosFiltrados.length / filasPorPagina);
        if (paginaActual < totalPaginas) {
            paginaActual++;
            renderTabla();
        }
    });

    // inicia ordenado
    aplicarFiltrosYOrden();

});