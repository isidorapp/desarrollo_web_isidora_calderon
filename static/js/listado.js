document.addEventListener("DOMContentLoaded", () => {
    let miembrosDB = [];
    let miembrosFiltrados = [];
    let paginaActual = 1;
    const filasPorPagina = 5;

    // elementos DOM
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    const filtroTipo = document.getElementById("filtroTipo");
    const ordenarPor = document.getElementById("ordenarPor");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const indicadorPagina = document.getElementById("indicadorPagina");

    // detalles
    const panelDetalle = document.getElementById("detalleMiembro");
    const detNombre = document.getElementById("detNombre");
    const detCorreo = document.getElementById("detCorreo");
    const detRegion = document.getElementById("detRegion");
    const detComuna = document.getElementById("detComuna");
    const detFecha = document.getElementById("detFecha");
    const listaActividades = document.getElementById("listaActividades");

    // fetch datos
    fetch('/api/miembros')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            miembrosDB = data;
            miembrosFiltrados = miembrosDB.slice();
            aplicarFiltrosYOrden();
        })
        .catch(function(err) { console.error("Error cargando miembros:", err); });

    var renderTabla = function() {
        cuerpoTabla.replaceChildren();
        var inicio = (paginaActual - 1) * filasPorPagina;
        var fin = inicio + filasPorPagina;
        var miembrosPagina = miembrosFiltrados.slice(inicio, fin);

        miembrosPagina.forEach(function(miembro) {
            var fila = document.createElement("tr");

            var cNombre = document.createElement("td");
            cNombre.textContent = miembro.nombre;

            var cEmail = document.createElement("td");
            cEmail.textContent = miembro.email;

            var cTipo = document.createElement("td");
            cTipo.textContent = miembro.tipo.charAt(0).toUpperCase() + miembro.tipo.slice(1);

            fila.append(cNombre, cEmail, cTipo);
            fila.addEventListener("click", function() { mostrarDetalles(miembro); });
            cuerpoTabla.appendChild(fila);
        });
        actualizarControles();
    };

    var mostrarDetalles = function(miembro) {
        panelDetalle.style.display = "block";

        detNombre.textContent = miembro.nombre;
        detCorreo.textContent = miembro.email;
        detRegion.textContent = miembro.region;
        detComuna.textContent = miembro.comuna;
        detFecha.textContent = miembro.fecha;

        var seccionComentarios = document.getElementById("seccionComentarios");
        if (seccionComentarios) {
            seccionComentarios.style.display = "none";
        }

        // limpiar y llenar actividades
        listaActividades.replaceChildren();

        if (!miembro.actividades || miembro.actividades.length === 0) {
            var li = document.createElement("li");
            li.textContent = "No hay actividades informadas.";
            listaActividades.appendChild(li);
        } else {
            miembro.actividades.forEach(function(act) {
                var li = document.createElement("li");
                li.style.marginBottom = "15px";

                var strong = document.createElement("strong");
                strong.textContent = act.nombre;
                var texto = document.createTextNode(
                    " (" + act.tipo + ") - " + act.dia + " a las " + act.hora_inicio
                );
                li.append(strong, texto);

                // galería de fotos
                if (act.fotos && act.fotos.length > 0) {
                    var galeriaDiv = document.createElement("div");
                    galeriaDiv.style.display = "flex";
                    galeriaDiv.style.gap = "10px";
                    galeriaDiv.style.flexWrap = "wrap";
                    galeriaDiv.style.marginTop = "8px";

                    act.fotos.forEach(function(foto) {
                        var img = document.createElement("img");
                        img.src = "/static/uploads/" + foto;
                        img.style.width = "60px";
                        img.style.height = "60px";
                        img.style.objectFit = "cover";
                        img.style.borderRadius = "5px";
                        img.style.cursor = "pointer";
                        img.style.border = "1px solid #ccc";

                        img.onclick = function() {
                            if (typeof window.abrirModal === 'function') {
                                window.abrirModal(img.src);
                            }
                        };

                        galeriaDiv.appendChild(img);
                    });

                    li.appendChild(galeriaDiv);
                }

                var btnComentarios = document.createElement("button");
                btnComentarios.textContent = "Comentarios";
                btnComentarios.className = "btn-comentarios";
                btnComentarios.setAttribute("type", "button");

                (function(actId, actNombre) {
                    btnComentarios.addEventListener("click", function() {
                        if (typeof window.mostrarComentariosActividad === 'function') {
                            window.mostrarComentariosActividad(actId, actNombre);
                        }
                    });
                })(act.id, act.nombre);

                li.appendChild(btnComentarios);
                
                listaActividades.appendChild(li);
            });
        }
    };

    // filtros y paginación
    var actualizarControles = function() {
        indicadorPagina.textContent = "Página " + paginaActual;
        btnAnterior.disabled = paginaActual === 1;
        var totalPaginas = Math.ceil(miembrosFiltrados.length / filasPorPagina);
        btnSiguiente.disabled = paginaActual >= totalPaginas || totalPaginas === 0;
    };

    var aplicarFiltrosYOrden = function() {
        var t = filtroTipo.value;
        var o = ordenarPor.value;

        miembrosFiltrados = (t === "todos")
            ? miembrosDB.slice()
            : miembrosDB.filter(function(m) { return m.tipo === t; });

        miembrosFiltrados.sort(function(a, b) {
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
    btnAnterior.addEventListener("click", function() { paginaActual--; renderTabla(); });
    btnSiguiente.addEventListener("click", function() { paginaActual++; renderTabla(); });
});