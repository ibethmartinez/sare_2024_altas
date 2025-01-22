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
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesJson;
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
@Repository("daoJson")
public class DaoJson implements InterfacesJson {

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
    public ArrayList<LinkedHashMap> cargaTrabajo(String ce, long id_tramo, int pag) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        Object[] params = new Object[2];
//        params[0] = ce;
//        params[1] = id_tramo;
//        params[2] = pag;
        String valida = "";
        String filtroExt=""; //" and s.id_ue not in(select id_ue from sare_sucursales_ce2024.tr_ue_sare where (e05  ~ '^5.*|^8.*' or e07 ~ '^9.*') and st_sare='06') ";

//se tiene que cambiar el st_Sare
        if (ce.equals("00")) {
            params = new Object[1];
            params[0] = pag;
            valida = " s.st_sare='06' \n".concat(filtroExt);
        } else {
            params[0] = ce;
            params[1] = pag;
            valida = " ce= ?  and s.st_sare='06' \n".concat(filtroExt);
        }
        sql.append("select s.id_ue ,s.e08 as establecimiento,s.ce,s.e03 as entidad, tm.nomgeo as Municipio , te.descripcion as Origen  ")
                .append("from ").append(schemaRenemPG).append(".tr_ue_sare s ")
                .append("inner join ").append(schemaCarto2022).append(".td_entidad e on s.e03 = e.cve_ent  ")
                .append("inner join ").append(schemaCarto2022).append(".td_municipios tm on s.e03 = tm.cve_ent and s.e04 = tm.cve_mun  ")
                .append("left join ").append(schemaCarto2022).append(".td_localidades tl on s.e03 = tl.cve_ent and s.e04 = tl.cve_mun  ")
                 .append("and s.e05 = tl.cve_loc ")
                .append("inner join  ").append(schemaRenemPG).append(".tc_encuestas te on s.id_encuesta = te.id_encuesta ")               
                .append("where ").append(valida).append(" and s.id_ue not in (select id_ue from ").append(schemaRenemPG).append(".tr_punteo_establecimientos)  order by s.ce,te.descripcion,s.e03 ,s.e08 , tm.nomgeo asc OFFSET((?)*10) LIMIT 10");

        resul = jdbcTemplate.query(sql.toString(), params, (ResultSet rs) -> {
            String[] campos;
            ArrayList<LinkedHashMap> resultado;
            campos = util.getStructure(rs);
            resultado = util.getAllData(rs, campos);
            return resultado;
        });

        return resul;
    }

    @Override
    public ArrayList<LinkedHashMap> obtieneCuantasPaginas(String ce, long id_tramo) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        String ce_ = "";
        String valida;
        valida = "";
        if (ce.equals("00")) {
            valida = " s.st_sare='06'  \n";
        } else {
            ce_ = ce;
            valida = " ce='" + ce_ + "' and s.st_sare='06' ";
        }
        // params[1] = id_tramo;
