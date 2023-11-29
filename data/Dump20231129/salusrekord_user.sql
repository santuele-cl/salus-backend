-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: salusrekord
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `roleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  KEY `User_roleId_fkey` (`roleId`),
  CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('25566c17-d72d-46cc-a572-5a3049d31b5a','asdasdasd','$2b$10$TajYjLJIPm/57tZ6Bdvb2Ox1hX1CPZW0oqqKrCdgGc4c62IEkHpwe','2023-11-24 03:45:37.754','2023-11-24 03:45:37.754',1,'2e8fde9e-0d8d-43c8-96df-3906a4e78596'),('6ac51f3a-0061-4199-91bb-6a0d10fdea33','clyde','$2b$10$4XCyllIFOBh9Y9qm0h3tlug/Os9eisGqYk1tQ9SAgotHm5zuRaNva','2023-11-19 06:30:26.721','2023-11-19 06:30:26.721',1,'bf29d77b-e0b2-47c4-a293-d45f3f393f07'),('94436fe2-68a3-439d-bc70-d96cfb8faabf','lenon','$2b$10$Wh23v5lt8oALHBYrfCFwpuHBuR2s2xSxUDitclLkKqYWuLY/p00uy','2023-11-24 03:57:08.550','2023-11-24 03:57:08.550',1,'bf29d77b-e0b2-47c4-a293-d45f3f393f07'),('b58ec5f1-4833-4e57-aad6-efafbbb35b98','asdasd','$2b$10$KQ6BsdI6WV6u6dhE/p9f9Ov0i3ojCDP5llsV5d5VjUFGxQtX0Fzoe','2023-11-24 03:42:53.341','2023-11-24 03:42:53.341',1,'2e8fde9e-0d8d-43c8-96df-3906a4e78596'),('b7bb0c60-f77f-47f3-a76d-f1f9c64c5f4d','admin','$2b$10$0LF.tWq76dLRfMe73iy87eS9m65t3o9ocBGkI29Th.v613VW1nMOW','2023-11-19 06:15:45.868','2023-11-19 06:15:45.868',1,'2e8fde9e-0d8d-43c8-96df-3906a4e78596');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29 20:53:26
