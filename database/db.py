from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Enum, Text
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

class Foto(Base):
    __tablename__ = 'foto'
    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)
    actividad = relationship("Actividad", back_populates="fotos")


# funciones

# regiones
def get_regiones():
    session = SessionLocal()
    regiones = session.query(Region).order_by(Region.nombre).all()
    session.close()
    return regiones

# comunas
def get_comunas_by_region(region_id):
    session = SessionLocal()
    comunas = session.query(Comuna).filter(Comuna.region_id == region_id).order_by(Comuna.nombre).all()
    session.close()
    return comunas

# miembros
def get_miembros():
    session = SessionLocal()
    miembros_db = session.query(Miembro).all()
    listado_miembros = []
    for m in miembros_db:
        actividades_miembro = []
        for a in m.actividades:
            actividades_miembro.append({
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

# miembros
def get_miembros_by_nombre():
    session = SessionLocal()
    miembros_db = session.query(Miembro).order_by(Miembro.nombre).all()
    session.close()
    return miembros_db

# registro miembro
def crear_miembro(nombre, email, tipo, comuna_id):
    session = SessionLocal()
    new_miembro = Miembro(nombre=nombre, 
                          email=email,
                          tipo=tipo,
                          comuna_id=comuna_id)
    session.add(new_miembro)
    session.commit()
    session.close()
    return True

# últimos 5 miembros
def get_ultimos_5_miembros():
    session = SessionLocal()
    # se ordena por fecha descendente y se limita a 5
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

# registro actividad
def crear_actividad(miembro_id, dia, hora_inicio, duracion, tipo, nombre, descripcion, fotos):
    session = SessionLocal()
    new_actividad = Actividad(miembro_id=miembro_id,
                              dia=dia,
                              hora_inicio=hora_inicio,
                              duracion=duracion,
                              tipo=tipo,
                              nombre=nombre,
                              descripcion=descripcion)
    session.add(new_actividad)
    session.commit()
    
    for foto in fotos:
        new_foto = Foto(ruta_archivo=foto['ruta_archivo'],
                        nombre_archivo=foto['nombre_archivo'],
                        actividad_id=new_actividad.id)
        session.add(new_foto)
    session.commit()
    
    session.close()
    return True

