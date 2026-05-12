document.addEventListener("DOMContentLoaded", function() {

    // validador miembros
    const formMiembro = document.getElementById("formRegistroMiembro");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    // manejo región/comuna
    if (regionSelect && comunaSelect) {
        regionSelect.addEventListener("change", function() {
            const regionId = regionSelect.value;

            // limpiar opciones anteriores
            comunaSelect.options.length = 0;

            // opción por defecto
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "-- Seleccione una opción --";
            comunaSelect.appendChild(defaultOption);

            // bloquear comuna si se vuelve a default en región
            if (regionId === "") {
                // deshabilitar mientras se cargan las comunas
                comunaSelect.disabled = true;
                return;
            }

            // pedir comunas a flask
            fetch(`/api/comunas/${regionId}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(comuna => {
                        const option = document.createElement("option");
                        option.value = comuna.id;
                        option.textContent = comuna.nombre;
                        comunaSelect.appendChild(option);
                    });
                    // habilitar después de cargar
                    comunaSelect.disabled = false;
                })
                .catch(error => {
                    console.error("Error al cargar comunas:", error);
                    comunaSelect.disabled = true;
                });
        });
    }
            
    // validación
    const validarTodo = () => {
        // campos
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const tipoMiembro = document.getElementById("tipoMiembro").value;
        const region = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value;

        // errores
        const errorNombre = document.getElementById("errorNombre");
        const errorEmail = document.getElementById("errorEmail");
        const errorTipo = document.getElementById("errorTipo");
        const errorRegion = document.getElementById("errorRegion");
        const errorComuna = document.getElementById("errorComuna");

        // reseteo de errores
        errorNombre.style.display = "none";
        errorEmail.style.display = "none";
        errorTipo.style.display = "none";
        errorRegion.style.display = "none";
        errorComuna.style.display = "none";

        // validador nombre
        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/;
        if (nombre === "") {
            errorNombre.textContent = "El nombre es obligatorio.";
            errorNombre.style.display = "block";
        } else if (!regexNombre.test(nombre)) {
            errorNombre.textContent = "Debe ingresar al menos un nombre y un apellido válidos.";
            errorNombre.style.display = "block";
        }

        // validador email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            errorEmail.textContent = "El correo es obligatorio.";
            errorEmail.style.display = "block";
        } else if (!regexEmail.test(email)) {
            errorEmail.textContent = "Debe ingresar un correo válido.";
            errorEmail.style.display = "block";
        }

        // validador tipo de miembro
        if (tipoMiembro === "") {
            errorTipo.textContent = "Debe seleccionar un tipo de miembro.";
            errorTipo.style.display = "block";
        }

        // validador región
        if (region === "") {
            errorRegion.textContent = "Debe seleccionar una región.";
            errorRegion.style.display = "block";
        }

        // validador comuna
        if (comuna === "") {
            errorComuna.textContent = "Debe seleccionar una comuna.";
            errorComuna.style.display = "block";
        }
    };

    // validación en tiempo real
    const campos = ["nombre", "email", "tipoMiembro", "region", "comuna"];
    campos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener("blur", validarTodo);
        }
    });

    // manejo miembros
    if (formMiembro) {
        formMiembro.addEventListener("submit", function(event) {
            console.log("Enviando formulario al servidor...");
        });
    }
});