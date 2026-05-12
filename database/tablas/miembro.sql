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
