DROP TABLE IF EXISTS `patient`;
DROP TABLE IF EXISTS `doctor`;
DROP TABLE IF EXISTS `hospital`;
DROP TABLE IF EXISTS `healthclub`;
DROP TABLE IF EXISTS `employer`;
DROP TABLE IF EXISTS `insurance`;
DROP TABLE IF EXISTS `patientdoctor`;
DROP TABLE IF EXISTS `patientemployer`;
DROP TABLE IF EXISTS `patienthealthclub`;
DROP TABLE IF EXISTS `patienthospital`;
DROP TABLE IF EXISTS `patientinsurance`;
DROP TABLE IF EXISTS `doctorhospital`;

CREATE TABLE `patient` (
  `patientID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,	
  `data` varchar(5000) NOT NULL,
  PRIMARY KEY (`patientID`)
);


CREATE TABLE `doctor` (
  `doctorID` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `birthDate` varchar(45) NOT NULL,
  `address` varchar(200) NOT NULL,
  `mobileNum` varchar(15) NOT NULL,
  PRIMARY KEY (`doctorID`)
);

CREATE TABLE `hospital` (
  `hospitalID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`hospitalID`)
);

CREATE TABLE `healthclub` (
  `clubID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`clubID`)
);

CREATE TABLE `employer` (
  `employerID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`employerID`)
);

CREATE TABLE `insurance` (
  `insuranceID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`insuranceID`)
);

CREATE TABLE `patientdoctor` (
  `patientID` int(11) NOT NULL,
  `doctorID` int(11) NOT NULL,
  PRIMARY KEY (`patientID`,`doctorID`),
  KEY `doctor_idx` (`doctorID`),
  CONSTRAINT `doctorpatient` FOREIGN KEY (`doctorID`) REFERENCES `doctor` (`doctorID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `patientdoctor` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `patientemployer` (
  `patientID` int(11) NOT NULL,
  `employerID` int(11) NOT NULL,
  PRIMARY KEY (`patientID`,`employerID`),
  KEY `employerpatient_idx` (`employerID`),
  CONSTRAINT `employerpatient` FOREIGN KEY (`employerID`) REFERENCES `employer` (`employerID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `patientemployer` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `patienthealthclub` (
  `patientID` int(11) NOT NULL,
  `clubID` int(11) NOT NULL,
  `data` varchar(200) NOT NULL,
  PRIMARY KEY (`patientID`,`clubID`),
  KEY `hospital_idx` (`clubID`),
  KEY `patient_idx` (`patientID`),
  CONSTRAINT `club` FOREIGN KEY (`clubID`) REFERENCES `healthclub` (`clubID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `patientclub` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `patienthospital` (
  `patientID` int(11) NOT NULL,
  `hospitalID` int(11) NOT NULL,
  `Data` varchar(200) NOT NULL,
  PRIMARY KEY (`patientID`,`hospitalID`),
  KEY `hospital_idx` (`hospitalID`),
  CONSTRAINT `hospital` FOREIGN KEY (`hospitalID`) REFERENCES `hospital` (`hospitalID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `patient` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `patientinsurance` (
  `patientID` int(11) NOT NULL,
  `insuranceID` int(11) NOT NULL,
  PRIMARY KEY (`patientID`,`insuranceID`),
  KEY `insurancepatient_idx` (`insuranceID`),
  CONSTRAINT `insurancepatient` FOREIGN KEY (`insuranceID`) REFERENCES `insurance` (`insuranceID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `patientinsurance` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `doctorhospital` (
  `doctorID` int(11) NOT NULL,
  `hospitalID` int(11) NOT NULL,
  PRIMARY KEY (`doctorID`,`hospitalID`),
  KEY `hospitaldoctor_idx` (`hospitalID`),
  CONSTRAINT `doctorhospital` FOREIGN KEY (`doctorID`) REFERENCES `doctor` (`doctorID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `hospitaldoctor` FOREIGN KEY (`hospitalID`) REFERENCES `hospital` (`hospitalID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
