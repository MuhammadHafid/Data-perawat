-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2020 at 11:02 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_perawat`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'hafid', 'admin', '2020-03-25 23:38:34', '2020-03-25 23:38:34'),
(2, 'Abah lala', 'admin', '2020-03-27 09:10:18', '2020-03-27 09:10:18'),
(3, 'Muhadi', 'admin', '2020-03-27 09:17:03', '2020-03-27 09:17:03');

-- --------------------------------------------------------

--
-- Table structure for table `perawat`
--

CREATE TABLE `perawat` (
  `id` int(10) UNSIGNED NOT NULL,
  `namaperawat` varchar(191) NOT NULL,
  `tempattanggallahir` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `jobplace` varchar(100) NOT NULL,
  `jumlahperawat` int(10) UNSIGNED DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `perawat`
--

INSERT INTO `perawat` (`id`, `namaperawat`, `tempattanggallahir`, `gender`, `jobplace`, `jumlahperawat`, `created_at`, `updated_at`) VALUES
(1, 'Nicki', 'Ujungpandan, 7-9-1991', 'Perempuan', 'Ruang Anak', 0, '2020-03-25 23:40:18', '2020-03-25 23:40:18'),
(2, 'Diana', 'Jakarta, 7-9-1991', 'Perempuan', 'Ruang Anak', 0, '2020-03-25 23:41:26', '2020-03-25 23:41:26'),
(3, 'Denisa', 'Jakarta, 7-9-1991', 'Perempuan', 'Ruang Anak', 0, '2020-03-25 23:41:53', '2020-03-25 23:41:53'),
(5, 'Hana', 'London, 7-9-1991', 'Perempuan', 'Ruang Mawar', 0, '2020-03-27 09:23:08', '2020-03-27 09:23:08');

-- --------------------------------------------------------

--
-- Table structure for table `perawatjobplace`
--

CREATE TABLE `perawatjobplace` (
  `id` int(10) UNSIGNED NOT NULL,
  `namaruang` varchar(100) NOT NULL,
  `jumlahperawatruang` int(10) UNSIGNED DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `perawatjobplace`
--

INSERT INTO `perawatjobplace` (`id`, `namaruang`, `jumlahperawatruang`, `created_at`) VALUES
(1, 'Ruang Forensik', 6, '2020-03-26 00:01:23'),
(2, 'Ruang Anak', 10, '2020-03-26 00:02:45'),
(4, 'Ruang rindu', 50, '2020-03-27 09:40:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perawat`
--
ALTER TABLE `perawat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perawatjobplace`
--
ALTER TABLE `perawatjobplace`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `perawat`
--
ALTER TABLE `perawat`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `perawatjobplace`
--
ALTER TABLE `perawatjobplace`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
