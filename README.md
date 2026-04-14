# Tarea 1 - CC5002 Desarrollo de Aplicaciones Webs

## Resumen

Implementación de aplicación web para el registro y visualización de miembros y sus actividades dentro de la comunidad DCC.
La aplicación incluye:
* Registrar miembros con validación de datos.
* Registrar múltiples actividades por miembro.
* Visualizar un listado de miembros con filtrado, ordenamiento y paginación.
* Mostrar métricas mediante gráficos.


## Decisiones de diseño

### 1. Validación con JavaScript

Se implementaron validaciones de formularios con JavaScript incluyendo:

* Nombre con al menos nombre y apellido mediante expresiones regulares.
* Correo electrónico válido.
* Validación de días, horarios y archivos en actividades.


### 2. Manejo de múltiples actividades

Se permite registrar múltiples actividades dinámicamente mediante JavaScript:

* Se pueden agregar hasta 10 actividades.
* Cada actividad se valida de forma independiente.
* Se puede eliminar cualquier actividad excepto la primera antes de enviar.


### 3. Selección de días y horarios

Se decidió:

* Usar checkboxes para los días de la semana (más intuitivo que texto libre).
* Usar inputs tipo `time` para evitar errores de formato.
* Validar que la hora de inicio sea menor que la de término.


### 4. Almacenamiento de datos

Se utilizó `localStorage` para guardar a los miembros registrados:

* Permite mantener datos entre recargas de la página.
* Se combinan con datos iniciales para efectos de visualización.


### 5. Listado de miembros

Se implementó:

* Filtrado por tipo de miembro.
* Ordenamiento por nombre y correo.
* Paginación (5 elementos por página).


### 6. Estadísticas

Se utilizó Chart.js (externo) para visualizar datos:

* Gráfico de torta para distribución de miembros por tipo.
* Gráfico de barras para distribución de actividades por tipo.


## Autor

[Tu nombre aquí]
