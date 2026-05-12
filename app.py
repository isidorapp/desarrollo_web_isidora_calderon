from flask import Flask, request, render_template, redirect, url_for, jsonify, flash
from database import db
from werkzeug.utils import secure_filename
import os


UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.secret_key = 'esnupi'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ruta portada
@app.route('/')
def index():
    ultimos_miembros = db.get_ultimos_5_miembros()
    return render_template('index.html', ultimos_miembros=ultimos_miembros)

# ruta vuelta al inicio
@app.route('/index')
def inicio():
    ultimos_miembros = db.get_ultimos_5_miembros()
    return render_template('index.html', ultimos_miembros=ultimos_miembros)

# ruta registro miembros
@app.route('/miembros', methods=['GET', 'POST'])
def registro_miembro():
    # post
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        tipo = request.form.get('tipoMiembro')
        comuna_id = request.form.get('comuna')
        
        # validación servidor
        if not nombre or not email or not tipo or not comuna_id:
            flash('Error: Todos los campos marcados con (*) son obligatorios.', 'error')
            return render_template('registro_miembro.html', regiones=db.get_regiones())
        
        db.crear_miembro(nombre, email, tipo, comuna_id)
        
        flash('❤︎ ¡Miembro registrado exitosamente! ❤︎', 'success')
        return redirect(url_for('index'))
    
    # get
    listado_regiones = db.get_regiones()
    return render_template('registro_miembro.html', regiones=listado_regiones)

# ruta registro actividades
@app.route('/actividades', methods=['GET', 'POST'])
def registro_actividad():
    # post
    if request.method == 'POST':
        miembro_id = request.form.get('miembro_id')
        nombres = request.form.getlist('nombre')
        tipos = request.form.getlist('tipo')
        dias = request.form.getlist('dia')
        horas_inicio = request.form.getlist('hora_inicio')
        duraciones = request.form.getlist('duracion')
        descripciones = request.form.getlist('descripcion')

        # validación servidor
        if not miembro_id or not nombres or len(nombres) == 0:
            flash("Error: Debe seleccionar un miembro y registrar al menos una actividad.", "error")
            return render_template('registro_actividad.html', miembros=db.get_miembros_by_nombre())

        for i in range(len(nombres)):
            if not nombres[i] or not tipos[i] or not dias[i] or not horas_inicio[i] or not duraciones[i]:
                flash(f"Error: Faltan datos obligatorios en la actividad #{i+1}.", "error")
                return render_template('registro_actividad.html', miembros=db.get_miembros_by_nombre())
        
        # insertar en base de datos
        actividades_registradas = 0
        
        for i in range(len(nombres)):
            # buscar fotos de actividad
            nombre_input_fotos = f"fotos_{i}"
            archivos = request.files.getlist(nombre_input_fotos)
            
            if not archivos and i == 0:
                archivos = request.files.getlist('fotos')
                
            fotos_procesadas = []
            
            for archivo in archivos:
                if archivo and archivo.filename != '':
                    filename = secure_filename(archivo.filename)
                    ruta_guardado = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    archivo.save(ruta_guardado)
                    fotos_procesadas.append({
                        'nombre_archivo': filename,
                        'ruta_archivo': ruta_guardado
                    })
            
            db.crear_actividad(
                miembro_id=miembro_id,
                dia=dias[i],
                hora_inicio=horas_inicio[i],
                duracion=duraciones[i],
                tipo=tipos[i],
                nombre=nombres[i],
                descripcion=descripciones[i] if i < len(descripciones) else "",
                fotos=fotos_procesadas
            )
            actividades_registradas += 1
        
        flash(f'❤︎ ¡Registro exitoso de {actividades_registradas} actividad(es)! ❤︎', 'success')
        return redirect(url_for('index'))
    
    # get
    listado_miembros = db.get_miembros_by_nombre()
    return render_template('registro_actividad.html', miembros=listado_miembros)

# ruta listado miembros
@app.route('/listado')
def listado_miembros():
    miembros = db.get_miembros()
    return render_template('listado_miembros.html', miembros=miembros)

# ruta estadísticas
@app.route('/metricas')
def metricas():
    return render_template('metricas.html')


# rutas API

# obtener miembros
@app.route('/api/miembros')
def obtener_miembros():
    miembros = db.get_miembros()
    return jsonify(miembros)

# obtener comunas de una región
@app.route('/api/comunas/<int:region_id>')
def obtener_comunas(region_id):
    comunas = db.get_comunas_by_region(region_id)
    listado_comunas = [{'id': comuna.id, 'nombre': comuna.nombre} for comuna in comunas]
    return jsonify(listado_comunas)

# ejecución
if __name__ == '__main__':
    app.run(debug=True)