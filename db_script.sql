-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema redtires2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema redtires2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `redtires2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `redtires2` ;

-- -----------------------------------------------------
-- Table `redtires2`.`Companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tire_company` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Customers_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Customers_address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `zip_code` VARCHAR(255) NOT NULL,
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC),
  CONSTRAINT `customer_id`
    FOREIGN KEY (`id`)
    REFERENCES `redtires2`.`Customer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Makers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Makers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Models`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Models` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `year` INT NOT NULL,
  `trim` TEXT NOT NULL,
  `model_name` TEXT NOT NULL,
  `maker_id` INT NOT NULL,
  `type` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC),
  INDEX `maker_id` (`maker_id` ASC),
  CONSTRAINT `maker_id`
    FOREIGN KEY (`maker_id`)
    REFERENCES `redtires2`.`Makers` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subtotal` DECIMAL(10,0) NOT NULL,
  `billing_address_id` INT NOT NULL,
  `shipping_address_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC),
  INDEX `billing_Id` (`billing_address_id` ASC),
  INDEX `shipping_id` (`shipping_address_id` ASC),
  CONSTRAINT `billing_Id`
    FOREIGN KEY (`billing_address_id`)
    REFERENCES `redtires2`.`Customers_address` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `shipping_id`
    FOREIGN KEY (`shipping_address_id`)
    REFERENCES `redtires2`.`Customers_address` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Seasons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Seasons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sn_name` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tire_size` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Tires`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Tires` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tire_name` TEXT NOT NULL,
  `sn_id` INT NOT NULL,
  `size_id` INT NOT NULL,
  `company_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC),
  INDEX `Tires_fk2` (`sn_id` ASC),
  INDEX `Tires_fk3` (`size_id` ASC),
  INDEX `company_id` (`company_id` ASC),
  CONSTRAINT `company_id`
    FOREIGN KEY (`company_id`)
    REFERENCES `redtires2`.`Companies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Tires_fk2`
    FOREIGN KEY (`sn_id`)
    REFERENCES `redtires2`.`Seasons` (`id`),
  CONSTRAINT `Tires_fk3`
    FOREIGN KEY (`size_id`)
    REFERENCES `redtires2`.`Sizes` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `redtires2`.`Order_Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redtires2`.`Order_Item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `tire_id` INT NOT NULL,
  `item_quantity` INT NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC),
  INDEX `order_Id` (`order_id` ASC),
  INDEX `tire_id` (`tire_id` ASC),
  CONSTRAINT `order_Id`
    FOREIGN KEY (`order_id`)
    REFERENCES `redtires2`.`Orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `tire_id`
    FOREIGN KEY (`tire_id`)
    REFERENCES `redtires2`.`Tires` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
