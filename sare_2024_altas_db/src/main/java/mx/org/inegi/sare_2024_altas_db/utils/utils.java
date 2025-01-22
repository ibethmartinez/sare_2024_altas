/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.utils;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;

/**
 *
 * @author MIGUEL.MUNOZ
 */
public class utils {

    public String[] getStructure(ResultSet rs) throws SQLException {

        ResultSetMetaData meta = rs.getMetaData();
        Integer col = meta.getColumnCount();
        String[] campos = new String[col];

        for (int i = 1; i <= col; i++) {

            campos[i - 1] = meta.getColumnName(i);
        }
        return campos;
    }

    public ArrayList getAllData(ResultSet rs, String[] campos) throws SQLException {

        ResultSetMetaData meta = rs.getMetaData();
        int col = meta.getColumnCount();

        int R = 0;
        int C = 0;
        ArrayList<LinkedHashMap> list = new ArrayList<LinkedHashMap>();

        String campo;
        String valor;
        while (rs.next()) {
            LinkedHashMap<String, String> row = new LinkedHashMap<String, String>();
            R++;
            for (C = 0; C < col; C++) {
                campo = campos[C];
                valor = rs.getString(campos[C]);
                row.put(campo, valor);
            }
            list.add(row);
        }
        return list;
    }

    public String[] getDatatypes(ResultSet rs) throws SQLException {

        ResultSetMetaData meta = rs.getMetaData();
        Integer col = meta.getColumnCount();
        String[] tipos = new String[col];

        for (int i = 1; i <= col; i++) {
            tipos[i - 1] = meta.getColumnTypeName(i);
        }

        return tipos;
    }

    public ArrayList getAllDataAsObjects_ant(ResultSet rs, String[] campos) throws SQLException {

        ResultSetMetaData meta = rs.getMetaData();

        int col = meta.getColumnCount();

        int R = 0;

        int C = 0;

        ArrayList<LinkedHashMap> list = new ArrayList<LinkedHashMap>();

        String campo;

        Object valor;

        String clase = "";

        while (rs.next()) {

            LinkedHashMap<String, Object> row = new LinkedHashMap<String, Object>();

            R++;

            for (C = 0; C < col; C++) {
                campo = campos[C];
                valor = rs.getObject(campos[C]);
                if (valor != null) {
                    clase = valor.getClass().toString();
                }

                if (!clase.contains("") && clase.contains("String")) {

                    valor = rs.getString(campos[C]).toString();

                }

                if (!clase.contains("") && clase.contains("Timestamp")) {

                    valor = rs.getTimestamp(campos[C]).toLocalDateTime().toString();

                }

                if (!clase.contains("") && clase.contains("Date")) {

                    valor = rs.getDate(campos[C]).toLocalDate().toString();

                }

                row.put(campo, valor);

            }

            list.add(row);

        }

        return list;

    }

    public int howMany(ResultSet rs) throws SQLException {
        //ResultSetMetaData meta = rs.getMetaData();   

        int rowCount;

        if (rs.last()) {
            rowCount = rs.getRow();
            rs.beforeFirst();
        } else {
            rowCount = 0;
        }

        return rowCount;
    }

    public ArrayList getAllDataAsObjects(ResultSet rs, String[] campos) throws SQLException {

        ResultSetMetaData meta = rs.getMetaData();
        int col = meta.getColumnCount();

        int R = 0;
        int C = 0;
        ArrayList<LinkedHashMap> list = new ArrayList<LinkedHashMap>();

        String campo;
        Object valor;
        String valorS;
        String clase;
        clase = "";
        String[] tipos = getDatatypes(rs);
        double d; //= Double.parseDouble(s2);

        while (rs.next()) {
            LinkedHashMap<String, Object> row = new LinkedHashMap<String, Object>();
            R++;
            for (C = 0; C < col; C++) {
                valor = null;
                campo = campos[C];
                clase = tipos[C];

                if (clase.contains("String") || clase.contains("text") || clase.contains("varchar") || clase.contains("xml")) {
                    valor = rs.getString(campos[C]);
                }
                if (clase.contains("Timestamp") || clase.contains("timestamp")) {
                    valor = rs.getTimestamp(campos[C]).toLocalDateTime().toString();
                }
                if (clase.equals("Time") || clase.equals("time") || clase.equals("timez")) {
                    valor = rs.getTime(campos[C]).toString();
                }
                if (clase.contains("Date") || clase.contains("date")) {
                    valor = rs.getDate(campos[C]).toLocalDate().toString();
                }
                if (clase.contains("money")) {
                    valor = rs.getString(campos[C]);
                    valorS = valor.toString();
                    valorS = valorS.replaceAll("[$,]", "");
                    valor = Double.parseDouble(valorS);
                }
                if (valor == null) {
                    valor = rs.getObject(campos[C]);
                }

                row.put(campo, valor);
            }
            list.add(row);
        }
        return list;
    }

    public LinkedHashMap<String, String> getAllDataAsObject(ResultSet rs, String[] campos) throws SQLException {

        ResultSetMetaData meta = rs.getMetaData();
        int col = meta.getColumnCount();

        int R = 0;
        int C = 0;
        LinkedHashMap<String, String>  list = new LinkedHashMap<String, String> ();

        String campo;
        Object valor;
        String valorS;
        String clase;
        clase = "";
        String[] tipos = getDatatypes(rs);
        double d; //= Double.parseDouble(s2);

        while (rs.next()) {
            LinkedHashMap<String, Object> row = new LinkedHashMap<String, Object>();
            R++;
            for (C = 0; C < col; C++) {
                valor = null;
                campo = campos[C];
                clase = tipos[C];

                if (clase.contains("String") || clase.contains("text") || clase.contains("varchar") || clase.contains("xml")) {
                    valor = rs.getString(campos[C]);
                }
                if (clase.contains("Timestamp") || clase.contains("timestamp")) {
                    valor = rs.getTimestamp(campos[C]).toLocalDateTime().toString();
                }
                if (clase.equals("Time") || clase.equals("time") || clase.equals("timez")) {
                    valor = rs.getTime(campos[C]).toString();
                }
                if (clase.contains("Date") || clase.contains("date")) {
                    valor = rs.getDate(campos[C]).toLocalDate().toString();
                }
                if (clase.contains("money")) {
                    valor = rs.getString(campos[C]);
                    valorS = valor.toString();
                    valorS = valorS.replaceAll("[$,]", "");
                    valor = Double.parseDouble(valorS);
                }
                if (valor == null) {
                    valor = rs.getObject(campos[C]);
                }

                row.put(campo, valor);
                list.put(campo, valor.toString());
            }
            
        }
        return list;
    }
}
