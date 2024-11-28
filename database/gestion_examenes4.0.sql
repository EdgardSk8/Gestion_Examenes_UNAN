-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2024 a las 23:54:09
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
-- Base de datos: `gestion_examenes`
--
CREATE DATABASE IF NOT EXISTS `gestion_examenes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gestion_examenes`;

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

INSERT INTO `area_conocimiento` (`ID_Area`, `Nombre`) VALUES
(5, 'Agrarias y Veterinarias'),
(1, 'Ciencias Y Tecnologia'),
(8, 'Economicas y Empresariales'),
(6, 'Educacion y Humanidades'),
(7, 'Medica'),
(4, 'Odontologia'),
(3, 'Quimica');

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

INSERT INTO `aulas` (`ID_Aula`, `Nombre_Aula`, `ID_Edificio`) VALUES
(77, 'A3', 97),
(80, 'A4', 99),
(81, 'A5', 99);

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

INSERT INTO `carrera` (`ID_Carrera`, `Nombre`, `ID_Departamento`) VALUES
(29, 'Ingenieria en sistemas', 33),
(30, 'telematica', 33);

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

INSERT INTO `departamento` (`ID_Departamento`, `Nombre`, `ID_Area`) VALUES
(33, 'Computacion', 1),
(34, 'Estadistica - Matematica', 1);

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

INSERT INTO `dia_asignado` (`ID_Dia`, `Dia`) VALUES
(1, 'Lunes'),
(2, 'Martes'),
(3, 'Miercoles');

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

INSERT INTO `edificio` (`ID_Edificio`, `Nombre_Edificio`, `ID_Area`) VALUES
(97, 'Cids', 8),
(98, 'basico', 1),
(99, 'ATM', 1);

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

INSERT INTO `equipos` (`ID_Equipo`, `Titulo`, `Integrante1`, `Integrante2`, `Integrante3`, `Fecha_Asignada`, `Fecha_Aprobada`, `ID_Dia`, `Hora_Inicio`, `Hora_Fin`, `ID_Aula`, `ID_Tipo_Examen`, `Calificacion`, `Tutor_ID`, `Juez1_ID`, `Juez2_ID`, `Juez3_ID`, `ID_Carrera`) VALUES
(1, 'Servicio Web para el colegio La Salle', 1, 1, 1, '2024-11-15', '2024-09-11', 2, '07:00:00', '08:00:00', 3, 1, 80, 4, 1, 2, 3, 1),
(3, 'Sistema react', 3, 4, NULL, '2024-09-21', NULL, NULL, NULL, NULL, 1, NULL, 80, 3, 1, NULL, NULL, 1),
(4, 'aplicacion android de contabilidad', 3, NULL, NULL, '2024-09-05', NULL, NULL, NULL, NULL, 2, NULL, NULL, 3, 2, NULL, NULL, 1),
(5, 'aplicacion windows form', 4, NULL, NULL, '2024-09-09', '2024-09-11', NULL, NULL, NULL, 3, 2, NULL, 4, 2, NULL, NULL, 1),
(6, 'Servicio de camaras con IA en Banco ', 3, NULL, NULL, '2024-08-28', NULL, NULL, NULL, NULL, 2, NULL, NULL, 4, 4, NULL, NULL, 1),
(7, 'Software de tienda en linea', 1, NULL, NULL, '2024-09-14', NULL, NULL, NULL, NULL, 3, 1, NULL, 4, 2, NULL, NULL, 1),
(8, 'Reparacion de computadoras y laptops a domicilio', 3, NULL, NULL, '2024-09-08', NULL, NULL, NULL, NULL, 2, NULL, NULL, 2, 1, NULL, NULL, 1),
(29, 'Tecnologías Emergentes en la Educación: Oportunidades y Retos', 1, 2, 3, '2024-11-21', NULL, NULL, '12:00:00', '14:00:00', 4, 2, NULL, 2, 3, 4, 1, 1),
(30, 'Investigacion', 1, 3, NULL, '2024-11-22', NULL, NULL, '12:00:00', '15:00:00', 1, 1, NULL, 4, 3, 5, 1, 1);

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

INSERT INTO `estudiantes` (`ID_Estudiante`, `Nombre_Completo`, `Carnet`, `Genero`, `ID_Localidad`, `ID_Carrera`, `Correo_Institucional`) VALUES
(1, 'Edgard Jose Tellez Munguia', '20-00613-0', 'Masculino', 1, 1, 'Edgard@gmail.com'),
(2, 'Mynor Miguel Aruaz Rugama', '20-96973-0', 'Masculino', 1, 1, 'Mynor@gmail.com'),
(3, 'Erick Alberto Salgado Suazo', '20-43424-0', 'Masculino', 1, 1, 'Erick@gmail.com'),
(4, 'Eliezer Valentin Chavarria Hernandez', '20-04643-0', 'Masculino', 1, 1, 'Eliezer@gmail.com');

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

INSERT INTO `localidades` (`ID_Localidad`, `Nombre`) VALUES
(1, 'Leon'),
(2, 'Chinandega'),
(3, 'Managua'),
(4, 'Masaya'),
(21, 'Managua');

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

INSERT INTO `perfil` (`ID_Perfil`, `Nombre`) VALUES
(1, 'Admin'),
(2, 'Chinandega'),
(3, 'Profesor');

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

INSERT INTO `profesores` (`ID_Profesor`, `Nombre_Completo_P`, `Correo`, `Contrasenia`, `ID_Departamento`, `ID_Perfil`) VALUES
(1, 'WILLIAM NOEL MARTINEZ OROZCO', 'William@gmail.com', '', 1, 3),
(2, 'Jerson Pastrán', 'Gerson@gmail.com', '', 1, 3),
(3, 'David Antonio Maradiaga Gutierrez', 'David@gmail.com', '', 1, 3),
(4, 'Francisco Rafael Zepeda Coronado', 'Francisco@gmail.com', '', 1, 2),
(5, 'Juan Carlos Leyton Briones', 'Juan@gmail.com', '', 1, 3),
(16, 'hnnnnnnnnnn', 'aax@gmail.com', 'nmnm', 6, 1);

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

INSERT INTO `rol` (`ID_Rol`, `Nombre`) VALUES
(1, 'Jurado'),
(2, 'Tutor');

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

INSERT INTO `tipo_examen` (`ID_Tipo_Examen`, `Nombre`) VALUES
(1, 'Ciencias Y Tecnologia'),
(2, 'Tesis');

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
  MODIFY `ID_Aula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `ID_Carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `ID_Departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `edificio`
--
ALTER TABLE `edificio`
  MODIFY `ID_Edificio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `ID_Equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `ID_Estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `ID_Localidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `ID_Perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `ID_Profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
