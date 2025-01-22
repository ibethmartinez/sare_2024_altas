/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Dao;

import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesCancelar;
import mx.org.inegi.sare_2024_altas_db.utils.utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Repository("daoCancelar")
public class DaoCancelar implements InterfacesCancelar {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;

    @Override
    public LinkedHashMap getCancela(String id_ue, String id_tramo, String ip) {
//se modifico ya que se actulizó el IDE
        StringBuilder sql = new StringBuilder();
        String[] params = new String[1];
        params[0] = id_ue;
        //params[1] = id_tramo;
        //params[2] = ip;
        LinkedHashMap resultad = new LinkedHashMap();
        //  sql.append("UPDATE ").append(esquemaPos).append(".tr_ue_sare set st_sare='06' where id_ue=").append(id_ue);
        sql.append("UPDATE  ").append(schemaRenemPG).append(".tr_ue_sare set st_sare='06' where id_ue=?::numeric");

        try {
            if (jdbcTemplate.update(sql.toString(), (Object[]) params) > 0) {
                resultad.put("fn_reinicia_punteo", "t");
            }
        } catch (DataAccessException ex) {
            resultad.put("fn_reinicia_punteo", "f");
        }

        return resultad;
    }

}
