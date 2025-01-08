SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `gestion_examenes`;
USE `gestion_examenes`;

CREATE TABLE `area_conocimiento` (
  `ID_Area` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL
);

CREATE TABLE `aulas` (
  `ID_Aula` int(11) NOT NULL,
  `Nombre_Aula` varchar(50) NOT NULL,
  `ID_Edificio` int(11) DEFAULT NULL
);

CREATE TABLE `carrera` (
  `ID_Carrera` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `ID_Departamento` int(11) DEFAULT NULL
);

CREATE TABLE `departamento` (
  `ID_Departamento` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `ID_Area` int(11) DEFAULT NULL
);

CREATE TABLE `dia_asignado` (
  `ID_Dia` int(11) NOT NULL,
  `Dia` varchar(20) NOT NULL
);

CREATE TABLE `edificio` (
  `ID_Edificio` int(11) NOT NULL,
  `Nombre_Edificio` varchar(100) NOT NULL,
  `ID_Area` int(11) DEFAULT NULL
);


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
);

CREATE TABLE `equipos_roles` (
  `ID_Equipo` int(11) NOT NULL,
  `ID_Profesor` int(11) NOT NULL,
  `ID_Rol` int(11) DEFAULT NULL
);

CREATE TABLE `estudiantes` (
  `ID_Estudiante` int(11) NOT NULL,
  `Nombre_Completo` varchar(100) NOT NULL,
  `Carnet` varchar(20) NOT NULL,
  `Genero` enum('Masculino','Femenino') NOT NULL,
  `ID_Localidad` int(11) DEFAULT NULL,
  `ID_Carrera` int(11) DEFAULT NULL,
  `Correo_Institucional` varchar(100) NOT NULL
);

CREATE TABLE `localidades` (
  `ID_Localidad` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL
);

CREATE TABLE `perfil` (
  `ID_Perfil` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
);

CREATE TABLE `profesores` (
  `ID_Profesor` int(11) NOT NULL,
  `Nombre_Completo_P` varchar(100) NOT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Contrasenia` varchar(255) NOT NULL,
  `ID_Departamento` int(11) DEFAULT NULL,
  `ID_Perfil` int(11) DEFAULT NULL
);

CREATE TABLE `rol` (
  `ID_Rol` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
);

CREATE TABLE `tipo_examen` (
  `ID_Tipo_Examen` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
);

ALTER TABLE `area_conocimiento`
  ADD PRIMARY KEY (`ID_Area`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

ALTER TABLE `aulas`
  ADD PRIMARY KEY (`ID_Aula`),
  ADD UNIQUE KEY `Nombre_Aula` (`Nombre_Aula`),
  ADD KEY `ID_Edificio` (`ID_Edificio`);

ALTER TABLE `carrera`
  ADD PRIMARY KEY (`ID_Carrera`),
  ADD UNIQUE KEY `Nombre` (`Nombre`),
  ADD KEY `ID_Departamento` (`ID_Departamento`);

ALTER TABLE `departamento`
  ADD PRIMARY KEY (`ID_Departamento`),
  ADD UNIQUE KEY `Nombre` (`Nombre`),
  ADD KEY `ID_Area` (`ID_Area`);

ALTER TABLE `edificio`
  ADD PRIMARY KEY (`ID_Edificio`);

ALTER TABLE `equipos`
  ADD PRIMARY KEY (`ID_Equipo`);

ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`ID_Estudiante`);

ALTER TABLE `localidades`
  ADD PRIMARY KEY (`ID_Localidad`);

ALTER TABLE `perfil`
  ADD PRIMARY KEY (`ID_Perfil`);

ALTER TABLE `profesores`
  ADD PRIMARY KEY (`ID_Profesor`);

ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID_Rol`);

ALTER TABLE `tipo_examen`
  ADD PRIMARY KEY (`ID_Tipo_Examen`);

ALTER TABLE `area_conocimiento`
  MODIFY `ID_Area` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `aulas`
  MODIFY `ID_Aula` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `carrera`
  MODIFY `ID_Carrera` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `departamento`
  MODIFY `ID_Departamento` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `edificio`
  MODIFY `ID_Edificio` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `equipos`
  MODIFY `ID_Equipo` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `estudiantes`
  MODIFY `ID_Estudiante` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `localidades`
  MODIFY `ID_Localidad` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `perfil`
  MODIFY `ID_Perfil` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `profesores`
  MODIFY `ID_Profesor` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `rol`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tipo_examen`
  MODIFY `ID_Tipo_Examen` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `carrera`
  ADD CONSTRAINT `fk_departamento` FOREIGN KEY (`ID_Departamento`) REFERENCES `departamento` (`ID_Departamento`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;
