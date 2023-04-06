SQL QUERYS

CREATE TABLE `BRAND` (
  `idBRAND` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb3_swedish_ci NOT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`idBRAND`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;

CREATE TABLE `PRODUCT` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb3_swedish_ci NOT NULL,
  `idBrand` int NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `unitPrice` varchar(45) COLLATE utf8mb3_swedish_ci NOT NULL DEFAULT '00.00',
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `BRANDS`()
BEGIN
	SELECT * FROM BRAND;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_PRODUCT`(
IN idProduct_P INT
)
BEGIN
	UPDATE Product SET status = 0 WHERE idProduct = idProduct_P;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_BRAND`(
IN name VARCHAR(100)
)
BEGIN
    INSERT INTO BRAND(NAME) VALUES (name);

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_PRODUCT`(
IN name VARCHAR(100),
IN idbrand INT,
IN stock INT,
IN unitPrice DOUBLE
)
BEGIN
	INSERT INTO PRODUCT(Name, idBrand, stock, unitPrice, status) VALUES(name, idbrand, stock, unitPrice, 1);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `PRODUCT_DETAILS`(
IN idProduct_P INT)
BEGIN
	SELECT p.idProduct, p.Name, p.idBrand, b.Name As "Brand", p.stock, p.unitPrice, p.status FROM PRODUCT p INNER JOIN BRAND b ON p.idBrand = b.idBRAND WHERE p.idProduct = idProduct_P AND p.status NOT IN (0);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `PRODUCTS`()
BEGIN
	SELECT p.idProduct, p.Name, p.idBrand, b.Name As "Brand", p.stock, p.unitPrice, p.status FROM PRODUCT p INNER JOIN BRAND b ON p.idBrand = b.idBRAND WHERE p.status NOT IN (0);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_BRAND`(
IN idBrand_p INT,
IN name_p VARCHAR(100),
IN status_p INT
)
BEGIN
	UPDATE BRAND SET name = name_p, status = status_p WHERE idBRAND = idBrand_p;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_PRODUCT`(
IN idProduct_P INT,
IN name VARCHAR(100),
IN idbrand INT,
IN stock INT,
IN unitPrice DOUBLE,
IN status INT
)
BEGIN
	UPDATE PRODUCT SET Name = name, idBrand = idbrand, stock = stock, unitPrice = unitPrice, status = status WHERE idProduct = idProduct_P;
END$$
DELIMITER ;
