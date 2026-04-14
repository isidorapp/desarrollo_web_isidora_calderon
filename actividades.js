document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedorActividades");
    const btnAgregar = document.getElementById("btnAgregarActividad");
    const formActividad = document.getElementById("formRegistroActividad");

    let contadorActividades = 1;

    // agregar más de una actividad
    btnAgregar.addEventListener("click", () => {
        // máximo 10
        if (contadorActividades >= 10) {
            alert("Máximo 10 actividades.");
            return;
        }

        contadorActividades++;

        // crear nuevo bloque
        const nuevoBloque = document.createElement("div");
        nuevoBloque.className = "bloque-actividad";

        // formato html bloque original
        nuevoBloque.innerHTML = `
            <h2>Actividades extra</h2>

            <button type="button" class="btn-eliminar">Eliminar actividad</button>

            <div class="grupo-input">
                <label>Tipo de Actividad (*):</label>
                <select class="input-tipo">
                    <option value="">-- Seleccione --</option>
                    <option value="artistica">Artística</option>
                    <option value="deportiva">Deportiva</option>
                    <option value="tecnologica">Tecnológica</option>
                    <option value="social">Social</option>
                    <option value="recreativa">Recreativa</option>
                </select>
                <span class="error-msg error-tipo"></span>
            </div>

            <div class="grupo-input">
                <label>Días (*):</label>
                <div>
                    ${["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]
                        .map(d => `<label><input type="checkbox" name="dias" value="${d}"> ${d}</label>`)
                        .join("")}
                </div>
                <span class="error-msg error-dias"></span>
            </div>

            <div class="grupo-input">
                <label>Hora de inicio (*):</label>
                <input type="time" class="horaInicio">

                <label>Hora de término (*):</label>
                <input type="time" class="horaFin">

                <span class="error-msg error-horario"></span>
            </div>

            <div class="grupo-input">
                <label>Fotos o videos de la actividad (*):</label>
                <input type="file" class="input-archivos" accept="image/*,video/*" multiple>
                <span class="error-msg error-archivos"></span>
            </div>

            <div class="grupo-input">
                <label>Enlace (*):</label>
                <input type="url" class="input-enlace">
                <span class="error-msg error-enlace"></span>
            </div>
        `;

        contenedor.appendChild(nuevoBloque);

        // eliminar actividad antes de enviar
        const btnEliminar = nuevoBloque.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            const confirmar = confirm("¿Seguro que quieres eliminar esta actividad?");
            if (confirmar) {
                nuevoBloque.remove();
                contadorActividades --;
            }
        });
});

    // validador actividades
    if (formActividad) {
        formActividad.addEventListener("submit", (event) => {
            event.preventDefault();

            let formularioValido = true;

            // bloques de actividades
            const bloques = document.querySelectorAll(".bloque-actividad");

            bloques.forEach((bloque) => {

                // campos
                const tipoAct = bloque.querySelector(".input-tipo").value;
                const dias = bloque.querySelectorAll('input[name="dias"]:checked');
                const horaInicio = bloque.querySelector(".horaInicio").value;
                const horaFin = bloque.querySelector(".horaFin").value;
                const archivos = bloque.querySelector(".input-archivos").files;
                const enlace = bloque.querySelector(".input-enlace").value.trim();

                // errores
                const errorTipo = bloque.querySelector(".error-tipo");
                const errorDias = bloque.querySelector(".error-dias");
                const errorHorario = bloque.querySelector(".error-horario");
                const errorArchivos = bloque.querySelector(".error-archivos");
                const errorEnlace = bloque.querySelector(".error-enlace");

                // reseteo errores
                [errorTipo, errorDias, errorHorario, errorArchivos, errorEnlace]
                    .forEach(e => e.style.display = "none");

                // validador tipo de actividad
                if (tipoAct === "") {
                    errorTipo.textContent = "Seleccione tipo.";
                    errorTipo.style.display = "block";
                    formularioValido = false;
                }

                // validador días
                if (dias.length === 0) {
                    errorDias.textContent = "Seleccione al menos un día.";
                    errorDias.style.display = "block";
                    formularioValido = false;
                }

                // validador horario
                if (horaInicio === "" || horaFin === "") {
                    errorHorario.textContent = "Ingrese horario.";
                    errorHorario.style.display = "block";
                    formularioValido = false;
                } else if (horaInicio >= horaFin) {
                    errorHorario.textContent = "Horario de Inicio debe ser menor a Fin.";
                    errorHorario.style.display = "block";
                    formularioValido = false;
                }

                // validador archivos
                if (archivos.length === 0) {
                    errorArchivos.textContent = "Debe subir al menos una imagen o video.";
                    errorArchivos.style.display = "block";
                    formularioValido = false;
                }

                // enlace
                const regexUrl = /^(https?:\/\/)/;
                if (enlace === "") {
                    errorEnlace.textContent = "Debe ingresar un enlace.";
                    errorEnlace.style.display = "block";
                    formularioValido = false;
                } else if (!regexUrl.test(enlace)) {
                    errorEnlace.textContent = "Debe ingresar una URL válida.";
                    errorEnlace.style.display = "block";
                    formularioValido = false;
                }
            });

            // si el formulario no se invalidó en ningún momento
            if (formularioValido) {
                alert(`Se registraron ${bloques.length} actividades correctamente`);
                location.reload();
            }
        });
    }
});