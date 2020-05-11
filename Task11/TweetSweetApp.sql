-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: SweetTweetApp
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `HASHTAGS`
--

DROP TABLE IF EXISTS `HASHTAGS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HASHTAGS` (
  `TAG_ID` int NOT NULL AUTO_INCREMENT,
  `HASHTAG` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`TAG_ID`),
  UNIQUE KEY `HASHTAG` (`HASHTAG`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HASHTAGS`
--

LOCK TABLES `HASHTAGS` WRITE;
/*!40000 ALTER TABLE `HASHTAGS` DISABLE KEYS */;
INSERT INTO `HASHTAGS` VALUES (39,'#america'),(12,'#blues'),(16,'#cat'),(14,'#challenge'),(24,'#dinner'),(18,'#energy'),(35,'#enjoy'),(6,'#fear'),(21,'#folowwers'),(37,'#friendly'),(17,'#friends'),(15,'#game'),(22,'#guests'),(30,'#health'),(10,'#heartbreak'),(25,'#heroes'),(13,'#history'),(2,'#ideal'),(26,'#infinite'),(29,'#join'),(34,'#king'),(19,'#love'),(33,'#lyrics'),(28,'#meditation'),(23,'#mouse'),(3,'#moving'),(11,'#music'),(20,'#my'),(9,'#optimism'),(31,'#power'),(32,'#reflections'),(27,'#singapore'),(38,'#sweety'),(36,'#thinkaboutit'),(8,'#TimePasses'),(5,'#travelling'),(7,'#understand'),(1,'#work'),(4,'#world');
/*!40000 ALTER TABLE `HASHTAGS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIKES`
--

DROP TABLE IF EXISTS `LIKES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LIKES` (
  `POST_ID` int NOT NULL,
  `USER_ID` int unsigned NOT NULL,
  PRIMARY KEY (`USER_ID`,`POST_ID`),
  KEY `POST_ID` (`POST_ID`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`USER_ID`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`POST_ID`) REFERENCES `POST` (`POST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIKES`
--

LOCK TABLES `LIKES` WRITE;
/*!40000 ALTER TABLE `LIKES` DISABLE KEYS */;
INSERT INTO `LIKES` VALUES (1,7),(1,8),(1,9),(1,10),(1,11),(2,9),(2,21),(2,22),(2,23),(3,5),(3,8),(3,9),(3,19),(3,22),(3,26),(4,5),(4,6),(4,8),(4,9),(4,19),(4,21),(5,8),(5,9),(5,12),(5,13),(5,14),(6,5),(6,6),(6,8),(6,9),(6,12),(7,9),(7,15),(7,16),(7,17),(7,18),(8,8),(8,9),(8,20),(9,5),(9,9),(9,20),(9,28),(10,5),(10,6),(10,8),(10,9),(10,21),(11,1),(11,4),(11,5),(11,6),(11,8),(12,1),(12,5),(12,6),(12,9),(12,12),(13,5),(13,6),(13,8),(13,9),(14,5),(14,8),(14,9),(14,21),(15,1),(15,5),(15,6),(15,12),(16,5),(16,6),(16,8),(16,9),(16,29),(17,6),(17,8),(17,12),(17,19),(18,5),(18,6),(18,8),(18,9),(18,19),(18,21),(19,3),(19,6),(19,8),(19,9),(19,12),(19,19),(20,5),(20,6),(20,8),(20,9),(20,12);
/*!40000 ALTER TABLE `LIKES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POST`
--

DROP TABLE IF EXISTS `POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `POST` (
  `POST_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int unsigned DEFAULT NULL,
  `CREATED_AT` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `DESCRIPTION` varchar(280) DEFAULT NULL,
  `PHOTO_LINK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`POST_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POST`
--

LOCK TABLES `POST` WRITE;
/*!40000 ALTER TABLE `POST` DISABLE KEYS */;
INSERT INTO `POST` VALUES (1,3,'2020-02-14 17:18:02','Work definitely comes first. I expect the same of my ideal other half too.',NULL),(2,3,'2020-02-16 22:14:58','When time passes, the breakup that tore my heart apart\n When time passes, the young memories that kicked away at the blankets\n It gets forgotten, gets forgotten, it just passes right by\n It gets forgotten, gets forgotten, but back then I thought that was everything',NULL),(3,3,'2020-02-19 13:35:23','I think I fell in love with Singapore.',NULL),(4,3,'2020-02-20 23:48:05','When I was young, even though I received so much love,\n I used to pay attention to people who disliked me. That\"s why my lyrics were so sharp and dark.',NULL),(5,20,'2020-02-14 21:56:21','I haven\'t found anywhere in the world where I want to be all the time. The best of my life is the moving. I look forward to going.',NULL),(6,20,'2020-02-20 18:23:44','I just think the most difficult thing to displace is privilege.',NULL),(7,19,'2020-02-15 16:56:23','Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',NULL),(8,1,'2020-02-16 23:23:23','Blues is a music genre and musical form which was originated in the Deep South of the United States around the 1870s by African-Americans from roots in African musical traditions, African-American work songs, and spirituals.',NULL),(9,1,'2020-02-21 07:32:15','The best known blues musician today is B.B. King. His fame is well-deserved.\n Born in Indianola, Mississippi in 1925, he earned the nickname \"B.B.\" (\"Blues boy\")\n while playing on radio programs in Memphis, Tennessee.','https://img.stereo.ru/article-covers/2018/cd94b715ef23dafa68adf62f2127b260.jpg'),(10,1,'2020-02-22 20:40:00','America’s music culture would be incomplete without\n blues music. Thought it was created in the early decades of the 20th century,\n blues music has had a huge influence on American popular music\n up to the present days.',NULL),(11,24,'2020-02-17 08:14:12','I want to launch a new challenge. Who is with me?',NULL),(12,24,'2020-02-18 23:23:45','We are the heroes of our time!',NULL),(13,4,'2020-02-17 12:37:29','Let\'s play a game?',NULL),(14,4,'2020-02-18 12:21:42','I\'ve got guests for dinner!','https://avatars.mds.yandex.net/get-pdb/964102/52b4f656-7bc2-4aaa-8eb9-88ca255d1b35/s600'),(15,4,'2020-02-20 16:33:16','I cooked dinner from jars of food t hat I opened myself.',NULL),(16,4,'2020-02-22 15:34:10','Kids, let\'s all get along!',NULL),(17,25,'2020-02-17 15:36:48','Block out all the negative energy, and just love',NULL),(18,25,'2020-02-18 10:48:36','Everyone is beautiful, everyone is perfect, and everyone is lovely.',NULL),(19,25,'2020-02-19 15:19:35','Meditation is a great way to keep my body well-centered while juggling shooting schedules and recording sessions.',NULL),(20,30,'2020-02-21 10:14:00','There is nothing in the world so irresistibly contagious as laughter and good humor.',NULL);
/*!40000 ALTER TABLE `POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POST_TAGS`
--

DROP TABLE IF EXISTS `POST_TAGS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `POST_TAGS` (
  `TAG_ID` int NOT NULL,
  `POST_ID` int NOT NULL,
  PRIMARY KEY (`POST_ID`,`TAG_ID`),
  KEY `TAG_ID` (`TAG_ID`),
  CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`TAG_ID`) REFERENCES `HASHTAGS` (`TAG_ID`),
  CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`POST_ID`) REFERENCES `POST` (`POST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POST_TAGS`
--

LOCK TABLES `POST_TAGS` WRITE;
/*!40000 ALTER TABLE `POST_TAGS` DISABLE KEYS */;
INSERT INTO `POST_TAGS` VALUES (1,1),(2,1),(3,5),(4,5),(5,3),(5,5),(6,7),(7,7),(8,2),(9,2),(10,2),(11,8),(11,10),(12,8),(12,9),(12,10),(13,8),(14,11),(15,13),(16,13),(16,16),(17,13),(18,17),(19,4),(19,17),(19,18),(20,18),(21,18),(22,14),(23,14),(24,14),(24,15),(25,12),(26,12),(27,3),(28,19),(29,19),(30,19),(31,15),(32,6),(32,20),(33,4),(34,9),(35,9),(36,20),(37,16),(38,16),(39,10);
/*!40000 ALTER TABLE `POST_TAGS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `USER_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(35) NOT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_ID_UNIQUE` (`USER_ID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'Alexander T'),(25,'Ariana G'),(10,'Britney Spears'),(6,'Dean W'),(30,'Dickens'),(9,'Egor B'),(24,'Grif Hero'),(3,'IU'),(11,'J Lo'),(29,'Kinnoske'),(18,'Leonardo'),(4,'Leopold'),(22,'Li Min Ho'),(12,'Lola'),(21,'Lola Skin'),(16,'Lolita'),(19,'Marie Curie'),(14,'Masha U'),(17,'Meril'),(15,'Pasha'),(8,'Paula'),(5,'Sam W'),(20,'Sean C'),(7,'Tolik'),(26,'Vlad F'),(28,'Vlad K'),(13,'Vlada'),(23,'Vova K');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-11  2:23:35
