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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterdaceListBloqueados;
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
@Repository("daoListBloqueados")
public class DaoListBloqueados implements InterdaceListBloqueados {

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
    public ArrayList<LinkedHashMap> getListBloqueados(String ce) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        final Object[] params = new Object[1];

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();
        if (ce.equals("00")) {
            params[0] = "1=1";//1=1 ES SIRVE PARA QUE NOS TRAIA TODO LOS REGISTROS
            sql.append(" select id_ue,'ND' sare_st_usr,sare_st_time , 0 as diferencia_horas,");
            sql.append(schemaRenemPG).append(".fn_ingles_a_espaniol(AGE(current_timestamp,sare_st_time)::varchar) as time_lock ");
            sql.append(" from ").append(schemaRenemPG).append(".tr_ue_sare ");
            sql.append(" where st_sare='20' AND ? ");
            sql.append(" and (current_timestamp-sare_st_time)>'00 00:15:00' ");
            sql.append(" order by AGE(current_timestamp,sare_st_time) desc ");
        } else {
            params[0] = ce;

            sql.append(" select id_ue,id_tramo sare_st_usr,sare_st_time , 0 as diferencia_horas,");
            sql.append(schemaRenemPG).append(".fn_ingles_a_espaniol(AGE(current_timestamp,sare_st_time)::varchar) as time_lock ");
            sql.append(" from ").append(schemaRenemPG).append(".tr_ue_sare ");
            sql.append(" where st_sare='20' and ce=?");
            sql.append(" and (current_timestamp-sare_st_time)>'00 00:15:00' ");
            sql.append(" order by AGE(current_timestamp,sare_st_time) desc ");

        }

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
    public ArrayList<LinkedHashMap> getListBloqueadosPag(String ce, int pag) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        final Object[] params;

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();
        if (ce.equals("00")) {
            params  = new Object[1];
            params[0] = pag;
           sql.append(" select a.id_ue,sare_st_usr as usuario,a.sare_st_time as Fecha_bloqueo,  ");
            sql.append(schemaRenemPG).append(".fn_ingles_a_espaniol(AGE(current_timestamp,a.sare_st_time)::varchar) as tiempo_bloqueado ");
            sql.append(" from ").append(schemaRenemPG).append(".tr_ue_sare a ");
            sql.append("join ").append(schemaRenemPG).append(".tr_ue_complemento b on a.id_ue=b.id_ue ");
            sql.append(" where a.st_sare='20'  ");
            sql.append(" and (current_timestamp - a.sare_st_time)>'00 00:15:00' ");
            sql.append("  order by AGE(current_timestamp,a.sare_st_time) desc  OFFSET(? * 10) LIMIT 10");
        } else {
           params  = new Object[2];
            params[0] = ce;
            params[1] = pag;
             sql.append(" select a.id_ue,sare_st_usr as usuario,a.sare_st_time as Fecha_bloqueo, ");
            sql.append(schemaRenemPG).append(".fn_ingles_a_espaniol(AGE(current_timestamp,a.sare_st_time)::varchar) as tiempo_bloqueado ");
            sql.append(" from ").append(schemaRenemPG).append(".tr_ue_sare a ");
            sql.append("join ").append(schemaRenemPG).append(".tr_ue_complemento b on a.id_ue=b.id_ue ");
            sql.append(" where a.st_sare='20' and a.ce=?");
            sql.append(" and (current_timestamp - a.sare_st_time)>'00 00:15:00' ");
            sql.append("  order by AGE(current_timestamp,a.sare_st_time) desc  OFFSET(? * 10) LIMIT 10");

        }

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
    public ArrayList<LinkedHashMap> getListBloqueadCantPag(String ce) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        String params  = "";

        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();
       if (ce.equals("00")) {
            
            sql.append("SELECT ceiling (count(*)::numeric/10::numeric) tot_pag   ");
            sql.append(" from ").append(schemaRenemPG).append(".tr_ue_sare a ");
            sql.append("join ").append(schemaRenemPG).append(".tr_ue_complemento b on a.id_ue=b.id_ue ");
            sql.append(" where a.st_sare='20'  ");
            sql.append(" and (current_timestamp - a.sare_st_time)>'00 00:15:00' ");
        } else {
            params=ce;
            sql.append("SELECT ceiling (count(*)::numeric/10::numeric) tot_pag   ");
            sql.append(" from ").append(schemaRenemPG).append(".tr_ue_sare a ");
            sql.append("join ").append(schemaRenemPG).append(".tr_ue_complemento b on a.id_ue=b.id_ue ");
            sql.append(" where a.st_sare='20' and a.ce='").append(params).append("' ");
            sql.append(" and (current_timestamp - a.sare_st_time)>'00 00:15:00' ");
       }
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
