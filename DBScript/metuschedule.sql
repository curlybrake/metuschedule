-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 17 Eyl 2015, 23:39:02
-- Sunucu sürümü: 5.6.15-log
-- PHP Sürümü: 5.5.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Veritabanı: `metuschedule`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `system`
--

CREATE TABLE IF NOT EXISTS `system` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Key` varchar(100) NOT NULL,
  `Value` text NOT NULL,
  `CreateDate` varchar(100) NOT NULL,
  `UpdateDate` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`,`Key`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Ümit dolu yeni sistemin ilk ana tablosu' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
