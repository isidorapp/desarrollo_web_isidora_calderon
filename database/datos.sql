-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (x86_64)
--
-- Host: 127.0.0.1    Database: tarea2
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `miembro`
--

DROP TABLE IF EXISTS `miembro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `miembro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(80) NOT NULL,
  `fecha_registro` datetime NOT NULL,
  `comuna_id` int NOT NULL,
  `tipo` enum('estudiante','funcionario','academico') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_miembro_comuna1_idx` (`comuna_id`),
  CONSTRAINT `fk_miembro_comuna1` FOREIGN KEY (`comuna_id`) REFERENCES `comuna` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `miembro`
--

/*!40000 ALTER TABLE `miembro` DISABLE KEYS */;
INSERT INTO `miembro` VALUES (1,'Joel Riquelme','joel@dcc.cl','2026-05-11 20:31:42',130212,'academico'),(2,'Ignacio Balbontín','monk@dcc.cl','2026-05-11 20:36:16',130212,'funcionario'),(3,'Benjamín Duarte','bduarte@pleiad.cl','2026-05-11 20:41:38',90205,'academico'),(4,'Gabriel Tapia','hatsune@miku.com','2026-05-11 20:44:27',130103,'estudiante'),(5,'Matías Bravo','mbravo@meta.net','2026-05-11 20:46:49',130204,'estudiante'),(6,'Amaro Guajardo','amarito@dimec.cl','2026-05-11 20:50:26',50705,'estudiante'),(7,'Anibal Peñailillo','andy@ball.com','2026-05-11 20:55:53',130103,'funcionario'),(8,'Diego Orellana','dob@ore.yahoo.cl','2026-05-11 20:59:50',50706,'funcionario'),(9,'Luis Muñoz','luis@fias.cl','2026-05-12 12:20:43',70204,'estudiante');
/*!40000 ALTER TABLE `miembro` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-12 13:59:57
-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (x86_64)
--
-- Host: 127.0.0.1    Database: tarea2
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `miembro_id` int NOT NULL,
  `dia` enum('lunes','martes','miércoles','jueves','viernes','sábado','domingo') NOT NULL,
  `hora_inicio` varchar(5) NOT NULL,
  `duracion` varchar(5) NOT NULL,
  `tipo` enum('arte','deporte','tecnología','social','recreación','otra') NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  KEY `fk_actividad_miembro1_idx` (`miembro_id`),
  CONSTRAINT `fk_actividad_miembro1` FOREIGN KEY (`miembro_id`) REFERENCES `miembro` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` VALUES (1,1,'lunes','20:30','240','social','Asado con amigos',''),(2,2,'domingo','12:00','60','recreación','Armar legos',''),(3,2,'jueves','16:20','90','deporte','Jugar Volley',''),(4,3,'viernes','18:45','120','arte','Ballet',''),(5,4,'miércoles','12:00','360','tecnología','Diseñar tarea de computación',''),(6,5,'martes','09:00','30','deporte','Pasear a Pollie',''),(7,5,'sábado','22:30','180','recreación','Jugar Minecraft',''),(8,6,'sábado','08:50','150','deporte','Patinaje sobre Hielo',''),(9,7,'domingo','00:00','1440','otra','Secreto',''),(10,8,'miércoles','10:30','30','recreación','Jugar Ping Pong con la familia','');
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-12 14:01:50

-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (x86_64)
--
-- Host: 127.0.0.1    Database: tarea2
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `foto`
--

DROP TABLE IF EXISTS `foto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ruta_archivo` varchar(300) NOT NULL,
  `nombre_archivo` varchar(300) NOT NULL,
  `actividad_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_foto_actividad1_idx` (`actividad_id`),
  CONSTRAINT `fk_foto_actividad1` FOREIGN KEY (`actividad_id`) REFERENCES `actividad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foto`
--

/*!40000 ALTER TABLE `foto` DISABLE KEYS */;
INSERT INTO `foto` VALUES (1,'static/uploads/2455B834-30BA-4E9A-B017-0A8D6303FD51.JPG','2455B834-30BA-4E9A-B017-0A8D6303FD51.JPG',1),(2,'static/uploads/EB173C02-1EFA-4C1F-949E-F2A01240EF94.JPG','EB173C02-1EFA-4C1F-949E-F2A01240EF94.JPG',1),(3,'static/uploads/5FB2917D-198F-4467-A157-6F64E168F1CA.JPG','5FB2917D-198F-4467-A157-6F64E168F1CA.JPG',2),(4,'static/uploads/C3CF908E-FA7D-4AA5-8DC5-E46E5E7B9621.JPG','C3CF908E-FA7D-4AA5-8DC5-E46E5E7B9621.JPG',2),(5,'static/uploads/E88C87EA-7391-489E-A0D3-882F5F1F8E4F.JPG','E88C87EA-7391-489E-A0D3-882F5F1F8E4F.JPG',3),(6,'static/uploads/B4CBD083-DDA7-4F93-BB67-081DAA8757DA.JPG','B4CBD083-DDA7-4F93-BB67-081DAA8757DA.JPG',3),(7,'static/uploads/50EA8047-28F5-4520-BA30-C923BA760EF4.JPG','50EA8047-28F5-4520-BA30-C923BA760EF4.JPG',3),(8,'static/uploads/1184DBAD-5AF3-48A2-BF80-D0DD80E0CAF0.JPG','1184DBAD-5AF3-48A2-BF80-D0DD80E0CAF0.JPG',4),(9,'static/uploads/6445522D-1E8C-4FB2-9296-DD767FFA042A.JPG','6445522D-1E8C-4FB2-9296-DD767FFA042A.JPG',4),(10,'static/uploads/F580FAAE-4B54-46B9-A284-EEFE3897C831.JPG','F580FAAE-4B54-46B9-A284-EEFE3897C831.JPG',5),(11,'static/uploads/IMG_8354.jpg','IMG_8354.jpg',5),(12,'static/uploads/D41DB1DB-193D-4419-A96F-9ADC530E20F4.JPG','D41DB1DB-193D-4419-A96F-9ADC530E20F4.JPG',6),(13,'static/uploads/99CEAF77-07C9-4D82-9B6F-A180FA486756.JPG','99CEAF77-07C9-4D82-9B6F-A180FA486756.JPG',7),(14,'static/uploads/4430472F-32B2-488C-B514-6956E542084C.JPG','4430472F-32B2-488C-B514-6956E542084C.JPG',8),(15,'static/uploads/E6577783-D171-48D2-AC05-E7C2A89F594A.JPG','E6577783-D171-48D2-AC05-E7C2A89F594A.JPG',8),(16,'static/uploads/EE1B0B75-0762-421A-A064-E0263109A31B.JPG','EE1B0B75-0762-421A-A064-E0263109A31B.JPG',9),(17,'static/uploads/77A69B8B-115A-4299-A4C8-372CF5D110DB.JPG','77A69B8B-115A-4299-A4C8-372CF5D110DB.JPG',9),(18,'static/uploads/EDF25443-D6CF-4DF1-80D2-1AEBB4D2179E.JPG','EDF25443-D6CF-4DF1-80D2-1AEBB4D2179E.JPG',10),(19,'static/uploads/3169CDA7-B64D-475F-A094-B6991F309D8C.JPG','3169CDA7-B64D-475F-A094-B6991F309D8C.JPG',10);
/*!40000 ALTER TABLE `foto` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-12 14:00:39
