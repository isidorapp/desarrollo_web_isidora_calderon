# Tarea 2 - CC5002 Desarrollo de Aplicaciones Webs

## Resumen

Implementación de actualizaciones de aplicación web para el registro y visualización de miembros y sus actividades dentro de la comunidad DCC.
Las actualizaciones incluyen:
* Mostrar últimos 5 miembros agregados en la base de datos en la portada.
* Validación de datos en servidor atendido por Flask.
* Listado de miembros conectado con sus respectivos datos y actividades.

## Decisiones de diseño

### 1. CSS  

Organización por estilos específicos por página (index, miembros, actividades, etc)

### 2. Portada

Se incluyen los últimos 5 miembros agregados a la base de datos (si hay) mediante una tabla simple.

### 3. Registro de miembros

- Se quitó event.preventDefault() para dejar que el servidor valide.
- La validación se hace en tiempo real para doble validación (js y servidor).
* Nota: se muestra el error en todos los campos si se seleccionó un campo y se deseleccionó, esto para poder mantener las validaciones js.
- No se incluye el campo teléfono por simplicidad, eliminándose también de la base de datos y clases en app.py.
- El selector de comunas solo se activa si ya se eligió una región, mostrando solo las comunas de esa región.
- El resto de validaciones se mantienen de la T1.
  
### 4. Registro de actividades  

- Se quitó event.preventDefault() para dejar que el servidor valide.
- La validación de actividades en JavaScript ya no emplea innerHtml para crear un nuevo bloque, sino que se clona el primero mediante cloneNode.
- La validación se hace en tiempo real para doble validación (js y servidor).
* Nota: se muestra el error en todos los campos si se seleccionó un campo y se deseleccionó, esto para poder mantener las validaciones js.
- Solo se valida que se rellenen los campos, ya que se restringe el tipo desde el html (tiempo, día, duración, etc), y el nombre de la actividad es libre.
- El registro ahora pide el miembro que realiza o registra la actividad.
- Se pide nombre de la actividad, el tipo (mediante un selector), el día (ahora se pide un solo día mediante un selector, a diferencia de varios días como estaba en la T1),
la hora de inicio de la actividad con tipo tiempo, la duración en minutos (similar al empleo de tiempo de tareas en U-Cursos), una descripción opcional, y fotos o videos de la actividad.

### 5. Listado de miembros  

- Se mantiene la paginación de miembros registrados con filtro y ordenamiento.
- Al presionar un miembro, se despliega un *aside* con los detalles del miembro, incluyendo nombre, correo, región, comuna, y fecha de registro (guardada con datetime).
Se muestran las actividades informadas del miembro, junto con las imágenes que haya subido. Estas se trabajaron como modales para permitir agrandarlas y cerrarlas.

### 6. Base de datos

- Se definen las clases Region, Comuna, Miembro, Actividad, y Foto, cada una con sus respectivos campos.
- Las funciones de get y crear se manejan con session. Para guardado se usan listas vacías y se hace append según corresponda.

### 7. App

- Se tienen dos rutas para index; la ruta con la que se abre la web ('/'), y la ruta cuando se vuelve al inicio ('/index')
- Se valida en servidor, si hay errores se muestran con flash.

### 8. Validaciones HTML y CSS

- Al usar Flask, la página para validar código html arroja errores, por lo que se utilizó el código fuente de la app corriendo para revisión de errores.
