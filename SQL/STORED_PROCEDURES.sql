DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADDSELL`(
in dataP varchar(10000),
in idMethodP INT,
in totalP Decimal(2)
)
BEGIN
	INSERT INTO SELL( data, total, idMethod) VALUES ( dataP, totalP, idMethodP);
    SELECT s.idSell, s.data, m.name, s.total FROM SELL s INNER JOIN Method m ON s.idMethod = m.idMethod WHERE s.idSell = (SELECT LAST_INSERT_ID());
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `BRAND_DETAILS`(IN `idBrand_P` INT)
BEGIN
	SELECT idBrand, name, status FROM brand WHERE status NOT IN (0) AND idBrand = idBrand_P;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `BRANDS`()
BEGIN
	SELECT * FROM BRAND WHERE status NOT IN (0);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_BRAND`(IN `idBrand_P` INT)
BEGIN
 UPDATE BRAND SET status = 0 WHERE idBrand = idBrand_P;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_METHOD`(
in idMethodP INT
)
BEGIN
	UPDATE METHOD SET status = 0 WHERE idMethod = idMethodP;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_PRODUCT`(IN `idProduct_P` INT)
BEGIN
	UPDATE Product SET status = 0 WHERE idProduct = idProduct_P;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_BRAND`(IN `name` VARCHAR(100))
BEGIN
    INSERT INTO BRAND(NAME) VALUES (name);
    SELECT * FROM BRAND WHERE idBrand = (SELECT LAST_INSERT_ID());
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_METHOD`(
in nameP VARCHAR(100)
)
BEGIN
	INSERT INTO METHOD(NAME) VALUES (nameP);
    SELECT * FROM METHOD WHERE idMethod = (SELECT LAST_INSERT_ID());
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_PRODUCT`(IN `name` VARCHAR(100), IN `idbrand` INT, IN `stock` INT, IN `unitPrice` DOUBLE)
BEGIN
	INSERT INTO PRODUCT(Name, idBrand, stock, unitPrice, status) VALUES(name, idbrand, stock, unitPrice, 1);
    SELECT p.idProduct, p.Name, p.idBrand, b.Name As "Brand", p.stock, p.unitPrice, p.status FROM PRODUCT p INNER JOIN BRAND b ON p.idBrand = b.idBRAND WHERE p.idProduct = (SELECT LAST_INSERT_ID());
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_SELL`(
in dataP JSON,
in idMethodP INT,
in totalP double
)
BEGIN
	DECLARE total_temp_rows INT DEFAULT 0;
    DECLARE initial_row_start INT DEFAULT 0; 
    DECLARE quantity_product_sell INT DEFAULT 0;
    DECLARE id_product_delete INT DEFAULT 0;
	INSERT INTO Sell(idMethod, total) VALUES (idMethodP, totalP );
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_data SELECT * FROM JSON_TABLE(dataP,"$[*]" columns(idProduct int path "$.idProduct", quantity int path "$.quantity", unitPrice double path "$.unitPrice" ))as je;	
    
    
    
    INSERT INTO sellData( idSell, idProduct, quantity, unitPrice) SELECT (select idSell from sell where idSell = (select LAST_INSERT_ID())), idProduct, quantity, unitPrice FROM temp_data;
    
    SELECT * FROM temp_data;
    SELECT COUNT(idProduct) FROM temp_data INTO total_temp_rows;
    
    SELECT COUNT(idProduct) FROM temp_data;
    
	WHILE initial_row_start < total_temp_rows DO
		SELECT idProduct FROM temp_data LIMIT initial_row_start,1 into id_product_delete ;
		SELECT quantity FROM temp_data WHERE idProduct = id_product_delete INTO quantity_product_sell;
        
        UPDATE product SET stock = (stock - quantity_product_sell) WHERE idProduct = id_product_delete;
          SET initial_row_start = initial_row_start + 1;
	END WHILE;
    
    SELECT s.idSell, s.idMethod, m.name, s.total, s.dateCreated FROM SELL s INNER JOIN Method m ON s.idMethod = m.idMethod WHERE s.idSell = (SELECT last_insert_id());
    DROP TABLE temp_data;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `METHOD`()
BEGIN
	SELECT * FROM METHOD WHERE STATUS NOT IN (0);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_procedure`(
IN `idMethodP` INT,
 IN `nameP` VARCHAR(100), 
 IN `statusP` INT
 )
BEGIN
	UPDATE METHOD SET name = nameP, status = statusP WHERE idMethod = idMethodP;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `PRODUCT_DETAILS`(IN `idProduct_P` INT)
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `SELLS`()
BEGIN
	SELECT s.idSell, s.idMethod, m.name, s.total, s.dateCreated FROM SELL s INNER JOIN Method m ON s.idMethod = m.idMethod ORDER BY s.dateCreated DESC LIMIT 5;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_BRAND`(IN `idBrand_p` INT, IN `name_p` VARCHAR(100), IN `status_p` INT)
BEGIN
	UPDATE BRAND SET name = name_p, status = status_p WHERE idBRAND = idBrand_p;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_METHOD`(
IN `idMethodP` INT,
 IN `nameP` VARCHAR(100), 
 IN `statusP` INT
 )
BEGIN
	UPDATE METHOD SET name = nameP, status = statusP WHERE idMethod = idMethodP;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_PRODUCT`(IN `idProduct_P` INT, IN `name` VARCHAR(100), IN `idbrand` INT, IN `stock` INT, IN `unitPrice` DOUBLE, IN `status` INT)
BEGIN
	UPDATE PRODUCT SET Name = name, idBrand = idbrand, stock = stock, unitPrice = unitPrice, status = status WHERE idProduct = idProduct_P;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Monthly_Report`(
in month_p INT
)
BEGIN
	
    SELECT Day(dateCreated)as day, SUM(total) as total FROM sell WHERE MONTH(dateCreated) = month_p GROUP BY day;
END$$
DELIMITER ;
