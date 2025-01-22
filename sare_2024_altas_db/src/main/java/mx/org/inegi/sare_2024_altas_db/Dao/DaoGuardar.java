/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Dao;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Dto.DtoGuardar;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesGuadar;
import mx.org.inegi.sare_2024_altas_db.utils.utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Repository("daoGuardar")
public class DaoGuardar implements InterfacesGuadar {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;
//se hicieron varios cambios, ya que se actualizó el IDE
    @Override
    public double setGuadar(int proyecto, DtoGuardar obj, String usuario) {
        StringBuilder sql = new StringBuilder();
        double regresa = 0D;
        Object[] arrayParams = new Object[3];
        arrayParams[0] = proyecto;
        arrayParams[1] = obj;
        arrayParams[2] = usuario;

        sql.append("SELECT resultado from ").append(schemaRenemPG).append(".fn_registra_ue_sare(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?").append(") resultado");
        // sql.append("SELECT 'Se guardo' resultado ");

        try {
            regresa = jdbcTemplate.execute(sql.toString(), new PreparedStatementCallback<Double>() {
                @Override
                public Double doInPreparedStatement(PreparedStatement ps) throws SQLException, DataAccessException {
                    boolean esBoleano;
                    
                    if (obj.getEs_ratificable() == null || obj.getEs_ratificable().equals("")|| obj.getEs_ratificable().equals("null")) {
                        ps.setNull(1, java.sql.Types.BOOLEAN);
                    } else {
                        esBoleano = obj.getEs_ratificable().equalsIgnoreCase("t");
                        ps.setBoolean(1, esBoleano);
                    }
                    if (obj.getNo_localizado() == null || obj.getNo_localizado().equals("")|| obj.getNo_localizado().equals("null")) {
                        ps.setNull(2, java.sql.Types.BOOLEAN);
                    } else {
                        esBoleano = obj.getNo_localizado().equalsIgnoreCase("true");
                        ps.setBoolean(2, esBoleano);
                    }
                    if (obj.getId_ue() == null || obj.getId_ue().equals("")|| obj.getId_ue().equals("null")) {
                        ps.setNull(3, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(3, Long.parseLong(obj.getId_ue()));
                    }
                    if (obj.getCe() == null || obj.getCe().equals("")|| obj.getCe().equals("null")) {
                        ps.setNull(4, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(4, obj.getCe());
                    }
                    if (obj.getId_tramo() == null || obj.getId_tramo().equals("")|| obj.getId_tramo().equals("null")) {
                        ps.setNull(5, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(5, Long.parseLong(obj.getId_tramo()));
                    }
                    if (obj.getCvegeo() == null || obj.getCvegeo().equals("")|| obj.getCvegeo().equals("null")) {
                        ps.setNull(6, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(6, obj.getCvegeo());
                    }
                    ps.setString(7, obj.getE03());
                    ps.setString(8, obj.getE03n());
                    ps.setString(9, obj.getE04());
                    ps.setString(10, obj.getE04n());
                    if (obj.getE05() == null || obj.getE05().equals("")|| obj.getE05().equals("null")) {
                        ps.setNull(11, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(11, obj.getE05());
                    }
                    
                    ps.setString(12, obj.getE05n());
                    ps.setString(13, obj.getE06());
                    if (obj.getE07() == null || obj.getE07().equals("")|| obj.getE07().equals("null")) {
                        ps.setNull(14, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(14, obj.getE07());
                    }
                    if (obj.getTipo_e10() == null || obj.getTipo_e10().equals("")|| obj.getTipo_e10().equals("null")) {
                        ps.setNull(15, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(15, Long.parseLong(obj.getTipo_e10()));
                    }
                    if (obj.getTe10() == null || obj.getTe10().equals("")|| obj.getTe10().equals("null")) {
                        ps.setNull(16, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(16, obj.getTe10());
                    }
                    if (obj.getE10() == null || obj.getE10().equals("")|| obj.getE10().equals("null")) {
                        ps.setNull(17, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(17, obj.getE10());
                    }
                    if (obj.getE11() == null || obj.getE11().equals("")|| obj.getE11().equals("null")) {
                        ps.setNull(18, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(18, Long.parseLong(obj.getE11()));
                    }
                    if (obj.getE11a() == null || obj.getE11a().equals("")|| obj.getE11a().equals("null")) {
                        ps.setNull(19, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(19, obj.getE11a());
                    }
                    if (obj.getE13() == null || obj.getE13().equals("")|| obj.getE13().equals("null")) {
                        ps.setNull(20, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(20, Long.parseLong(obj.getE13()));
                    }
                    if (obj.getE13a() == null || obj.getE13a().equals("")|| obj.getE13a().equals("null")) {
                        ps.setNull(21, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(21, obj.getE13a());
                    }
                    if (obj.getE12() == null || obj.getE12().equals("")|| obj.getE12().equals("null")) {
                        ps.setNull(22, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(22, obj.getE12());
                    }
                    if (obj.getTipo_e12p() == null || obj.getTipo_e12p().equals("")|| obj.getTipo_e12p().equals("null")) {
                        ps.setNull(23, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(23, Long.parseLong(obj.getTipo_e12p()));
                    }
                    if (obj.getTe12p() == null || obj.getTe12p().equals("")|| obj.getTe12p().equals("null")) {
                        ps.setNull(24, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(24, obj.getTe12p());
                    }
                    if (obj.getTipo_e14() == null || obj.getTipo_e14().equals("")|| obj.getTipo_e14().equals("null")) {
                        ps.setNull(25, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(25, Long.parseLong(obj.getTipo_e14()));
                    }
                    if (obj.getTe14() == null || obj.getTe14().equals("")|| obj.getTe14().equals("null")) {
                        ps.setNull(26, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(26, obj.getTe14());
                    }
                    if (obj.getE14() == null || obj.getE14().equals("")|| obj.getE14().equals("null")) {
                        ps.setNull(27, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(27, obj.getE14());
                    }
                    if (obj.getE14_a() == null || obj.getE14_a().equals("")|| obj.getE14_a().equals("null")) {
                        ps.setNull(28, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(28, obj.getE14_a());
                    }
                    if (obj.getTipo_e10a() == null || obj.getTipo_e10a().equals("")|| obj.getTipo_e10a().equals("null")) {
                        ps.setNull(29, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(29, Long.parseLong(obj.getTipo_e10a()));
                    }
                    if (obj.getTe10a() == null || obj.getTe10a().equals("")|| obj.getTe10a().equals("null")) {
                        ps.setNull(30, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(30, obj.getTe10a());
                    }
                    if (obj.getE10a() == null || obj.getE10a().equals("")|| obj.getE10a().equals("null")) {
                        ps.setNull(31, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(31, obj.getE10a());
                    }
                    if (obj.getTipo_e10b() == null || obj.getTipo_e10b().equals("")|| obj.getTipo_e10b().equals("null")) {
                        ps.setNull(32, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(32, Long.parseLong(obj.getTipo_e10b()));
                    }
                    if (obj.getTe10b() == null || obj.getTe10b().equals("")|| obj.getTe10b().equals("null")) {
                        ps.setNull(33, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(33, obj.getTe10b());
                    }
                    if (obj.getE10b() == null || obj.getE10b().equals("")|| obj.getE10b().equals("null")) {
                        ps.setNull(34, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(34, obj.getE10b());
                    }
                    if (obj.getTipo_e10c() == null || obj.getTipo_e10c().equals("")|| obj.getTipo_e10c().equals("null")) {
                        ps.setNull(35, java.sql.Types.NUMERIC);
                    } else {
                        ps.setLong(35, Long.parseLong(obj.getTipo_e10c()));
                    }
                    if (obj.getTe10c() == null || obj.getTe10c().equals("")|| obj.getTe10c().equals("null")) {
                        ps.setNull(36, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(36, obj.getTe10c());
                    }
                    if (obj.getE10c() == null || obj.getE10c().equals("")|| obj.getE10c().equals("null")) {
                        ps.setNull(37, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(37, obj.getE10c());
                    }
                    if (obj.getE16() == null || obj.getE16().equals("")|| obj.getE16().equals("null")) {
                        ps.setNull(38, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(38, obj.getE16());
                    }
                    if (obj.getTipo_e19() == null || obj.getTipo_e19().equals("")|| obj.getTipo_e19().equals("null")) {
                        ps.setNull(39, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(39, obj.getTipo_e19());
                    }
                    if (obj.getTe19() == null || obj.getTe19().equals("")|| obj.getTe19().equals("null")) {
                        ps.setNull(40, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(40, obj.getTe19());
                    }
                    if (obj.getE19() == null || obj.getE19().equals("")|| obj.getE19().equals("null")) {
                        ps.setNull(41, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(41, obj.getE19());
                    }
                    if (obj.getE20() == null || obj.getE20().equals("")|| obj.getE20().equals("null")) {
                        ps.setNull(42, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(42, obj.getE20());
                    }
                    if (obj.getX_val().equalsIgnoreCase("")) {
                        ps.setNull(43, java.sql.Types.NUMERIC);
                    } else {
                        ps.setBigDecimal(43, new BigDecimal(obj.getX_val()));
                    }
                    if (obj.getY_val().equalsIgnoreCase("")) {
                        ps.setNull(44, java.sql.Types.NUMERIC);
                    } else {
                        ps.setBigDecimal(44, new BigDecimal(obj.getY_val()));
                    }
                    if (obj.getObserva() == null || obj.getObserva().equals("")|| obj.getObserva().equals("null")) {
                        ps.setNull(45, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(45, obj.getObserva());
                    }
                    if (obj.getIp() == null || obj.getIp().equals("")|| obj.getIp().equals("null")) {
                        ps.setNull(46, java.sql.Types.VARCHAR);
                    } else {
                        ps.setString(46, obj.getIp());
                    }
                    double result = 0D;
                    try (ResultSet rs = ps.executeQuery()) {
                        while (rs.next()) {
                            result = rs.getDouble(1);
                        }
                    }
                    return result;
                }
            });

        } catch (DataAccessException e) {
            regresa = 0L;
        }

        return regresa;

    }

    @Override
    public LinkedHashMap setGuadar(int proyecto, String obj, String usuario) {
        StringBuilder sql = new StringBuilder();
        LinkedHashMap resul;
        resul = null;
        final utils util = new utils();
        Object[] arrayParams = new Object[3];
        arrayParams[0] = proyecto;
        arrayParams[1] = obj;
        arrayParams[2] = usuario;

        LinkedHashMap resultad = new LinkedHashMap();
        sql.append("SELECT 'Se guardo' resultado");

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
