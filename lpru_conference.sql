-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2018 at 08:33 AM
-- Server version: 5.7.21-log
-- PHP Version: 7.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lpru_conference`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(3) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_log` text,
  `time_stamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `course_nameEng` varchar(224) NOT NULL,
  `course_status` int(3) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `course_log`, `time_stamp`, `course_nameEng`, `course_status`) VALUES
(1, 'ภาษาไทย', NULL, '2018-03-14 03:57:29', 'Thai language', 1),
(3, 'ภาษาอังกฤษ เพื่อการทำงาน', NULL, '2018-03-14 03:57:29', 'English for working purpose', 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_exam`
--

CREATE TABLE `course_exam` (
  `exam_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer1` varchar(128) NOT NULL,
  `answer2` varchar(128) NOT NULL,
  `answer3` varchar(128) NOT NULL,
  `answer4` varchar(128) NOT NULL,
  `answer_real` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `course_order`
--

CREATE TABLE `course_order` (
  `order_id` int(3) NOT NULL,
  `per_id` int(3) NOT NULL,
  `registration_id` int(3) NOT NULL,
  `course_id` int(3) NOT NULL,
  `cert_id` int(3) NOT NULL,
  `time_stamp` datetime NOT NULL,
  `order_log` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `operation_room`
--

CREATE TABLE `operation_room` (
  `room_id` int(1) NOT NULL,
  `room_name` varchar(64) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `operation_room`
--

INSERT INTO `operation_room` (`room_id`, `room_name`) VALUES
(1, 'กาแล 4');

-- --------------------------------------------------------

--
-- Table structure for table `period`
--

CREATE TABLE `period` (
  `per_id` int(3) NOT NULL,
  `per_start` date NOT NULL,
  `per_end` date NOT NULL,
  `per_time_start` time NOT NULL,
  `per_time_end` time NOT NULL,
  `per_price` int(11) NOT NULL,
  `per_quota` int(3) NOT NULL,
  `course_id` int(3) NOT NULL,
  `room_id` int(3) NOT NULL,
  `per_status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='สำหรับการเปิด การอบรม';

--
-- Dumping data for table `period`
--

INSERT INTO `period` (`per_id`, `per_start`, `per_end`, `per_time_start`, `per_time_end`, `per_price`, `per_quota`, `course_id`, `room_id`, `per_status`) VALUES
(1, '2018-04-06', '2018-04-06', '15:30:00', '16:30:00', 500, 30, 1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `user_group` int(11) NOT NULL,
  `prefix` varchar(6) NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `last_name` varchar(120) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `address` varchar(120) NOT NULL,
  `city` varchar(55) NOT NULL,
  `district` varchar(55) NOT NULL,
  `province` varchar(55) NOT NULL,
  `email` varchar(125) NOT NULL,
  `major` varchar(120) DEFAULT NULL,
  `affiliation` int(2) DEFAULT NULL,
  `company` varchar(125) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `user_group`, `prefix`, `first_name`, `last_name`, `gender`, `address`, `city`, `district`, `province`, `email`, `major`, `affiliation`, `company`, `username`, `password`) VALUES
(10, 2, 'นาย', 'ชยากร', 'แก้ววงศ์', 'ชาย', '806 moo 3 wiang', 'chiang sean', 'chiang sean', 'chiang rai', 'whitecat.chayakorn@gmail.com', 'วิศวกรรมซอฟต์แวร์', NULL, 'มหาวิทยาลัยราชภัฏลำปาง', 'admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
(15, 0, 'นาย', 'ชุติพงษ์', 'หาญยุทธ', 'male', '-', '-', '-', '-', '-', NULL, NULL, 'มหาวิทยาลัยราชภัฏลำปาง', '57122660107', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `operation_room`
--
ALTER TABLE `operation_room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `period`
--
ALTER TABLE `period`
  ADD PRIMARY KEY (`per_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `operation_room`
--
ALTER TABLE `operation_room`
  MODIFY `room_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `period`
--
ALTER TABLE `period`
  MODIFY `per_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
