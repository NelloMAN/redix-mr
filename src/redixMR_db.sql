  CREATE TABLE 'usr' (
	'usrID' INT NOT NULL AUTO_INCREMENT,
	'usrEmail' varchar(255) NOT NULL UNIQUE,
	'usrPwd' varchar(255) NOT NULL,
	'usrRoleID' varchar(255) NOT NULL,
	PRIMARY KEY ('usrID')
);

CREATE TABLE 'role' (
	'roldID' INT NOT NULL AUTO_INCREMENT,
	'roleName' varchar(255) NOT NULL,
	PRIMARY KEY ('roldID')
);

ALTER TABLE 'usr' ADD CONSTRAINT 'usr_fk_role' FOREIGN KEY ('usrRoleID') REFERENCES 'role'('roldID');


