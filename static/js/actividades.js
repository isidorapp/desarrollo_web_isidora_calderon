document.addEventListener("DOMContentLoaded", function() {
    const contenedor = document.getElementById("contenedorActividades");
    const btnAgregar = document.getElementById("btnAgregarActividad");
    const formActividad = document.getElementById("formRegistroActividad");

    let contadorActividades = 1;

    // mensaje de límite
    const mensajeMaximo = document.createElement("p");
    mensajeMaximo.className = "error-msg";
    mensajeMaximo.textContent = "Máximo 10 actividades.";
    mensajeMaximo.style.display = "none";
    if (btnAgregar) {
        btnAgregar.insertAdjacentElement("afterend", mensajeMaximo);
    }

    // validador de bloque de actividad
    const validarBloqueActividad = (bloque) => {
        const nombre = bloque.querySelector('[name="nombre"]').value.trim();
        const tipo = bloque.querySelector('[name="tipo"]').value;
        const dia = bloque.querySelector('[name="dia"]').value;
        const horaInicio = bloque.querySelector('[name="hora_inicio"]').value;
        const duracion = bloque.querySelector('[name="duracion"]').value.trim();
        const fotos = bloque.querySelector('input[type="file"]').files;

        const errorNombre = bloque.querySelector('.error-nombre');
        const errorTipo = bloque.querySelector('.error-tipo');
        const errorDia = bloque.querySelector('.error-dia');
        const errorHora = bloque.querySelector('.error-hora');
        const errorDuracion = bloque.querySelector('.error-duracion');
        const errorFotos = bloque.querySelector('.error-fotos');

        [errorNombre, errorTipo, errorDia, errorHora, errorDuracion, errorFotos].forEach(function(e) {
            if (e) e.style.display = "none";
        });

        if (nombre === "") {
            errorNombre.textContent = "El nombre de la actividad es obligatorio.";
            errorNombre.style.display = "block";
        }
        if (tipo === "") {
            errorTipo.textContent = "Debe seleccionar un tipo.";
            errorTipo.style.display = "block";
        }
        if (dia === "") {
            errorDia.textContent = "Debe seleccionar un día.";
            errorDia.style.display = "block";
        }
        if (horaInicio === "") {
            errorHora.textContent = "La hora de inicio es obligatoria.";
            errorHora.style.display = "block";
        }
        if (duracion === "") {
            errorDuracion.textContent = "La duración es obligatoria.";
            errorDuracion.style.display = "block";
        }
        if (fotos.length === 0) {
            errorFotos.textContent = "Debe subir al menos una foto/video.";
            errorFotos.style.display = "block";
        }
    };

    // validación en tiempo real
    if (contenedor) {
        contenedor.addEventListener("focusout", function(event) {
            const bloque = event.target.closest(".bloque-actividad");
            if (bloque) {
                validarBloqueActividad(bloque);
            }
        });
    }

    // agregar actividades
    if (btnAgregar) {
        btnAgregar.addEventListener("click", function() {
            // máximo 10 actividades
            if (contadorActividades >= 10) {
                mensajeMaximo.style.display = "block";
                return;
            }
            mensajeMaximo.style.display = "none";

            contadorActividades++;
            const bloqueOriginal = document.querySelector(".bloque-actividad");
            const nuevoBloque = bloqueOriginal.cloneNode(true);

            const inputs = nuevoBloque.querySelectorAll("input, select, textarea");
            inputs.forEach(function(input) {
                if (input.type !== "checkbox" && input.type !== "radio") input.value = "";
                if (input.type === "file") input.name = "fotos_" + (contadorActividades - 1);
            });

            if (contadorActividades === 2) {
                bloqueOriginal.querySelector('input[type="file"]').name = "fotos_0";
            }

            nuevoBloque.querySelectorAll(".error-msg").forEach(function(e) {
                e.style.display = "none";
            });

            // mensaje de confirmación para eliminar
            const mensajeConfirm = document.createElement("p");
            mensajeConfirm.className = "error-msg";
            mensajeConfirm.style.display = "none";

            const textoConfirm = document.createTextNode("¿Seguro? ");
            const btnConfirmarEliminar = document.createElement("button");
            btnConfirmarEliminar.type = "button";
            btnConfirmarEliminar.textContent = "Sí, eliminar";
            btnConfirmarEliminar.style.marginLeft = "6px";

            const btnCancelarEliminar = document.createElement("button");
            btnCancelarEliminar.type = "button";
            btnCancelarEliminar.textContent = "Cancelar";
            btnCancelarEliminar.style.marginLeft = "6px";

            mensajeConfirm.appendChild(textoConfirm);
            mensajeConfirm.appendChild(btnConfirmarEliminar);
            mensajeConfirm.appendChild(btnCancelarEliminar);

            btnConfirmarEliminar.addEventListener("click", function() {
                nuevoBloque.remove();
                contadorActividades--;
                mensajeMaximo.style.display = "none";
            });

            btnCancelarEliminar.addEventListener("click", function() {
                mensajeConfirm.style.display = "none";
            });

            // botón para eliminar actividad
            const btnEliminar = document.createElement("button");
            btnEliminar.type = "button";
            btnEliminar.className = "btn-eliminar btn-secundario";
            btnEliminar.textContent = "Eliminar esta actividad";
            btnEliminar.style.marginBottom = "15px";
            btnEliminar.style.backgroundColor = "#7c1836";
            btnEliminar.style.color = "white";

            btnEliminar.addEventListener("click", function() {
                mensajeConfirm.style.display = "block";
            });

            nuevoBloque.insertBefore(mensajeConfirm, nuevoBloque.firstChild);
            nuevoBloque.insertBefore(btnEliminar, nuevoBloque.firstChild);
            contenedor.appendChild(nuevoBloque);
        });
    }

    if (formActividad) {
        formActividad.addEventListener("submit", function(event) {
            console.log("Enviando actividades al servidor...");
        });
    }
});