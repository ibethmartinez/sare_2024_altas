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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceDesbloqueaId_ue;
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
@Repository("daoDesbloqueaId_ue")
public class DaoDesbloqueaId_ue implements InterfaceDesbloqueaId_ue {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;

    @Override
    public boolean getDesBloqueaId_ue(String id_ue, String ce) {

        StringBuilder sql = new StringBuilder();
        boolean resul = false;
        String[] params = new String[2];
        params[0] = id_ue;
        params[1] = ce;
        int idUeEnt = Integer.parseInt(id_ue);
        final utils util = new utils();
        LinkedHashMap resultad = new LinkedHashMap();
        sql.append("UPDATE ").append(schemaRenemPG).append(".tr_ue_sare set st_sare='06' ")
                .append("where id_ue=?::numeric and st_sare='20' and ce=? and not id_ue in (select id_ue from ").append(schemaRenemPG).append(".tr_punteo_establecimientos)");

        if (jdbcTemplate.update(sql.toString(), new Object[]{idUeEnt, ce}) > 0) {
            resul = true;
        }

        return resul;
    }

    public boolean deletTrComplemento(String id_ue) {

        StringBuilder sql = new StringBuilder();
        boolean resul = false;
        // int idUeEnt = Integer.parseInt(id_ue);
        final utils util = new utils();
        LinkedHashMap resultad = new LinkedHashMap();
        sql.append("delete from ").append(schemaRenemPG).append(".tr_ue_complemento where id_ue=?::numeric ");
        if (jdbcTemplate.update(sql.toString(), new Object[]{id_ue}) > 0) {
            resul = true;
        }

        return resul;
    }

    //con query nuevo que realizo Jorge el 24/07/2024
    @Override
    public LinkedHashMap desbloquea(String id_ue) {

        StringBuilder sql = new StringBuilder();
        LinkedHashMap resul;
        resul = null;
        final utils util = new utils();
         // int idUeEnt = Integer.parseInt(id_ue);
          String params = id_ue;

        LinkedHashMap resultad = new LinkedHashMap();

        sql.append("select * from ").append(schemaRenemPG).append(".fn_desbloquea_id_ue('").append(params).append("') ");

        resul = jdbcTemplate.query(sql.toString(), new ResultSetExtractor<LinkedHashMap>() {
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

}
