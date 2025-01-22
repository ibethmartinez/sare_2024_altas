/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Dao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesPunteo;
import mx.org.inegi.sare_2024_altas_db.utils.utils;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Repository("daoPunteo")
public class DaoPunteo implements InterfacesPunteo {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;

    @Override
    public LinkedHashMap<String, String> punteo(long id_ue, boolean ratificado, String point) {
        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> regresar;
        Object[] arrayParams = new Object[3];
        arrayParams[0] = id_ue;
        arrayParams[1] = ratificado;
        arrayParams[2] = point;

        LinkedHashMap<String, String> resul;
        resul = null;
        final utils util = new utils();

        LinkedHashMap<String, String> resultad = new LinkedHashMap<String, String>();

        sql.append("select cve_ent e03,ce,nom_ent e03n,cve_mun e04,nom_mun e04n,cve_loc e05,nom_loc e05n,cve_ageb e06,x,y,"
                + "cve_mza e07,cveft,nomvial e10,tipovial tipo_e10,cvegeo,cvevial,punteo,mod_cat,imantado,error,tipo_punteo,buffer from ").append(schemaRenemPG).append(".fn_punteo_sare(?,?,?)");

        resul = jdbcTemplate.query(sql.toString(), arrayParams, new ResultSetExtractor<LinkedHashMap<String, String>>() {
            public LinkedHashMap<String, String> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<String[]> fila;

                ResultSetMetaData metaData = rs.getMetaData();
                while (rs.next()) {
                    int numeroColumnas = metaData.getColumnCount();
                    for (int i = 0; i < numeroColumnas; i++) {
                        String columnTypeName = metaData.getColumnTypeName(i + 1);
                        String columna = "";
                        // String columna = metaData.getColumnName(i + 1);
                        if (metaData.getColumnName(i + 1).equalsIgnoreCase("x")) {
                            columna = "x_val";

                        } else if (metaData.getColumnName(i + 1).equalsIgnoreCase("y")) {
                            columna = "y_val";

                        } else {
                            columna = metaData.getColumnName(i + 1);
                        }
                        String valor = rs.getString(metaData.getColumnName(i + 1));

                        resultad.put(columna, valor);
                    }

                }

                return resultad;
            }
        });

        return resul;

    }

}
