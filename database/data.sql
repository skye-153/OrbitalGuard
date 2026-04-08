-- DML for Orbital Guard Database (Sample Data)

-- Insert SATELLITES
INSERT INTO SATELLITES (sat_id, sat_name, altitude_km, speed_kmh, status, signal_quality_pct)
VALUES ('SAT-1004', 'STARLINK-1422', 400.50, '27,500', 'ACTIVE', 99.4);

INSERT INTO SATELLITES (sat_id, sat_name, altitude_km, speed_kmh, status, signal_quality_pct)
VALUES ('SAT-1032', 'IRIDIUM-32', 780.00, '26,800', 'ACTIVE', 95.0);

INSERT INTO SATELLITES (sat_id, sat_name, altitude_km, speed_kmh, status, signal_quality_pct)
VALUES ('SAT-2041', 'COSMOS-2251', 790.00, '26,750', 'DECOMMISSIONED', 0.0);

INSERT INTO SATELLITES (sat_id, sat_name, altitude_km, speed_kmh, status, signal_quality_pct)
VALUES ('SAT-3055', 'GPS-III-SV04', 20200.00, '14,000', 'ACTIVE', 98.7);

INSERT INTO SATELLITES (sat_id, sat_name, altitude_km, speed_kmh, status, signal_quality_pct)
VALUES ('SAT-4999', 'HUBBLE', 540.00, '27,300', 'MAINTENANCE', 85.5);

-- Insert DEBRIS
INSERT INTO DEBRIS (debris_id, origin_source, altitude_km, speed_kmh, status)
VALUES ('DEB-45621', 'FENGYUN-1C_FRAGMENT', 400.45, '28,000', 'UNCONTROLLED');

INSERT INTO DEBRIS (debris_id, origin_source, altitude_km, speed_kmh, status)
VALUES ('DEB-25412', 'COSMOS-2251_DEBRIS', 780.10, '28,100', 'UNCONTROLLED');

INSERT INTO DEBRIS (debris_id, origin_source, altitude_km, speed_kmh, status)
VALUES ('DEB-23561', 'ARIANE_ROCKET_BODY', 790.05, '28,150', 'UNCONTROLLED');

INSERT INTO DEBRIS (debris_id, origin_source, altitude_km, speed_kmh, status)
VALUES ('DEB-46825', 'UNKNOWN_FRAGMENT', 20200.10, '14,500', 'UNCONTROLLED');

-- Insert ALERTS
INSERT INTO ALERTS (alert_id, sat_id, debris_id, risk_level, conjunction_prob, time_to_conjunction, alert_status)
VALUES ('ALT-001', 'SAT-1004', 'DEB-45621', 'HIGH', 0.0012, '14m 22s', 'OPEN');

INSERT INTO ALERTS (alert_id, sat_id, debris_id, risk_level, conjunction_prob, time_to_conjunction, alert_status)
VALUES ('ALT-002', 'SAT-1032', 'DEB-25412', 'MEDIUM', 0.000045, '2h 45m', 'OPEN');

INSERT INTO ALERTS (alert_id, sat_id, debris_id, risk_level, conjunction_prob, time_to_conjunction, alert_status)
VALUES ('ALT-003', 'SAT-2041', 'DEB-23561', 'LOW', 0.0000011, '5h 12m', 'OPEN');

INSERT INTO ALERTS (alert_id, sat_id, debris_id, risk_level, conjunction_prob, time_to_conjunction, alert_status)
VALUES ('ALT-004', 'SAT-3055', 'DEB-46825', 'LOW', 0.0000000092, '12h 04m', 'RESOLVED');

-- Insert TELEMETRY_LOGS
INSERT INTO TELEMETRY_LOGS (sat_id, log_time, recorded_altitude, sync_latency_ms)
VALUES ('SAT-1004', CURRENT_TIMESTAMP, 400.50, 0.04);

INSERT INTO TELEMETRY_LOGS (sat_id, log_time, recorded_altitude, sync_latency_ms)
VALUES ('SAT-1032', CURRENT_TIMESTAMP, 780.00, 0.05);

INSERT INTO TELEMETRY_LOGS (sat_id, log_time, recorded_altitude, sync_latency_ms)
VALUES ('SAT-3055', CURRENT_TIMESTAMP, 20200.00, 0.12);

COMMIT;
