from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Enum, Text, func
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime


DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# modelos
class Region(Base):
    __tablename__ = 'region'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    comunas = relationship("Comuna", back_populates="region")

class Comuna(Base):
    __tablename__ = 'comuna'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)
    region = relationship("Region", back_populates="comunas")
    miembros = relationship("Miembro", back_populates="comuna")

class Miembro(Base):
    __tablename__ = 'miembro'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(80), nullable=False)
    tipo = Column(Enum('estudiante', 'funcionario', 'academico'), nullable=False)
    fecha_registro = Column(DateTime, default=datetime.now)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)
    comuna = relationship("Comuna", back_populates="miembros")
    actividades = relationship("Actividad", back_populates="miembro")

class Actividad(Base):
    __tablename__ = 'actividad'
    id = Column(Integer, primary_key=True, autoincrement=True)
    miembro_id = Column(Integer, ForeignKey('miembro.id'), nullable=False)
    dia = Column(Enum('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'), nullable=False)
    hora_inicio = Column(String(5), nullable=False)
    duracion = Column(String(5), nullable=False)
    tipo = Column(Enum('arte', 'deporte', 'tecnología', 'social', 'recreación', 'otra'), nullable=False)
    nombre = Column(String(45), nullable=False)
    descripcion = Column(Text)
    miembro = relationship("Miembro", back_populates="actividades")
    fotos = relationship("Foto", back_populates="actividad")
    comentarios = relationship("Comentario", back_populates="actividad")

class Foto(Base):
    __tablename__ = 'foto'
    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)
    actividad = relationship("Actividad", back_populates="fotos")

class Comentario(Base):
    __tablename__ = 'comentario'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime, nullable=False, default=datetime.now)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)
    actividad = relationship("Actividad", back_populates="comentarios")


# funciones
def get_regiones():
    session = SessionLocal()
    regiones = session.query(Region).order_by(Region.nombre).all()
    session.close()
    return regiones

def get_comunas_by_region(region_id):
    session = SessionLocal()
    comunas = session.query(Comuna).filter(Comuna.region_id == region_id).order_by(Comuna.nombre).all()
    session.close()
    return comunas

def get_miembros():
    session = SessionLocal()
    miembros_db = session.query(Miembro).all()
    listado_miembros = []
    for m in miembros_db:
        actividades_miembro = []
        for a in m.actividades:
            actividades_miembro.append({
                'id': a.id,
                'dia': a.dia,
                'hora_inicio': a.hora_inicio,
                'duracion': a.duracion,
                'tipo': a.tipo,
                'nombre': a.nombre,
                'descripcion': a.descripcion,
                'fotos': [foto.nombre_archivo for foto in a.fotos]
            })
        listado_miembros.append({
            'id': m.id,
            'nombre': m.nombre,
            'email': m.email,
            'tipo': m.tipo,
            'comuna': m.comuna.nombre,
            'region': m.comuna.region.nombre,
            'fecha': m.fecha_registro.strftime("%Y-%m-%d %H:%M"),
            'actividades': actividades_miembro
        })
    session.close()
    return listado_miembros

def get_miembros_by_nombre():
    session = SessionLocal()
    miembros_db = session.query(Miembro).order_by(Miembro.nombre).all()
    session.close()
    return miembros_db

def crear_miembro(nombre, email, tipo, comuna_id):
    session = SessionLocal()
    new_miembro = Miembro(nombre=nombre, email=email, tipo=tipo, comuna_id=comuna_id)
    session.add(new_miembro)
    session.commit()
    session.close()
    return True

def get_ultimos_5_miembros():
    session = SessionLocal()
    miembros_db = session.query(Miembro).order_by(Miembro.fecha_registro.desc()).limit(5).all()
    listado = []
    for m in miembros_db:
        listado.append({
            'nombre': m.nombre,
            'email': m.email,
            'tipo': m.tipo,
            'fecha': m.fecha_registro.strftime("%d-%m-%Y %H:%M")
        })
    session.close()
    return listado

def crear_actividad(miembro_id, dia, hora_inicio, duracion, tipo, nombre, descripcion, fotos):
    session = SessionLocal()
    new_actividad = Actividad(
        miembro_id=miembro_id,
        dia=dia,
        hora_inicio=hora_inicio,
        duracion=duracion,
        tipo=tipo,
        nombre=nombre,
        descripcion=descripcion
    )
    session.add(new_actividad)
    session.commit()
    for foto in fotos:
        new_foto = Foto(
            ruta_archivo=foto['ruta_archivo'],
            nombre_archivo=foto['nombre_archivo'],
            actividad_id=new_actividad.id
        )
        session.add(new_foto)
    session.commit()
    session.close()
    return True


def crear_comentario(actividad_id, nombre, texto):
    session = SessionLocal()
    nuevo = Comentario(
        actividad_id=actividad_id,
        nombre=nombre,
        texto=texto,
        fecha=datetime.now()
    )
    session.add(nuevo)
    session.commit()
    session.close()
    return True

def get_comentarios_por_actividad(actividad_id):
    session = SessionLocal()
    comentarios = (
        session.query(Comentario)
        .filter(Comentario.actividad_id == actividad_id)
        .order_by(Comentario.fecha.desc())
        .all()
    )
    resultado = []
    for c in comentarios:
        resultado.append({
            'nombre': c.nombre,
            'texto': c.texto,
            'fecha': c.fecha.strftime("%d-%m-%Y %H:%M")
        })
    session.close()
    return resultado

def actividad_existe(actividad_id):
    session = SessionLocal()
    actividad = session.query(Actividad).filter(Actividad.id == actividad_id).first()
    session.close()
    return actividad is not None


def get_miembros_por_dia():
    session = SessionLocal()
    resultados = (
        session.query(
            func.date(Miembro.fecha_registro).label('dia'),
            func.count(Miembro.id).label('cantidad')
        )
        .group_by(func.date(Miembro.fecha_registro))
        .order_by(func.date(Miembro.fecha_registro))
        .all()
    )
    data = [{'dia': str(r.dia), 'cantidad': r.cantidad} for r in resultados]
    session.close()
    return data

def get_actividades_por_tipo():
    session = SessionLocal()
    resultados = (
        session.query(
            Actividad.tipo.label('tipo'),
            func.count(Actividad.id).label('cantidad')
        )
        .group_by(Actividad.tipo)
        .order_by(func.count(Actividad.id).desc())
        .all()
    )
    data = [{'tipo': r.tipo, 'cantidad': r.cantidad} for r in resultados]
    session.close()
    return data

def get_actividades_por_comuna():
    session = SessionLocal()
    resultados = (
        session.query(
            Comuna.nombre.label('comuna'),
            func.count(Actividad.id).label('cantidad')
        )
        .join(Miembro, Miembro.comuna_id == Comuna.id)
        .join(Actividad, Actividad.miembro_id == Miembro.id)
        .group_by(Comuna.nombre)
        .order_by(func.count(Actividad.id).desc())
        .all()
    )
    data = [{'comuna': r.comuna, 'cantidad': r.cantidad} for r in resultados]
    session.close()
    return data