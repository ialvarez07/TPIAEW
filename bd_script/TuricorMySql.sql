DROP DATABASE IF EXISTS Turicor;
CREATE DATABASE Turicor CHARACTER SET utf8;
USE Turicor;
--
-- Table structure for table `Cliente`
--

CREATE TABLE IF NOT EXISTS `Cliente` (
`id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `nro_documento` varchar(20) NOT NULL
) ENGINE=InnoDB;

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
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Table structure for table `Vendedor`
--

CREATE TABLE IF NOT EXISTS `Vendedor` (
`id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB;

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

