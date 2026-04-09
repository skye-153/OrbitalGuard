package src;

import java.sql.*;
import java.util.Scanner;

public class DatabaseManager {
    static final String DB_URL = "jdbc:oracle:thin:@localhost:1521:xe";
    static final String USER = "system";
    static final String PASS = "password";

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        try {
            // Register JDBC driver
            Class.forName("oracle.jdbc.driver.OracleDriver");

            // Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            // Execute a functional query (Read Data)
            System.out.println("Creating statement...");
            stmt = conn.createStatement();
            String sql = "SELECT sat_id, sat_name, altitude_km FROM SATELLITES WHERE status = 'ACTIVE'";
            ResultSet rs = stmt.executeQuery(sql);

            System.out.println("--- Active Satellites ---");
            while (rs.next()) {
                String id = rs.getString("sat_id");
                String name = rs.getString("sat_name");
                double alt = rs.getDouble("altitude_km");
                System.out.println("ID: " + id + ", Name: " + name + ", Altitude: " + alt + " km");
            }
            rs.close();

            // Call a PL/SQL Procedure
            System.out.println("\nCalling PL/SQL Procedure UpdateSatelliteStatus...");
            String callSql = "{call UpdateSatelliteStatus(?)}";
            CallableStatement cstmt = conn.prepareCall(callSql);
            cstmt.setString(1, "SAT-1004");
            cstmt.execute();
            System.out.println("Procedure executed successfully for SAT-1004.");
            cstmt.close();

            // Call a PL/SQL Function
            System.out.println("\nCalling PL/SQL Function GetActiveAlertCount...");
            String funcCallSql = "{? = call GetActiveAlertCount(?)}";
            CallableStatement funcStmt = conn.prepareCall(funcCallSql);
            funcStmt.registerOutParameter(1, Types.INTEGER);
            funcStmt.setString(2, "SAT-1004");
            funcStmt.execute();
            int alertCount = funcStmt.getInt(1);
            System.out.println("Active Alert Count for SAT-1004: " + alertCount);
            funcStmt.close();

            stmt.close();
            conn.close();
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        System.out.println("Goodbye!");
    }
}
