var actividadIdActual = null;

window.mostrarComentariosActividad = function(actividadId, nombreActividad) {
    actividadIdActual = actividadId;

    document.getElementById('seccionComentarios').style.display = 'block';
    document.getElementById('nombreActividadComentario').textContent = nombreActividad;

    limpiarFormulario();
    cargarComentarios(actividadId);
};

function cargarComentarios(actividadId) {
    var contenedor = document.getElementById('listadoComentarios');
    contenedor.replaceChildren();

    var pCargando = document.createElement('p');
    pCargando.textContent = 'Cargando comentarios...';
    contenedor.appendChild(pCargando);

    fetch('/api/comentarios/' + actividadId)
        .then(function(response) {
            if (!response.ok) { throw new Error('Error al obtener comentarios'); }
            return response.json();
        })
        .then(function(comentarios) {
            renderizarComentarios(comentarios);
        })
        .catch(function() {
            contenedor.replaceChildren();
            var pError = document.createElement('p');
            pError.textContent = 'Error al cargar los comentarios.';
            pError.className = 'error-msg';
            pError.style.display = 'block';
            contenedor.appendChild(pError);
        });
}

function renderizarComentarios(comentarios) {
    var contenedor = document.getElementById('listadoComentarios');
    contenedor.replaceChildren();

    if (comentarios.length === 0) {
        var pVacio = document.createElement('p');
        pVacio.textContent = 'Aún no hay comentarios para esta actividad.';
        contenedor.appendChild(pVacio);
        return;
    }

    var ul = document.createElement('ul');
    ul.className = 'lista-comentarios';

    comentarios.forEach(function(c) {
        var li = document.createElement('li');
        li.className = 'item-comentario';

        var spanFecha = document.createElement('span');
        spanFecha.className = 'comentario-fecha';
        spanFecha.textContent = c.fecha;

        var spanNombre = document.createElement('span');
        spanNombre.className = 'comentario-nombre';
        var strong = document.createElement('strong');
        strong.textContent = c.nombre;
        spanNombre.appendChild(strong);

        var pTexto = document.createElement('p');
        pTexto.className = 'comentario-texto';
        pTexto.textContent = c.texto;

        li.append(spanFecha, spanNombre, pTexto);
        ul.appendChild(li);
    });

    contenedor.appendChild(ul);
}

document.getElementById('btnAgregarComentario').addEventListener('click', function() {
    if (actividadIdActual === null) { return; }

    var nombre = document.getElementById('inputNombreComentario').value.trim();
    var texto = document.getElementById('inputTextoComentario').value.trim();

    ocultarError('errorNombreComentario');
    ocultarError('errorTextoComentario');
    ocultarMensaje();

    var hayErrores = false;

    if (nombre.length < 3 || nombre.length > 80) {
        mostrarError('errorNombreComentario', 'El nombre debe tener entre 3 y 80 caracteres.');
        hayErrores = true;
    }
    if (texto.length < 5 || texto.length > 300) {
        mostrarError('errorTextoComentario', 'El comentario debe tener entre 5 y 300 caracteres.');
        hayErrores = true;
    }

    if (hayErrores) { return; }

    fetch('/api/comentarios/' + actividadIdActual, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, texto: texto })
    })
        .then(function(response) {
            return response.json().then(function(data) {
                return { status: response.status, data: data };
            });
        })
        .then(function(resultado) {
            if (resultado.status === 201) {
                limpiarFormulario();
                mostrarMensaje('¡Comentario agregado!', 'success');
                cargarComentarios(actividadIdActual);
            } else if (resultado.status === 422 && resultado.data.errores) {
                var errores = resultado.data.errores;
                if (errores.nombre) { mostrarError('errorNombreComentario', errores.nombre); }
                if (errores.texto) { mostrarError('errorTextoComentario', errores.texto); }
            } else {
                mostrarMensaje('Error al enviar el comentario. Inténtalo de nuevo.', 'error');
            }
        })
        .catch(function() {
            mostrarMensaje('Error de conexión. Inténtalo de nuevo.', 'error');
        });
});


function limpiarFormulario() {
    document.getElementById('inputNombreComentario').value = '';
    document.getElementById('inputTextoComentario').value = '';
    ocultarError('errorNombreComentario');
    ocultarError('errorTextoComentario');
    ocultarMensaje();
}

function mostrarError(id, mensaje) {
    var el = document.getElementById(id);
    el.textContent = mensaje;
    el.style.display = 'block';
}

function ocultarError(id) {
    var el = document.getElementById(id);
    el.textContent = '';
    el.style.display = 'none';
}

function mostrarMensaje(texto, tipo) {
    var el = document.getElementById('mensajeComentario');
    el.textContent = texto;
    el.className = 'error-msg ' + tipo;
    el.style.display = 'block';
}

function ocultarMensaje() {
    document.getElementById('mensajeComentario').style.display = 'none';
}