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
import mx.org.inegi.sare_2024_altas_db.utils.utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesConfiguraProyecto;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Repository("daoConfiguraProyecto")
public class DaoConfiguraProyecto implements InterfacesConfiguraProyecto {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    //conn a tabla configuracion
    @Autowired
    @Qualifier("schemaSarePG")
    private String schemaSarePG;

    @Override
    public ArrayList<LinkedHashMap> getConfigura(int id_proyecto) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul = null;
        final Object[] params = new Object[1];
        final utils util = new utils();
        params[0] = id_proyecto;

        ArrayList<LinkedHashMap> resultad = null;

        sql.append(" select id_proyecto,nombre_proyecto,id_configuracion,tema_ide,campo,etiqueta_ide,tipo_control,solo_lectura,alcance_validacion,max_longitud_campo,no_localizado,id_validacion,validacion,error from ").append(schemaSarePG).append(".get_json_proyecto(?)");

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
    public ArrayList<LinkedHashMap> getConfValidaJson(int id_proyecto) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul = null;
        final Object[] params = new Object[1];
        final utils util = new utils();
        params[0] = id_proyecto;

        ArrayList<LinkedHashMap> resultad = null;

        sql.append("select b.id_configuracion,b.campo,b.alcance_validacion,b.max_longitud_campo,c.id_validacion,c.validacion,c.error from ")
                .append(schemaSarePG).append(".tc_proyectos a ")
                .append("inner join ").append(schemaSarePG).append(".tr_configuracion_general b on a.id_proyecto=b.id_proyecto ")
                .append(" left join ").append(schemaSarePG).append(".tr_validacion c on b.alcance_validacion =c.id_validacion")
                .append(" where a.id_proyecto=? ")
                .append(" ORDER BY case ")
                .append(" when b.tema_ide='Referencia' then 1 ")
                .append(" when b.tema_ide='Ubicación Geográfica' then 2 ")
                .append(" when b.tema_ide='Domicilio' then 3 ")
                .append(" when b.tema_ide='Asentamiento' then 4 ")
                .append(" when b.tema_ide='Entre vialidades' then 5 ")
                .append(" when b.tema_ide='Calle posterior' then 6 ")
                .append(" when b.tema_ide='Edificio, centro comercial' then 7 ")
                .append(" when b.tema_ide='Observación' then 8 ")
                .append(" when b.tema_ide='Json Validación' then 9 ")
                .append(" else 10 end,b.id_configuracion");

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

}
