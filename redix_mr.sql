-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: redix_rm
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'normal'),(2,'admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `squad`
--

DROP TABLE IF EXISTS `squad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `squad` (
  `sqdID` int NOT NULL AUTO_INCREMENT,
  `sqdName` varchar(255) NOT NULL,
  PRIMARY KEY (`sqdID`),
  UNIQUE KEY `sqdName` (`sqdName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `squad`
--

LOCK TABLES `squad` WRITE;
/*!40000 ALTER TABLE `squad` DISABLE KEYS */;
INSERT INTO `squad` VALUES (1,'FCRM');
/*!40000 ALTER TABLE `squad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usr`
--

DROP TABLE IF EXISTS `usr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usr` (
  `usrID` int NOT NULL AUTO_INCREMENT,
  `usrEmail` varchar(255) NOT NULL,
  `usrName` varchar(255) NOT NULL,
  `usrSurname` varchar(255) NOT NULL,
  `usrPwd` varchar(255) NOT NULL,
  `usrRoleID` int NOT NULL,
  `usrCurrentSqdID` int NOT NULL,
  PRIMARY KEY (`usrID`),
  UNIQUE KEY `usrEmail` (`usrEmail`),
  KEY `usr_role_fk` (`usrRoleID`),
  KEY `usr_squad_fk` (`usrCurrentSqdID`),
  CONSTRAINT `usr_role_fk` FOREIGN KEY (`usrRoleID`) REFERENCES `role` (`roleID`),
  CONSTRAINT `usr_squad_fk` FOREIGN KEY (`usrCurrentSqdID`) REFERENCES `squad` (`sqdID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usr`
--

LOCK TABLES `usr` WRITE;
/*!40000 ALTER TABLE `usr` DISABLE KEYS */;
INSERT INTO `usr` VALUES (1,'aniello.difalco@redix.it','Aniello','Di Falco','5492951099f70bb44ffec92b176d0af7a12aa9e57ea84447ee7fb8fff62e43b0',1,1);
/*!40000 ALTER TABLE `usr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_day`
--

DROP TABLE IF EXISTS `work_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_day` (
  `wrkdID` int NOT NULL AUTO_INCREMENT,
  `wrkdDay` datetime NOT NULL,
  `wrkdTrip` tinyint(1) NOT NULL,
  `wrkdSpecsID` int NOT NULL,
  `wrkdUsrID` int NOT NULL,
  `wrkdActivity` varchar(255) NOT NULL,
  `wrkdActivityType` varchar(255) NOT NULL,
  `wrkdActivityHour` int NOT NULL,
  `wrkdSqdID` int NOT NULL,
  `wrkdCdc` varchar(255) NOT NULL,
  PRIMARY KEY (`wrkdID`),
  KEY `work_day_squad_fk` (`wrkdSqdID`),
  KEY `work_day_specs_fk` (`wrkdSpecsID`),
  KEY `work_day_usr_fk` (`wrkdUsrID`),
  CONSTRAINT `work_day_specs_fk` FOREIGN KEY (`wrkdSpecsID`) REFERENCES `work_specs` (`wrksID`),
  CONSTRAINT `work_day_squad_fk` FOREIGN KEY (`wrkdSqdID`) REFERENCES `squad` (`sqdID`),
  CONSTRAINT `work_day_usr_fk` FOREIGN KEY (`wrkdUsrID`) REFERENCES `usr` (`usrID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_day`
--

LOCK TABLES `work_day` WRITE;
/*!40000 ALTER TABLE `work_day` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_specs`
--

DROP TABLE IF EXISTS `work_specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_specs` (
  `wrksID` int NOT NULL AUTO_INCREMENT,
  `wrksName` varchar(255) NOT NULL,
  PRIMARY KEY (`wrksID`),
  UNIQUE KEY `wrksName` (`wrksName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_specs`
--

LOCK TABLES `work_specs` WRITE;
/*!40000 ALTER TABLE `work_specs` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'redix_rm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-13 23:41:39