//se tiene que cambiar
        sql.append("SELECT ceiling (count(*)::numeric/10::numeric) tot_pag   ")
                .append("from ").append(schemaRenemPG).append(".tr_ue_sare s ")
                .append("inner join ").append(schemaCarto2022).append(".td_entidad e on s.e03 = e.cve_ent  ")
                .append("inner join ").append(schemaCarto2022).append(".td_municipios tm on s.e03 = tm.cve_ent and s.e04 = tm.cve_mun  ")
                .append("left join ").append(schemaCarto2022).append(".td_localidades tl on s.e03 = tl.cve_ent and s.e04 = tl.cve_mun  ")
                 .append("and s.e05 = tl.cve_loc ")
                .append("inner join  ").append(schemaRenemPG).append(".tc_encuestas te on s.id_encuesta = te.id_encuesta ")               
                .append("where ").append(valida).append(" and s.id_ue not in (select id_ue from ").append(schemaRenemPG).append(".tr_punteo_establecimientos)");

        resul = jdbcTemplate.query(sql.toString(), (ResultSet rs) -> {
            String[] campos;
            ArrayList<LinkedHashMap> resultado;
            campos = util.getStructure(rs);
            resultado = util.getAllData(rs, campos);
            return resultado;
        });

        return resul;
    }

    @Override
    public ArrayList<LinkedHashMap> filtroCargaTrabajo(long id_ue, String tramo, String ce, Boolean isRatificado) {

        StringBuilder sql = new StringBuilder();
        ArrayList<LinkedHashMap> resul;
        resul = null;
        final utils util = new utils();
        final Object[] params = new Object[4];
        params[0] = id_ue;
        params[1] = tramo;
        params[2] = ce;
        params[3] = isRatificado;
        
        
        sql.append("SELECT id_ue::varchar(255), e08, e09, e23a, e03, e03n,e04,e04n, e05,e05n, \n"
                + "e06,e07, tipo_e10::int8, \n"
                + "te10, e10, e11::int8, e11a, e13::int8, e13a, e12, tipo_e12p, \n"
                + "te12p, tipo_e14::int8, te14, e14, e14_a, tipo_e10a::int8,\n"
                + "te10a, e10a, tipo_e10b::int8,\n"
                + "te10b, e10b, tipo_e10c::int8,\n"
                + "te10c, e10c, e16, \n"
                + "tipo_e19, te19, e19, e20,  coor_x, coor_y, observa,"
                + "id_tramo, estatus_punteo,c145,busqueda,origen,es_ratificable,bounds ");
        sql.append(" FROM ").append(schemaRenemPG).append(".fn_busca_bloquea_id_ue(?::numeric,?::numeric,?,?) ");

        resul = jdbcTemplate.query(sql.toString(), params, new ResultSetExtractor<ArrayList<LinkedHashMap>>() {
            @Override
            public ArrayList<LinkedHashMap> extractData(ResultSet rs) throws SQLException, DataAccessException {
                String[] campos;
                ArrayList<LinkedHashMap> resultado;
                campos = util.getStructure(rs);
                resultado = util.getAllData(rs, campos);
                return resultado;
            }
        });

        return resul;
    }

    @Override
    public LinkedHashMap setUeComplemento(long id_ue, String usuario, String ce) {

        StringBuilder sql = new StringBuilder();
        LinkedHashMap resul;
        resul = null;
        final utils util = new utils();
        final Object[] params = new Object[3];
        params[0] = id_ue;
        params[1] = usuario;
        params[2] = ce;

        LinkedHashMap resultad = new LinkedHashMap();

        sql.append("select fn_set_tr_complemento from ").append(schemaRenemPG).append(".fn_set_tr_complemento(?,?,?)");

        resul = jdbcTemplate.query(sql.toString(), params, new ResultSetExtractor<LinkedHashMap>() {
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
    public LinkedHashMap getBloquea(long id_ue) {

        StringBuilder sql = new StringBuilder();
        LinkedHashMap resul;
        resul = null;
        long idUe_ = id_ue;
        final utils util = new utils();
        LinkedHashMap resultad = new LinkedHashMap();
        sql.append("UPDATE  ").append(schemaRenemPG).append(".tr_ue_sare set st_sare='20' where id_ue=?");

        try {
            if (jdbcTemplate.update(sql.toString(), idUe_) > 0) {
                resultad.put("bloqueo", "t");
            }
        } catch (Exception ex) {
            resultad.put("bloqueo", "f");
        }

        return resultad;
    }

    @Override
    public String getBuscaCE(long id_ue) {

        StringBuilder sql = new StringBuilder();
        String resul;
        resul = null;
        long id_ue_ = id_ue;
        final utils util = new utils();
        String resultad;

        sql.append("select ce from ").append(schemaRenemPG).append(".tr_ue_sare where id_ue=").append(id_ue_);

        resul = jdbcTemplate.query(sql.toString(), new ResultSetExtractor<String>() {
            @Override
            public String extractData(ResultSet rs) throws SQLException, DataAccessException {
                String regresar = null;
                while (rs.next()) {
                    regresar = rs.getString("ce");
                }
                
                return regresar;
            }
        });

        return resul;

    }
}
