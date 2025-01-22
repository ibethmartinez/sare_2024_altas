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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesValidaCp;
import mx.org.inegi.sare_2024_altas_db.utils.utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Repository("daoValidaCp")
public class DaoValidaCp implements InterfacesValidaCp {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;

    @Override
    public ArrayList<LinkedHashMap> getCatalogoCP(String cve_ent) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final Object[] params = new Object[1];
        params[0] = cve_ent;
        final utils util = new utils();

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("SELECT cve_ent,nom_ent,cp_inicial,cp_final FROM ").append(schemaRenemPG).append(".cat_codigo_postal where cve_ent=?");

        resul = jdbcTemplate.query(sql.toString(), params, new ResultSetExtractor<ArrayList<LinkedHashMap>>() {
            @Override
            public ArrayList<LinkedHashMap> extractData(ResultSet rs) throws SQLException, DataAccessException {
                String[] campos;
                ArrayList<LinkedHashMap> resultado;
                ResultSetMetaData metaData = rs.getMetaData();
                int numeroColumnas = metaData.getColumnCount();
                campos = util.getStructure(rs);

                resultado = util.getAllData(rs, campos);
                return resultado;
            }
        });

        return resul;
    }

    //valida que el Codigo Postal sea correcto con la funcion valida_cp_txt, recibe codigo postal y entidad
    @Override
    public ArrayList<LinkedHashMap> getValidaCP(String cp, String cve_ent) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        final Object[] params = new Object[2];
        params[0] = cp;
        params[1] = cve_ent;

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("SELECT  ").append(schemaRenemPG).append(".valida_cp_txt(?,?)");

        resul = jdbcTemplate.query(sql.toString(), params, new ResultSetExtractor<ArrayList<LinkedHashMap>>() {
           @Override
            public ArrayList<LinkedHashMap> extractData(ResultSet rs) throws SQLException, DataAccessException {
                String[] campos;
                ArrayList<LinkedHashMap> resultado;
                ResultSetMetaData metaData = rs.getMetaData();
                int numeroColumnas = metaData.getColumnCount();
                campos = util.getStructure(rs);

                resultado = util.getAllData(rs, campos);
                return resultado;
            }
        });

        return resul;
    }
     @Override
    public ArrayList<LinkedHashMap> getCatTipUniEco() {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("select '0' e23a ,'Seleccione' descripcion union all (SELECT e23a::text, descripcion  from ").append(schemaRenemPG).append(".tc_e23 order by 1::numeric)");

        resul = jdbcTemplate.query(sql.toString(), new ResultSetExtractor<ArrayList<LinkedHashMap>>() {
            @Override
            public ArrayList<LinkedHashMap> extractData(ResultSet rs) throws SQLException, DataAccessException {
                String[] campos;
                ArrayList<LinkedHashMap> resultado;
                ResultSetMetaData metaData = rs.getMetaData();
                int numeroColumnas = metaData.getColumnCount();
                campos = util.getStructure(rs);

                resultado = util.getAllData(rs, campos);
                return resultado;
            }
        });

        return resul;
    }
}
