-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: redix_mr
-- ------------------------------------------------------
-- Server version	8.0.29

--
-- Table structure for table 'squad'
--

DROP TABLE IF EXISTS squad;

CREATE TABLE squad (
  sqdID int NOT NULL AUTO_INCREMENT,
  sqdName varchar(255) NOT NULL,
  PRIMARY KEY (sqdID),
  UNIQUE KEY sqdName (sqdName)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table squad
--

LOCK TABLES squad WRITE;

INSERT INTO squad VALUES (1,'FCRM');
 
UNLOCK TABLES;

--
-- Table structure for table 'role'
--

DROP TABLE IF EXISTS role;

CREATE TABLE role (
  roleID int NOT NULL AUTO_INCREMENT,
  roleName varchar(255) NOT NULL,
  PRIMARY KEY (roleID)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table role
--

LOCK TABLES role WRITE;

INSERT INTO role VALUES (1,'normal'),(2,'admin');

UNLOCK TABLES;

--
-- Table structure for table usr
--

DROP TABLE IF EXISTS usr;
 
CREATE TABLE usr (
  usrID int NOT NULL AUTO_INCREMENT,
  usrEmail varchar(255) NOT NULL,
  usrName varchar(255) NOT NULL,
  usrSurname varchar(255) NOT NULL,
  usrPwd varchar(255) NOT NULL,
  usrRoleID int NOT NULL,
  usrCurrentSqdID int NOT NULL,
  PRIMARY KEY (usrID),
  UNIQUE KEY usrEmail (usrEmail),
  KEY usr_role_fk (usrRoleID),
  KEY usr_squad_fk (usrCurrentSqdID),
  CONSTRAINT usr_role_fk FOREIGN KEY (usrRoleID) REFERENCES role (roleID),
  CONSTRAINT usr_squad_fk FOREIGN KEY (usrCurrentSqdID) REFERENCES squad (sqdID)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table usr
--

LOCK TABLES usr WRITE;

INSERT INTO usr VALUES (1,'aniello.difalco@redix.it','Aniello','Di Falco','5492951099f70bb44ffec92b176d0af7a12aa9e57ea84447ee7fb8fff62e43b0',1,1);

UNLOCK TABLES;

--
-- Table structure for table work_specs
--

DROP TABLE IF EXISTS work_specs;

CREATE TABLE work_specs (
  wrksID int NOT NULL AUTO_INCREMENT,
  wrksName varchar(255) NOT NULL,
  PRIMARY KEY (wrksID),
  UNIQUE KEY wrksName (wrksName)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table work_specs
--

LOCK TABLES work_specs WRITE;

UNLOCK TABLES;

--
-- Table structure for table 'work_day'
--

DROP TABLE IF EXISTS work_day;

CREATE TABLE work_day (
  wrkdID int NOT NULL AUTO_INCREMENT,
  wrkdDay datetime NOT NULL,
  wrkdTrip tinyint(1) NOT NULL,
  wrkdSpecsID int NOT NULL,
  wrkdUsrID int NOT NULL,
  wrkdActivity varchar(255) NOT NULL,
  wrkdActivityType varchar(255) NOT NULL,
  wrkdActivityHour int NOT NULL,
  wrkdSqdID int NOT NULL,
  wrkdCdc varchar(255) NOT NULL,
  PRIMARY KEY (wrkdID),
  KEY work_day_squad_fk (wrkdSqdID),
  KEY work_day_specs_fk (wrkdSpecsID),
  KEY work_day_usr_fk (wrkdUsrID),
  CONSTRAINT work_day_specs_fk FOREIGN KEY (wrkdSpecsID) REFERENCES work_specs (wrksID),
  CONSTRAINT work_day_squad_fk FOREIGN KEY (wrkdSqdID) REFERENCES squad (sqdID),
  CONSTRAINT work_day_usr_fk FOREIGN KEY (wrkdUsrID) REFERENCES usr (usrID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table work_day
--

LOCK TABLES work_day WRITE;

UNLOCK TABLES;


-- Dump completed on 2022-04-29 18:16:54
