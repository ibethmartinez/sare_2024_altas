/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import mx.org.inegi.sare_2024_altas_db.Dto.TrBitacoraAcceso;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceBitacoraUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author FABIOLA.RUIZ
 */
@Service("bakingUsuarioBitacora")
public class BakingUsuarioBitacora {

    @Autowired
    @Qualifier("daoBitacoraUsuario")
    InterfaceBitacoraUsuario interfaceBitacorausuario;
    
       public Boolean guardarBitacora(String usuario,String ip, String ce) {

        TrBitacoraAcceso bit= new TrBitacoraAcceso();
        bit.setCe(ce);
        bit.setIp(ip);
        bit.setUsuario(usuario);
        Boolean setBitacoraAcceso = interfaceBitacorausuario.setBitacoraAcceso(bit);
        return setBitacoraAcceso;
    }
}
