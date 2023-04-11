-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2023 a las 04:24:19
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `programacion`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `BRANDS` ()   BEGIN
	SELECT * FROM BRAND WHERE status NOT IN (0);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BRAND_DETAILS` (IN `idBrand_P` INT)   BEGIN
	SELECT idBrand, name, status FROM brand WHERE status NOT IN (0) AND idBrand = idBrand_P;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_BRAND` (IN `idBrand_P` INT)   BEGIN
 UPDATE BRAND SET status = 0 WHERE idBrand = idBrand_P;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_PRODUCT` (IN `idProduct_P` INT)   BEGIN
	UPDATE Product SET status = 0 WHERE idProduct = idProduct_P;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_BRAND` (IN `name` VARCHAR(100))   BEGIN
    INSERT INTO BRAND(NAME) VALUES (name);
    SELECT * FROM BRAND WHERE idBrand = (SELECT LAST_INSERT_ID());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_PRODUCT` (IN `name` VARCHAR(100), IN `idbrand` INT, IN `stock` INT, IN `unitPrice` DOUBLE)   BEGIN
	INSERT INTO PRODUCT(Name, idBrand, stock, unitPrice, status) VALUES(name, idbrand, stock, unitPrice, 1);
    SELECT p.idProduct, p.Name, p.idBrand, b.Name As "Brand", p.stock, p.unitPrice, p.status FROM PRODUCT p INNER JOIN BRAND b ON p.idBrand = b.idBRAND WHERE p.idProduct = (SELECT LAST_INSERT_ID());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PRODUCTS` ()   BEGIN
	SELECT p.idProduct, p.Name, p.idBrand, b.Name As "Brand", p.stock, p.unitPrice, p.status FROM PRODUCT p INNER JOIN BRAND b ON p.idBrand = b.idBRAND WHERE p.status NOT IN (0);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PRODUCT_DETAILS` (IN `idProduct_P` INT)   BEGIN
	SELECT p.idProduct, p.Name, p.idBrand, b.Name As "Brand", p.stock, p.unitPrice, p.status FROM PRODUCT p INNER JOIN BRAND b ON p.idBrand = b.idBRAND WHERE p.idProduct = idProduct_P AND p.status NOT IN (0);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_BRAND` (IN `idBrand_p` INT, IN `name_p` VARCHAR(100), IN `status_p` INT)   BEGIN
	UPDATE BRAND SET name = name_p, status = status_p WHERE idBRAND = idBrand_p;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_PRODUCT` (IN `idProduct_P` INT, IN `name` VARCHAR(100), IN `idbrand` INT, IN `stock` INT, IN `unitPrice` DOUBLE, IN `status` INT)   BEGIN
	UPDATE PRODUCT SET Name = name, idBrand = idbrand, stock = stock, unitPrice = unitPrice, status = status WHERE idProduct = idProduct_P;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brand`
--

CREATE TABLE `brand` (
  `idBRAND` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8_swedish_ci NOT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `brand`
--

INSERT INTO `brand` (`idBRAND`, `Name`, `status`) VALUES
(1, 'Truper', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `idProduct` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8_swedish_ci NOT NULL,
  `idBrand` int(11) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `unitPrice` varchar(45) COLLATE utf8_swedish_ci NOT NULL DEFAULT '00.00',
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`idBRAND`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `idBrand` (`idBrand`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brand`
--
ALTER TABLE `brand`
  MODIFY `idBRAND` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idBrand`) REFERENCES `brand` (`idBRAND`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
