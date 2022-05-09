insert into work_specs (wrksName) values ('UFFICIO');
insert into work_specs (wrksName) values ('MALATTIA');
insert into work_specs (wrksName) values ('FERIE');
insert into work_specs (wrksName) values ('TRASFERTA');
insert into work_specs (wrksName) values ('SMARTWORKING');

alter table work_day drop column wrkdTrip;

-- Aprile
insert into work_day (wrkdDay, wrkdSpecsID, wrkdUsrID, wrkdActivity, wrkdActivityType, wrkdActivityHour, wrkdSqdID, wrkdCdc)
values 
('2022-04-01', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-04', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-05', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-06', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-07', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-08', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-11', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-12', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-13', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-14', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-15', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-19', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-20', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-21', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-22', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-26', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-27', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-28', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-04-29', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, '');

-- Maggio
insert into work_day (wrkdDay, wrkdSpecsID, wrkdUsrID, wrkdActivity, wrkdActivityType, wrkdActivityHour, wrkdSqdID, wrkdCdc)
values 
('2022-05-01', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-04', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-05', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-06', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-07', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-08', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-11', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-12', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-13', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-14', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-15', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-19', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-20', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-21', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-22', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-26', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-27', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-28', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, ''),
('2022-05-29', 1, 1, 'KYC Program FCRM',  'STP SIMULATION and DQ CHECKS', 8, 1, '');