-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2024 a las 06:29:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_examenes2`
--
CREATE DATABASE IF NOT EXISTS `gestion_examenes2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gestion_examenes2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area_conocimiento`
--

CREATE TABLE `area_conocimiento` (
  `ID_Area` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `area_conocimiento`
--

INSERT INTO `area_conocimiento` VALUES(5, 'Agrarias y Veterinarias');
INSERT INTO `area_conocimiento` VALUES(1, 'Ciencias Y Tecnologia');
INSERT INTO `area_conocimiento` VALUES(8, 'Economicas y Empresariales');
INSERT INTO `area_conocimiento` VALUES(6, 'Educacion y Humanidades');
INSERT INTO `area_conocimiento` VALUES(7, 'Medica');
INSERT INTO `area_conocimiento` VALUES(4, 'Odontologia');
INSERT INTO `area_conocimiento` VALUES(3, 'Quimica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aulas`
--

CREATE TABLE `aulas` (
  `ID_Aula` int(11) NOT NULL,
  `Nombre_Aula` varchar(50) NOT NULL,
  `ID_Edificio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aulas`
--

INSERT INTO `aulas` VALUES(9, 'A6', 99);
INSERT INTO `aulas` VALUES(10, 'Laboratorio Cisco', 98);
INSERT INTO `aulas` VALUES(12, 'Laboratorio Hardware', 97);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `ID_Carrera` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `ID_Departamento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` VALUES(29, 'Ingenieria en sistemas de informacion', 33);
INSERT INTO `carrera` VALUES(30, 'Telematica', 33);
INSERT INTO `carrera` VALUES(36, 'Medicina Veterinaria', 37);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `ID_Departamento` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `ID_Area` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` VALUES(33, 'Computacion', 1);
INSERT INTO `departamento` VALUES(34, 'Estadistica - Matematica', 1);
INSERT INTO `departamento` VALUES(37, 'Veterinaria', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dia_asignado`
--

CREATE TABLE `dia_asignado` (
  `ID_Dia` int(11) NOT NULL,
  `Dia` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dia_asignado`
--

INSERT INTO `dia_asignado` VALUES(1, 'Lunes');
INSERT INTO `dia_asignado` VALUES(2, 'Martes');
INSERT INTO `dia_asignado` VALUES(3, 'Miercoles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificio`
--

CREATE TABLE `edificio` (
  `ID_Edificio` int(11) NOT NULL,
  `Nombre_Edificio` varchar(100) NOT NULL,
  `ID_Area` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `edificio`
--

INSERT INTO `edificio` VALUES(97, 'Cids', 1);
INSERT INTO `edificio` VALUES(98, 'Basico', 1);
INSERT INTO `edificio` VALUES(99, 'ATM', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `ID_Equipo` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Integrante1` int(11) DEFAULT NULL,
  `Integrante2` int(11) DEFAULT NULL,
  `Integrante3` int(11) DEFAULT NULL,
  `Fecha_Asignada` date DEFAULT NULL,
  `Fecha_Aprobada` date DEFAULT NULL,
  `ID_Dia` int(11) DEFAULT NULL,
  `Hora_Inicio` time DEFAULT NULL,
  `Hora_Fin` time DEFAULT NULL,
  `ID_Aula` int(11) DEFAULT NULL,
  `ID_Tipo_Examen` int(11) DEFAULT NULL,
  `Calificacion` int(11) DEFAULT NULL,
  `Tutor_ID` int(11) DEFAULT NULL,
  `Juez1_ID` int(11) DEFAULT NULL,
  `Juez2_ID` int(11) DEFAULT NULL,
  `Juez3_ID` int(11) DEFAULT NULL,
  `ID_Carrera` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` VALUES(1, 'Servicio Web para el colegio La Salle', 1, 1, 1, '2024-12-04', '2024-09-11', 2, '07:00:00', '08:00:00', 3, 1, 80, 4, 1, 2, 3, 1);
INSERT INTO `equipos` VALUES(3, 'Sistema react', 3, 4, NULL, '2024-09-21', NULL, NULL, NULL, NULL, 1, NULL, 80, 3, 1, NULL, NULL, 1);
INSERT INTO `equipos` VALUES(4, 'aplicacion android de contabilidad', 3, NULL, NULL, '2024-09-05', NULL, NULL, NULL, NULL, 2, NULL, NULL, 3, 2, NULL, NULL, 1);
INSERT INTO `equipos` VALUES(5, 'aplicacion windows form', 4, NULL, NULL, '2024-09-09', '2024-09-11', NULL, NULL, NULL, 3, 2, NULL, 4, 2, NULL, NULL, 1);
INSERT INTO `equipos` VALUES(6, 'Servicio de camaras con IA en Banco ', 3, NULL, NULL, '2024-08-28', NULL, NULL, NULL, NULL, 2, NULL, NULL, 4, 4, NULL, NULL, 1);
INSERT INTO `equipos` VALUES(7, 'Software de tienda en linea', 1, NULL, NULL, '2024-09-14', NULL, NULL, NULL, NULL, 3, 1, NULL, 4, 2, NULL, NULL, 1);
INSERT INTO `equipos` VALUES(8, 'Reparacion de computadoras y laptops a domicilio', 3, NULL, NULL, '2024-09-08', NULL, NULL, NULL, NULL, 2, NULL, NULL, 2, 1, NULL, NULL, 1);
INSERT INTO `equipos` VALUES(29, 'Tecnologías Emergentes en la Educación: Oportunidades y Retos', 1, 2, 3, '2024-12-19', NULL, NULL, '12:00:00', '14:00:00', 4, 2, NULL, 2, 3, 4, 1, 1);
INSERT INTO `equipos` VALUES(30, 'Investigacion', 1, 3, NULL, '2024-12-06', NULL, NULL, '12:00:00', '15:00:00', 1, 1, NULL, 4, 3, 5, 1, 1);
INSERT INTO `equipos` VALUES(31, 'Investigacion Documental acerca de la importancia de la fisioterapia', 13, 2, NULL, '2024-12-12', NULL, NULL, '12:00:00', '14:00:00', 12, 2, NULL, 16, 17, 18, NULL, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_roles`
--

CREATE TABLE `equipos_roles` (
  `ID_Equipo` int(11) NOT NULL,
  `ID_Profesor` int(11) NOT NULL,
  `ID_Rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `ID_Estudiante` int(11) NOT NULL,
  `Nombre_Completo` varchar(100) NOT NULL,
  `Carnet` varchar(20) NOT NULL,
  `Genero` enum('Masculino','Femenino') NOT NULL,
  `ID_Localidad` int(11) DEFAULT NULL,
  `ID_Carrera` int(11) DEFAULT NULL,
  `Correo_Institucional` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` VALUES(2, 'Mynor Miguel Aruaz Rugama', '20-96973-0', 'Masculino', 1, 29, 'Mynor@gmail.com');
INSERT INTO `estudiantes` VALUES(13, 'Edgard Jose Tellez Munguia', '20-00613-3', 'Masculino', 1, 29, 'Edgarda@gmail.com');
INSERT INTO `estudiantes` VALUES(14, 'Andrea Sofia Martinez Plata', '20-00613-6', 'Masculino', 1, 29, 'Andrea@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE `localidades` (
  `ID_Localidad` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localidades`
--

INSERT INTO `localidades` VALUES(1, 'Leon');
INSERT INTO `localidades` VALUES(2, 'Chinandega');
INSERT INTO `localidades` VALUES(3, 'Managua');
INSERT INTO `localidades` VALUES(4, 'Masaya');
INSERT INTO `localidades` VALUES(21, 'Managua');
INSERT INTO `localidades` VALUES(28, 'Jinotega');
INSERT INTO `localidades` VALUES(30, 'Carazo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `ID_Perfil` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` VALUES(1, 'Admin');
INSERT INTO `perfil` VALUES(2, 'Secretario');
INSERT INTO `perfil` VALUES(3, 'Profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `ID_Profesor` int(11) NOT NULL,
  `Nombre_Completo_P` varchar(100) NOT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Contrasenia` varchar(255) NOT NULL,
  `ID_Departamento` int(11) DEFAULT NULL,
  `ID_Perfil` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` VALUES(16, 'WILLIAM NOEL MARTINEZ OROZCO', 'William@gmail.com', '1234', 33, 3);
INSERT INTO `profesores` VALUES(17, 'Francisco Rafael Zepeda Coronadoa', 'Francisco@gmail.com', '1234', 33, 3);
INSERT INTO `profesores` VALUES(18, 'Rina del Pilar Arauz Altamirano', 'Rina@gmail.com', '1234', 33, 3);
INSERT INTO `profesores` VALUES(19, 'David Antonio Maradiaga Gutierrez', 'David@gmail.com', '12345', 33, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `ID_Rol` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` VALUES(1, 'Jurado');
INSERT INTO `rol` VALUES(2, 'Tutor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_examen`
--

CREATE TABLE `tipo_examen` (
  `ID_Tipo_Examen` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_examen`
--

INSERT INTO `tipo_examen` VALUES(1, 'Grado');
INSERT INTO `tipo_examen` VALUES(2, 'Tesis');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area_conocimiento`
--
ALTER TABLE `area_conocimiento`
  ADD PRIMARY KEY (`ID_Area`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

--
-- Indices de la tabla `aulas`
--
ALTER TABLE `aulas`
  ADD PRIMARY KEY (`ID_Aula`),
  ADD UNIQUE KEY `Nombre_Aula` (`Nombre_Aula`),
  ADD KEY `ID_Edificio` (`ID_Edificio`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`ID_Carrera`),
  ADD UNIQUE KEY `Nombre` (`Nombre`),
  ADD KEY `ID_Departamento` (`ID_Departamento`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`ID_Departamento`),
  ADD UNIQUE KEY `Nombre` (`Nombre`),
  ADD KEY `ID_Area` (`ID_Area`);

--
-- Indices de la tabla `edificio`
--
ALTER TABLE `edificio`
  ADD PRIMARY KEY (`ID_Edificio`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`ID_Equipo`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`ID_Estudiante`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`ID_Localidad`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`ID_Perfil`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`ID_Profesor`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID_Rol`);

--
-- Indices de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  ADD PRIMARY KEY (`ID_Tipo_Examen`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area_conocimiento`
--
ALTER TABLE `area_conocimiento`
  MODIFY `ID_Area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `aulas`
--
ALTER TABLE `aulas`
  MODIFY `ID_Aula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `ID_Carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `ID_Departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `edificio`
--
ALTER TABLE `edificio`
  MODIFY `ID_Edificio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `ID_Equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `ID_Estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `ID_Localidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `ID_Perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `ID_Profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  MODIFY `ID_Tipo_Examen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD CONSTRAINT `fk_departamento` FOREIGN KEY (`ID_Departamento`) REFERENCES `departamento` (`ID_Departamento`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
