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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesPiso;
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
@Repository("daoPiso")
public class DaoPiso implements InterfacesPiso{
    
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
    public ArrayList<LinkedHashMap> getCatPiso() {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("select NULL tipo_e12p ,'Seleccione' descripcion union all ( SELECT tipo_e12p ::text, descripcion from  ").append(schemaRenemPG).append(".tc_pisos order by 1::numeric)");

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

    public ArrayList<LinkedHashMap> getCatTipComercio(){
     StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("select NULL tipo_e19 ,'Seleccione' descripcion union all ( SELECT tipo_e19 ::text, descripcion from   ").append(schemaRenemPG).append(".cat_tipo_conjunto_comercial order by 1::numeric)");

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
