document.addEventListener("DOMContentLoaded", () => {
    let miembrosDB = [];
    let miembrosFiltrados = [];
    let paginaActual = 1;
    const filasPorPagina = 5; 

    // Elementos DOM
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    const filtroTipo = document.getElementById("filtroTipo");
    const ordenarPor = document.getElementById("ordenarPor");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const indicadorPagina = document.getElementById("indicadorPagina");

    // Elementos Detalles
    const panelDetalle = document.getElementById("detalleMiembro");
    const detNombre = document.getElementById("detNombre");
    const detCorreo = document.getElementById("detCorreo");
    const detRegion = document.getElementById("detRegion");
    const detComuna = document.getElementById("detComuna");
    const detFecha = document.getElementById("detFecha"); 
    const listaActividades = document.getElementById("listaActividades");

    // Fetch de datos
    fetch('/api/miembros')
        .then(response => response.json())
        .then(data => {
            miembrosDB = data;
            miembrosFiltrados = [...miembrosDB];
            aplicarFiltrosYOrden();
        })
        .catch(err => console.error("Error cargando miembros:", err));

    const renderTabla = () => {
        cuerpoTabla.replaceChildren();
        const inicio = (paginaActual - 1) * filasPorPagina;
        const fin = inicio + filasPorPagina;
        const miembrosPagina = miembrosFiltrados.slice(inicio, fin);

        miembrosPagina.forEach(miembro => {
            const fila = document.createElement("tr");
            
            const cNombre = document.createElement("td");
            cNombre.textContent = miembro.nombre;
            
            const cEmail = document.createElement("td");
            cEmail.textContent = miembro.email; 
            
            const cTipo = document.createElement("td");
            cTipo.textContent = miembro.tipo.charAt(0).toUpperCase() + miembro.tipo.slice(1);

            fila.append(cNombre, cEmail, cTipo);
            fila.addEventListener("click", () => mostrarDetalles(miembro));
            cuerpoTabla.appendChild(fila);
        });
        actualizarControles();
    };

    const mostrarDetalles = (miembro) => {
        panelDetalle.style.display = "block";
        
        // Asignación segura de textos
        detNombre.textContent = miembro.nombre;
        detCorreo.textContent = miembro.email;
        detRegion.textContent = miembro.region; 
        detComuna.textContent = miembro.comuna; 
        detFecha.textContent = miembro.fecha; 

        // Limpiar y llenar actividades
        listaActividades.replaceChildren();
        
        // Verificamos si la lista existe y tiene elementos
        if (!miembro.actividades || miembro.actividades.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No hay actividades informadas.";
            listaActividades.appendChild(li);
        } else {
            miembro.actividades.forEach(act => {
                const li = document.createElement("li");
                li.style.marginBottom = "15px"; // Un poco de espacio extra entre actividades
                
                const strong = document.createElement("strong");
                strong.textContent = act.nombre;
                const texto = document.createTextNode(` (${act.tipo}) - ${act.dia} a las ${act.hora_inicio}`);
                li.append(strong, texto);
                
                // --- SECCIÓN DE GALERÍA DE FOTOS ---
                if (act.fotos && act.fotos.length > 0) {
                    const galeriaDiv = document.createElement("div");
                    galeriaDiv.style.display = "flex";
                    galeriaDiv.style.gap = "10px";
                    galeriaDiv.style.flexWrap = "wrap";
                    galeriaDiv.style.marginTop = "8px";

                    act.fotos.forEach(foto => {
                        const img = document.createElement("img");
                        img.src = `/static/uploads/${foto}`; 
                        img.style.width = "60px";
                        img.style.height = "60px";
                        img.style.objectFit = "cover";
                        img.style.borderRadius = "5px";
                        img.style.cursor = "pointer";
                        img.style.border = "1px solid #ccc";
                        
                        // Evento para abrir el modal (la función está en tu HTML)
                        img.onclick = () => {
                            if (typeof window.abrirModal === 'function') {
                                window.abrirModal(img.src);
                            } else {
                                console.warn("La función abrirModal no está definida en el HTML.");
                            }
                        };
                        
                        galeriaDiv.appendChild(img);
                    });
                    
                    li.appendChild(galeriaDiv);
                }

                listaActividades.appendChild(li);
            });
        }
    };

    // --- Funciones de apoyo (Filtros y Paginación) ---
    const actualizarControles = () => {
        indicadorPagina.textContent = `Página ${paginaActual}`;
        btnAnterior.disabled = paginaActual === 1;
        const totalPaginas = Math.ceil(miembrosFiltrados.length / filasPorPagina);
        btnSiguiente.disabled = paginaActual >= totalPaginas || totalPaginas === 0;
    };

    const aplicarFiltrosYOrden = () => {
        const t = filtroTipo.value;
        const o = ordenarPor.value;

        miembrosFiltrados = (t === "todos") ? [...miembrosDB] : miembrosDB.filter(m => m.tipo === t);

        miembrosFiltrados.sort((a, b) => {
            if (o === "nombre_asc") return a.nombre.localeCompare(b.nombre);
            if (o === "nombre_desc") return b.nombre.localeCompare(a.nombre);
            if (o === "correo_asc") return a.email.localeCompare(b.email);
            return 0;
        });

        paginaActual = 1;
        renderTabla();
        panelDetalle.style.display = "none";
    };

    filtroTipo.addEventListener("change", aplicarFiltrosYOrden);
    ordenarPor.addEventListener("change", aplicarFiltrosYOrden);
    btnAnterior.addEventListener("click", () => { paginaActual--; renderTabla(); });
    btnSiguiente.addEventListener("click", () => { paginaActual++; renderTabla(); });
});