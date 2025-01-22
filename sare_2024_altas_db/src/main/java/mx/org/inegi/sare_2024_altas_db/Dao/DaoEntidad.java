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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceEntidad;
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
@Repository("daoEntidad")
public class DaoEntidad implements InterfaceEntidad {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;
    
    @Autowired
    @Qualifier("schemaCarto2022")
    private String schemaCarto2022;
    

    @Override
    public ArrayList<LinkedHashMap> getEdos(String usuario) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final Object[] params = new Object[1];
        params[0] = usuario;
        final utils util = new utils();

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("select ce from ").append(schemaRenemPG).append(".td_usuarios where cuenta=?");

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
    public LinkedHashMap getCatalogoEdos(String ce) {

        StringBuilder sql = new StringBuilder();
        LinkedHashMap resul;
        resul = null;
        String[] estados = new String[1];
        estados[0] = ce;
        final utils util = new utils();
        LinkedHashMap resultad = new LinkedHashMap();
        
        sql.append("select   nomgeo as e03n from ").append(schemaCarto2022).append(".td_entidad te where cve_ent = ?");

        resul = jdbcTemplate.query(sql.toString(),estados, new ResultSetExtractor<LinkedHashMap>() {
            @Override
            public LinkedHashMap extractData(ResultSet rs) throws SQLException, DataAccessException {
                String[] campos;
                LinkedHashMap resultado;
                ResultSetMetaData metaData = rs.getMetaData();
                int numeroColumnas = metaData.getColumnCount();
                campos = util.getStructure(rs);
                resultado = (LinkedHashMap) util.getAllData(rs, campos).get(0);
                return resultado;
            }
        });

        return resul;
    }

     @Override
    public ArrayList<LinkedHashMap> getTcCoestatales() {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        
         final utils util = new utils();
        
        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();
        
            sql.append("select cestatal ,descripcion from ").append(schemaRenemPG).append(".tc_coestatales  where length(dirregional::text )=3 order by descripcion");
       

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
