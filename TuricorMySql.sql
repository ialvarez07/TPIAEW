-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 12, 2017 at 10:10 AM
-- Server version: 5.5.53-0+deb8u1
-- PHP Version: 5.6.29-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Turicor`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cliente`
--

CREATE TABLE IF NOT EXISTS `Cliente` (
`id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `nro_documento` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Reserva`
--

CREATE TABLE IF NOT EXISTS `Reserva` (
`id` int(11) NOT NULL,
  `codigo_reserva` varchar(50) NOT NULL,
  `fecha_reserva` varchar(50) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `costo` decimal(8,2) NOT NULL,
  `precio_venta` decimal(8,2) NOT NULL,
  `id_vehiculo_ciudad` int(11) NOT NULL,
  `id_ciudad` int(11) NOT NULL,
  `id_pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Vendedor`
--

CREATE TABLE IF NOT EXISTS `Vendedor` (
`id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cliente`
--
ALTER TABLE `Cliente`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Reserva`
--
ALTER TABLE `Reserva`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_vendedor_id` (`id_vendedor`), ADD KEY `fk_cliente_id` (`id_cliente`);

--
-- Indexes for table `Vendedor`
--
ALTER TABLE `Vendedor`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cliente`
--
ALTER TABLE `Cliente`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Reserva`
--
ALTER TABLE `Reserva`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Vendedor`
--
ALTER TABLE `Vendedor`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Reserva`
--
ALTER TABLE `Reserva`
ADD CONSTRAINT `fk_vendedor_id` FOREIGN KEY (`id_vendedor`) REFERENCES `Vendedor` (`id`),
ADD CONSTRAINT `fk_cliente_id` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
