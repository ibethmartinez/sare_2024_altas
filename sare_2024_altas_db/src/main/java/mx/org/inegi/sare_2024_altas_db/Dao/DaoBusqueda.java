/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Dao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesDaoBusqueda;
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
@Repository("daoBusqueda")
public class DaoBusqueda implements InterfacesDaoBusqueda {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaSarePG")
    private String schemaSarePG;

    @Override
    public LinkedHashMap<String, String> getBusqueda(String ce, String id_ue, String tramo, Boolean isRatificado) {
        StringBuilder sql = new StringBuilder();
        Object[] params = new Object[4];
        params[0] = ce;
        params[1] = id_ue;
        params[2] = tramo;
        params[3] = isRatificado;

        LinkedHashMap<String, String> resul = null;
        LinkedHashMap<String, String> listaCEs = new LinkedHashMap<String, String>();
        sql.append("SELECT id_ue::varchar(255), e08, e09, e23a, e03, e04, e05, ")
                .append("e06,e07, tipo_e10::int8, ")
                .append("te10, e10, e11::int8, e11a, e13::int8, e13a, e12, tipo_e12p, ")
                .append("te12p, tipo_e14::int8, te14, e14, e14_a, tipo_e10a::int8,")
                .append("te10a, e10a, tipo_e10b::int8,")
                .append("te10b, e10b, tipo_e10c::int8,")
                .append("te10c, e10c, e16, ")
                .append("tipo_e19, te19, e19, e20,  coor_x, coor_y, observa,")
                .append("id_tramo, estatus_punteo,c145,bloqueado ")
                .append(" FROM ").append(schemaSarePG).append(".fn_busca_bloquea_id_ue(?::numeric,?::numeric,?,?) ");
        resul = jdbcTemplate.query(sql.toString(), new Object[]{}, new ResultSetExtractor<LinkedHashMap<String, String>>() {
            @Override
            public LinkedHashMap<String, String> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<String[]> fila;

                ResultSetMetaData metaData = rs.getMetaData();
                while (rs.next()) {
                    int numeroColumnas = metaData.getColumnCount();
                    for (int i = 0; i < numeroColumnas; i++) {
                        String columnTypeName = metaData.getColumnTypeName(i + 1);
                        String columna = metaData.getColumnName(i + 1);
                        String valor = rs.getString(metaData.getColumnName(i + 1));

                        listaCEs.put(columna, valor);
                    }

                }
                rs.close();
                return listaCEs;
            }
        });
        try {
            jdbcTemplate.getDataSource().getConnection().close();
        } catch (SQLException ex) {
            Logger.getLogger(DaoBusqueda.class.getName()).log(Level.SEVERE, null, ex);
        }
        return listaCEs;
    }

}
