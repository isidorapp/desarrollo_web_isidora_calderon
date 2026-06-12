# Tarea 3 - CC5002 Desarrollo de Aplicaciones Webs

Implementación de funciones nuevas, orientadas a la pestaña de estadísticas y a la sección de actividades. Incluyen:
* 3 gráficos estadísticos generados de manera dinámica desde la base de datos.
* Formulario para agregar comentarios a actividades, con validación en cliente y en servidor.
* Lista de comentarios por actividad, obtenido de manera asincrónica de la base de datos.

## Decisiones de diseño

### 1. Estadísticas
- Los tres gráficos se generan usando la biblioteca **Chart.js**, esta se usó para el mockup de estadísticas anteriormente, por lo que se mantuvo.
- Cada gráfico hace una llamada `fetch` a una URL del servidor que retorna datos en JSON, consultando directamente la base de datos mediante SQLAlchemy.
- Si algún fetch fallara, se muestra un mensaje de error en el HTML sin romper los demás gráficos.
  
### 2. Comentarios
#### Agregar comenterio:
- El formulario de comentarios se muestra en el panel lateral del listado de miembros, al hacer clic en el botón "Comentarios" de una actividad.
- Se validan en el cliente antes de enviar: que el nombre tenga entre 3 y 80 caracteres, el texto tenga entre 5 y 300 caracteres. Si hay errores, se muestran abajo de cada campo y no se realiza el fetch.
- Si pasa la validación cliente, se hace fetch con JSON al servidor.
- El servidor valida nuevamente los mismos campos. Si hay errores retorna HTTP (422) con un objeto JSON de errores, que el cliente muestra bajo cada campo manteniendo el formulario visible.
- Si todo es correcto, se inserta en la tabla `comentario`.
  
#### Listado de comentarios:
- Al abrir el panel de comentarios de una actividad, se retornan los comentarios en JSON ordenados del más reciente al más antiguo.
- Cada comentario se muestra con fecha, nombre de quién comentó y el comentario.
- Al agregar un comentario exitosamente, el listado se recarga automáticamente con otro fetch.


### 3. Seguridad
- Cliente: todos los datos se insertan en el DOM usando `.textContent` y `document.createElement`, nunca `innerHTML`. (Prevención de XSS)
- Servidor: Flask recibe los datos como JSON y los valida antes de pasarlos a SQLAlchemy, que usa parámetros preparados, (Prevención de Inyecciones SQL)
- Se eliminaron los `alert()` y `confirm()` reemplazándolos por mensajes en el DOM.

### 4. Base de datos
- Se agregó la tabla `comentario` mediante el script `tabla-comentario.sql` del enunciado.
- Se agregó el modelo `Comentario` en `db.py` con su relación a `Actividad`.
- Se agregaron funciones `crear_comentario`, `get_comentarios_por_actividad`, `actividad_existe`, `get_miembros_por_dia`, `get_actividades_por_tipo`, y `get_actividades_por_comuna`.
- En `get_miembros()` se agregó el campo `id` de actividad al diccionario retornado, necesario para las llamadas fetch de comentarios.
