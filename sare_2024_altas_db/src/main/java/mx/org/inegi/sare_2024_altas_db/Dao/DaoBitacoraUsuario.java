/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Dao;

import mx.org.inegi.sare_2024_altas_db.Dto.TrBitacoraAcceso;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceBitacoraUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author FABIOLA.RUIZ
 */
@Repository("daoBitacoraUsuario")
public class DaoBitacoraUsuario implements InterfaceBitacoraUsuario {
    
    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;
    
      @Autowired
    @Qualifier("schemaRenemPG")
    private String schemaRenemPG;
      
    @Override
    public Boolean setBitacoraAcceso(TrBitacoraAcceso bitacora) {
        StringBuilder sql = new StringBuilder();
        Boolean success = false;
        sql.append("INSERT INTO ").append(schemaRenemPG).append(".td_bitacora_accesos_sare (ip, fecha, id_tramo, usuario, ce) VALUES (?,now(),0,?,?)");
        int update = 0;

        update = jdbcTemplate.update(sql.toString(), new Object[]{bitacora.getIp(), bitacora.getUsuario(), bitacora.getCe()});
        if (update > 0) {
            success = true;

        }
        return success;
    }
}
