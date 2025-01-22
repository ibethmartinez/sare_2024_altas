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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesVialidad;
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
@Repository("daoVialidad")
public class DaoVialidad implements InterfacesVialidad {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;

    @Autowired
    @Qualifier("schemaCarto2022")
    private String schemaCarto2022;

    public ArrayList<LinkedHashMap> getCatVialidad() {
        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("select NULL cve_vialidad ,'Seleccione' descripcion union all ( SELECT cve_vialidad ::text, descripcion from   ").append(schemaRenemPG).append(".tc_vialidades order by 1::numeric)");

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

    public LinkedHashMap getFiltroCatVialidad(String tipo_e10) {
        StringBuilder sql = new StringBuilder();
        LinkedHashMap resul;
        resul = null;
        final utils util = new utils();
        Object[] arrayParams = new Object[1];
        arrayParams[0] = tipo_e10;

        LinkedHashMap resultad = new LinkedHashMap();

        sql.append("SELECT cve_vialidad ::text from   ").append(schemaRenemPG).append(".tc_vialidades where  upper(descripcion) =  upper(?) order by cve_vialidad");

        resul = jdbcTemplate.query(sql.toString(), arrayParams, new ResultSetExtractor<LinkedHashMap>() {
            @Override
            public LinkedHashMap extractData(ResultSet rs) throws SQLException, DataAccessException {
                String[] campos;
                ArrayList<LinkedHashMap> resultado;
                LinkedHashMap respuesta = null;
                ResultSetMetaData metaData = rs.getMetaData();
                int numeroColumnas = metaData.getColumnCount();
                campos = util.getStructure(rs);

                resultado = util.getAllData(rs, campos);
                if (resultado.size() > 0) {
                    respuesta = (LinkedHashMap) resultado.get(0);
                }
                return respuesta;
            }
        });

        return resul;
    }

    public ArrayList<LinkedHashMap> getEntreVialidad(String ce, String cvegeo, long cveft) {
        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        Object[] arrayParams = new Object[3];
        arrayParams[0] = ce;
        arrayParams[1] = cvegeo;
        arrayParams[2] = cveft;

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();

        sql.append("select 'Seleccione' tipovial,'null' tipo_e10n,  '0' cvevial,'null' tipo_e10, '00' orden union all (select tipovial,nomvial as tipo_e10n,cvevial,tipo_e10, row_number ()over() orden from ").append(schemaCarto2022).append(".get_cat_vial(?,?,?) order by orden)");

        resul = jdbcTemplate.query(sql.toString(), arrayParams, new ResultSetExtractor<ArrayList<LinkedHashMap>>() {
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

    public ArrayList<LinkedHashMap> getEntreVialidadSinFrente(String x, String y) {
        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        String point = "POINT(" + x + " " + y + ")";
        Object[] arrayParams = new Object[1];
        arrayParams[0] = point;
        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();
        sql.append("select 'Seleccione' tipovial,'null' tipo_e10n,  '0' cvevial,'null'tipo_e10 , '00' orden  union all (select tipovial,tipo_e10n,cvevial,tipo_e10 , orden-1 from ")
            .append(schemaRenemPG).append(".fn_obten_vialidades(?) order by orden asc)");

        resul = jdbcTemplate.query(sql.toString(), arrayParams, new ResultSetExtractor<ArrayList<LinkedHashMap>>() {
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
