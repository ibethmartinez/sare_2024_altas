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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceIdentifica;
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
@Repository("daoIdentifica")
public class DaoIdentifica implements InterfaceIdentifica {

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
    public ArrayList<LinkedHashMap> getIdentifica(String x, String y, String buffer) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        String point ="POINT(" + x + " " + y + ")";
        int buffer_=Integer.parseInt(buffer);
        final utils util = new utils();
        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();
        sql.append("select gid,a.id_ue,c.e08,c.e09,cve_ce as ce,a.id_tramo,a.cvegeo,a.cve_ent as e03,a.nom_ent as e03n,a.cve_mun as e04,a.nom_mun as e04n, ")
                .append(" a.cve_loc as e05,a.nom_loc as e05n,a.cve_ageb as e06,a.cve_mza as e07,a.tipo_e10,a.te10,a.e10,a.e11,a.e11a,a.e13,a.e13a,a.e12, ")
                .append(" a.tipo_e12p,a.te12p,a.tipo_e14,a.te14,a.e14,a.e14_a,a.tipo_e10a,a.te10a,a.e10a,a.tipo_e10b,a.te10b," )
                .append(" a.e10b,a.tipo_e10c,a.te10c,a.e10c,a.e16,a.c145,a.tipo_e19,a.te19,a.e19,a.e20, ")
                .append(" x(a.the_geom_geo) x_val,y(a.the_geom_geo) y_val,a.c154_v,a.observa,a.st_sare,b.id_tipoasen,b.descripcion,a.tipo_e14 ");
        sql.append(" FROM ").append(schemaRenemPG).append(".tr_punteo_establecimientos a");
        sql.append(" left join  ").append(schemaRenemPG).append(".cat_asentamientos_humanos b on a.tipo_e14::numeric=b.tipo_e14::numeric");
        sql.append(" left join  ").append(schemaRenemPG).append(".tr_ue_sare c on a.id_ue =c.id_ue");
        sql.append(" WHERE  ST_intersects(st_buffer(geomfromtext('").append(point).append("',900913),").append(buffer_).append("),a.the_geom_merc)  ");

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

    @Override
    public ArrayList<LinkedHashMap> getInfoVialidad(String x, String y, String buffer) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        String point = "POINT(" + x + " " + y + ")";
        String[] params = new String[3];
        params[0] = point;
        params[1] = point;
        params[2] = buffer;
        final utils util = new utils();
        ArrayList<LinkedHashMap> resultad = new ArrayList<LinkedHashMap>();
        sql.append("SELECT tipovial,nomvial,ST_Distance(the_geom_merc,geomfromtext(?,900913)) distancia FROM ")
                .append(schemaCarto2022).append(".td_ejes WHERE ST_intersects(st_buffer(geomfromtext(?,900913),?::numeric),the_geom_merc) order by distancia limit 1");

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
