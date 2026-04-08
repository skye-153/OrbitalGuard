-- List of SQL Queries for Final Report

-- 1. Basic Queries

-- a. Retrieve all active satellites
SELECT sat_id, sat_name, altitude_km 
FROM SATELLITES 
WHERE status = 'ACTIVE';

-- b. Retrieve all uncontrolled debris
SELECT debris_id, origin_source, altitude_km 
FROM DEBRIS 
WHERE status = 'UNCONTROLLED';

-- c. View all HIGH risk alerts
SELECT alert_id, sat_id, debris_id, time_to_conjunction 
FROM ALERTS 
WHERE risk_level = 'HIGH';

-- 2. Complex Queries

-- a. Find satellites that have active OPEN alerts along with the debris info (JOIN)
SELECT s.sat_name, s.altitude_km, a.risk_level, d.origin_source
FROM SATELLITES s
JOIN ALERTS a ON s.sat_id = a.sat_id
JOIN DEBRIS d ON a.debris_id = d.debris_id
WHERE a.alert_status = 'OPEN';

-- b. Count the number of active alerts for each risk level (GROUP BY, Aggregate)
SELECT risk_level, COUNT(*) as alert_count
FROM ALERTS
WHERE alert_status = 'OPEN'
GROUP BY risk_level
ORDER BY alert_count DESC;

-- c. Find satellites that have more than 1 open alert (HAVING)
SELECT s.sat_name, COUNT(a.alert_id) as total_alerts
FROM SATELLITES s
JOIN ALERTS a ON s.sat_id = a.sat_id
WHERE a.alert_status = 'OPEN'
GROUP BY s.sat_name
HAVING COUNT(a.alert_id) > 1;

-- d. Find satellites whose altitude is lower than the average altitude of all active satellites (SUBQUERY)
SELECT sat_name, altitude_km 
FROM SATELLITES
WHERE status = 'ACTIVE' 
AND altitude_km < (SELECT AVG(altitude_km) FROM SATELLITES WHERE status = 'ACTIVE');

-- e. Retrieve latest telemetry data for a specific satellite using a correlated subquery
SELECT t1.sat_id, s.sat_name, t1.recorded_altitude, t1.log_time
FROM TELEMETRY_LOGS t1
JOIN SATELLITES s ON t1.sat_id = s.sat_id
WHERE t1.log_time = (
    SELECT MAX(t2.log_time) 
    FROM TELEMETRY_LOGS t2 
    WHERE t2.sat_id = t1.sat_id
);
