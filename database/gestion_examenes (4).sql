-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-01-2025 a las 16:50:19
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
(8, 'Ciencias Agrarias Veterinarias'),
(7, 'Ciencias Económicas y Empresariales'),
(3, 'Ciencias Educación y Humanidades'),
(4, 'Ciencias Jurídicas y Sociales'),
(2, 'Ciencias Medicas'),
(5, 'Ciencias Químicas'),
(1, 'Ciencias Y Tecnologia'),
(6, 'Odontología');

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
(1, 'Sala de Maestria', 3),
(2, 'Laboratorio Hardware', 3),
(3, 'Laboratorio 2', 1),
(4, 'A1', 4);

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
(1, 'Ingenieria en sistemas', 1),
(2, 'Ingenieria Telematica', 1),
(3, 'Medicina Veterinaria', 2);

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
(1, 'Computacion', 1),
(2, 'Medicina', 8),
(3, 'Matematica - Estadistica', 1),
(4, 'Trabajo Social', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dia_asignado`
--

CREATE TABLE `dia_asignado` (
  `ID_Dia` int(11) NOT NULL,
  `Dia` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'ATM', 1),
(2, 'Basico', 1),
(3, 'Cids', 1),
(4, 'Principal', 8);

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
(2, 'Investigacion', 1, 3, 4, '2025-01-24', NULL, NULL, '12:00:00', '13:30:00', 2, 1, 90, 1, NULL, NULL, NULL, 1),
(4, 'Tecnologías Emergentes en la Educación: Oportunidades y Retos', 1, 2, 3, '2025-01-23', NULL, NULL, '12:00:00', '13:00:00', 1, 2, NULL, 1, NULL, NULL, NULL, 1),
(5, 'Investigacion Documental acerca de la importancia de la fisioterapia', 5, NULL, NULL, '2025-01-15', '2025-01-15', NULL, '12:00:00', '13:00:00', 4, 1, NULL, 6, NULL, NULL, NULL, 3),
(15, 'Tecnologías Emergentes en la Educación: Oportunidades y Retos', 4, NULL, NULL, '2025-01-18', '2025-01-18', NULL, '12:00:00', '14:00:00', 2, 1, 90, NULL, NULL, NULL, 5, 1);

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
(2, 'Eliezer Valentin Chavarria Hernandez', '20-00612-0', 'Masculino', 1, 1, 'Eliezer@gmail.com'),
(3, 'Erick Alberto Salgado Suazo', '20-00312-0', 'Masculino', 1, 1, 'Erick@gmail.com'),
(4, 'Yasmir Alexander Martinez', '20-00213-0', 'Masculino', 1, 1, 'Yasmir@gmail.com'),
(5, 'Arizaid', '20-02313-6', 'Femenino', 1, 3, 'Arizaid@gmail.com');

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
(4, 'Chichigalpa'),
(5, 'Siuna'),
(6, 'Jinotega');

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
(1, 'Administrador'),
(2, 'Secretario'),
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
(1, 'Francisco Rafael Zepeda Coronados', 'Francisco@gmail.com', '12345', 1, 3),
(2, 'David Antonio Maradiaga Gutierrez', 'David@gmail.com', '23456', 1, 3),
(3, 'William Noel Martinez Orozco', 'William@gmail.com', '8765475', 1, 3),
(4, 'Denis Leopoldo Espinoza Hernández', 'Denis@gmail.com', '858757685', 1, 3),
(5, 'Rina del Pilar Arauz Altamirano', 'Rina@gmail.com', '657457', 1, 3),
(6, 'Merlin', 'Merlin@gmail.com', '123123', 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `ID_Rol` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Tesis'),
(2, 'Grado');

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
  MODIFY `ID_Area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `aulas`
--
ALTER TABLE `aulas`
  MODIFY `ID_Aula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `ID_Carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `ID_Departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `edificio`
--
ALTER TABLE `edificio`
  MODIFY `ID_Edificio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `ID_Equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `ID_Estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `ID_Localidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `ID_Perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `ID_Profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  MODIFY `ID_Tipo_Examen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
