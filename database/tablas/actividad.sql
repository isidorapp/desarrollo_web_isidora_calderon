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
