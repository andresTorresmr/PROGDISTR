-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: piaprogdistr
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_swedish_ci NOT NULL,
  `idBrand` int NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `unitPrice` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_swedish_ci NOT NULL DEFAULT '00.00',
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idProduct`),
  KEY `idBrand` (`idBrand`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idBrand`) REFERENCES `brand` (`idBRAND`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (49,'martillo',19,10,'110',0),(50,'Sierra de inglete',20,1,'1500',0),(51,'Rotomartillo 20v Brushless',20,2,'1550',0),(52,'Rotomartillo 20v Brushless',20,1,'1550',2),(53,'Maquina de Soldar Inverter',29,1,'2200',1),(54,'Sierra Caladora',20,1,'950',1),(55,'Lijadora Orbital',20,0,'950',1),(56,'Rotomartillo UH700',25,0,'1400',1),(57,'Atornillador Inalambrico',22,2,'2000',1),(58,'Multimetro 177 ',26,1,'1550',1),(59,'Sierra Inalambrica 20v',20,2,'1750',1),(60,'Sierra de mano',20,5,'1900',1),(61,'Bateria 4AH 20v',20,-33347688,'1000',2),(62,'Taladro 12v',22,5,'900',1),(63,'Sierra de inglete',24,5,'1500',1),(64,'Taladro Rotomartillo',23,3,'1000',1),(65,'Bateria 20v',21,2,'900',1),(66,'Desatornillador 20v',21,2,'1100',1),(67,'Rompedor SDS PLUS',25,2,'1300',1),(68,'Amperimetro 373',26,3,'1650',1),(69,'Cargador 20v',28,5,'350',1),(70,'Sierra circular p/ azulejos',28,4,'1000',1),(71,'Cargador Rapid Charge',20,5,'750',1),(72,'Desatornillador de Impacto',20,2,'1550',1),(73,'Cargador 20v',20,2,'650',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-24 10:46:09
