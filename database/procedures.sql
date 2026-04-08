-- PL/SQL Procedures, Functions, and Triggers for Final Report

-- 1. PL/SQL PROCEDURE
-- Procedure to update satellite status based on signal quality
CREATE OR REPLACE PROCEDURE UpdateSatelliteStatus (
    p_sat_id IN VARCHAR2
) 
IS
    v_signal_quality NUMBER;
BEGIN
    -- Get current signal quality
    SELECT signal_quality_pct INTO v_signal_quality 
    FROM SATELLITES 
    WHERE sat_id = p_sat_id;
    
    -- Update status based on signal quality
    IF v_signal_quality < 20 THEN
        UPDATE SATELLITES 
        SET status = 'MAINTENANCE' 
        WHERE sat_id = p_sat_id;
        DBMS_OUTPUT.PUT_LINE('Satellite ' || p_sat_id || ' status changed to MAINTENANCE due to low signal.');
    ELSIF v_signal_quality >= 20 THEN
        UPDATE SATELLITES 
        SET status = 'ACTIVE' 
        WHERE sat_id = p_sat_id;
        DBMS_OUTPUT.PUT_LINE('Satellite ' || p_sat_id || ' status is ACTIVE.');
    END IF;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: Satellite ID ' || p_sat_id || ' not found.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('An unexpected error occurred.');
END;
/

-- 2. PL/SQL FUNCTION
-- Function to get the total number of Active open Alerts for a satellite
CREATE OR REPLACE FUNCTION GetActiveAlertCount (
    p_sat_id IN VARCHAR2
) RETURN NUMBER 
IS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) 
    INTO v_count 
    FROM ALERTS 
    WHERE sat_id = p_sat_id AND alert_status = 'OPEN';
    
    RETURN v_count;
END;
/

-- 3. PL/SQL TRIGGER
-- Trigger to validate that Probability is within bounds before INSERT/UPDATE on ALERTS
CREATE OR REPLACE TRIGGER ValidateAlertProbability
BEFORE INSERT OR UPDATE ON ALERTS
FOR EACH ROW
BEGIN
    IF :NEW.conjunction_prob < 0 OR :NEW.conjunction_prob > 1 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Conjunction probability must be between 0 and 1.');
    END IF;
    
    -- Automatically escalate Risk Level if probability is high
    IF :NEW.conjunction_prob > 0.05 THEN
        :NEW.risk_level := 'CRITICAL';
    END IF;
END;
/

-- 4. PL/SQL TRIGGER (Audit/Log Generation)
-- Trigger to automatically create a telemetry log whenever a satellite's altitude is updated
CREATE OR REPLACE TRIGGER LogTelemetryChange
AFTER UPDATE OF altitude_km ON SATELLITES
FOR EACH ROW
BEGIN
    INSERT INTO TELEMETRY_LOGS (sat_id, log_time, recorded_altitude, sync_latency_ms)
    VALUES (:NEW.sat_id, CURRENT_TIMESTAMP, :NEW.altitude_km, 0.02);
END;
/
