CREATE DATABASE REDIX_MR;

USE REDIX_MR;
  
CREATE TABLE 'usr' (
	'usrID' INT NOT NULL AUTO_INCREMENT,
	'usrEmail' varchar(255) NOT NULL UNIQUE,
	'usrName' varchar(255) NOT NULL,
	'usrPwd' varchar(255) NOT NULL,
	'usrRoleID' varchar(255) NOT NULL,
	'usrCurrentSqdID' INT NOT NULL,
	PRIMARY KEY ('usrID')
);

CREATE TABLE 'role' (
	'roldID' INT NOT NULL AUTO_INCREMENT,
	'roleName' varchar(255) NOT NULL,
	PRIMARY KEY ('roldID')
);

CREATE TABLE 'work_day' (
	'wrkdID' INT NOT NULL AUTO_INCREMENT,
	'wrkdDay' DATETIME NOT NULL,
	'wrkdTrip' BOOLEAN NOT NULL,
	'wrkdSpecsID' INT NOT NULL,
	'wrkdUsrID' INT NOT NULL,
	'wrkdActivity' varchar(255) NOT NULL,
	'wrkdActivityType' varchar(255) NOT NULL,
	'wrkdActivityHour' INT NOT NULL,
	'wrkdSqdID' INT NOT NULL,
	'wrkdCdc' varchar(255) NOT NULL,
	PRIMARY KEY ('wrkdID')
);

CREATE TABLE 'work_specs' (
	'wrksID' INT NOT NULL AUTO_INCREMENT,
	'wrksName' INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY ('wrksID')
);

CREATE TABLE 'squad' (
	'sqdID' INT NOT NULL AUTO_INCREMENT,
	'sqdName' varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY ('sqdID')
);

ALTER TABLE 'usr' ADD CONSTRAINT 'usr_fk0' FOREIGN KEY ('usrRoleID') REFERENCES 'role'('roldID');

ALTER TABLE 'usr' ADD CONSTRAINT 'usr_fk1' FOREIGN KEY ('usrCurrentSqdID') REFERENCES 'squad'('sqdID');

ALTER TABLE 'work_day' ADD CONSTRAINT 'work_day_fk0' FOREIGN KEY ('wrkdSpecsID') REFERENCES 'work_specs'('wrksID');

ALTER TABLE 'work_day' ADD CONSTRAINT 'work_day_fk1' FOREIGN KEY ('wrkdUsrID') REFERENCES 'usr'('usrID');

ALTER TABLE 'work_day' ADD CONSTRAINT 'work_day_fk2' FOREIGN KEY ('wrkdSqdID') REFERENCES 'squad'('sqdID');





