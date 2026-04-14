document.addEventListener("DOMContentLoaded", function() {

    // validador miembros
    const formMiembro = document.getElementById("formRegistroMiembro");

    if (formMiembro) {
        formMiembro.addEventListener("submit", function(event) {
            // evitar envío automático del formulario y recarga de la página
            event.preventDefault();
            
            let formularioValido = true;

            // campos
            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const tipoMiembro = document.getElementById("tipoMiembro").value;

            // errores
            const errorNombre = document.getElementById("errorNombre");
            const errorEmail = document.getElementById("errorEmail");
            const errorTipo = document.getElementById("errorTipo");

            // reseteo de errores
            errorNombre.style.display = "none";
            errorEmail.style.display = "none";
            errorTipo.style.display = "none";

            // validador nombre
            const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/;
            // no vacío
            if (nombre === "") {
                errorNombre.textContent = "El nombre es obligatorio.";
                errorNombre.style.display = "block";
                formularioValido = false;
            // nombre Y apellido
            } else if (!regexNombre.test(nombre)) {
                errorNombre.textContent = "Debe ingresar al menos un nombre y un apellido válidos.";
                errorNombre.style.display = "block";
                formularioValido = false;
            }

            // validador email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // no vacío
            if (email === "") {
                errorEmail.textContent = "El correo es obligatorio.";
                errorEmail.style.display = "block";
                formularioValido = false;
            // formato válido
            } else if (!regexEmail.test(email)) {
                errorEmail.textContent = "Debe ingresar un correo válido.";
                errorEmail.style.display = "block";
                formularioValido = false;
            }

            // validador tipo de miembro
            if (tipoMiembro === "") {
                errorTipo.textContent = "Debe seleccionar un tipo de miembro.";
                errorTipo.style.display = "block";
                formularioValido = false;
            }

            // si el formulario no se inavlidó en ningún momento
            if (formularioValido) {
                // crear nuevo miembro
                const nuevoMiembro = {
                    nombre: nombre,
                    correo: email,
                    tipo: tipoMiembro
                };

                // obtener miembros previamente guardados, si no hay, crear arreglo vacío
                let miembrosGuardados = JSON.parse(localStorage.getItem('miembrosDCC')) || [];

                // agregar nuevo miembro
                miembrosGuardados.push(nuevoMiembro);

                // guardar el arreglo actualizado en el navegador
                localStorage.setItem('miembrosDCC', JSON.stringify(miembrosGuardados));
                
                // mensaje de éxito
                alert("¡Miembro registrado correctamente y guardado en memoria!");
                
                // limpia el formulario para permitir registrar otro miembro
                formMiembro.reset();
            }
        });
    }
});