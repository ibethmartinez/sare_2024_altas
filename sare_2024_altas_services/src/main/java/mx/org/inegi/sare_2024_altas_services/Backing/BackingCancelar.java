/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceDesbloqueaId_ue;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesCancelar;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingCancelar")
public class BackingCancelar {

    @Autowired
    @Qualifier("daoCancelar")
    private InterfacesCancelar interfaceCancelar;

    @Autowired
    @Qualifier("daoDesbloqueaId_ue")
    private InterfaceDesbloqueaId_ue interfaceDesbloqueaId_ue;

    public Response getCancelar(String id_ue, String id_tramo, String ip) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();
        LinkedHashMap dat = null;
        boolean dat2 = false;
        try {
            dat = interfaceCancelar.getCancela(id_ue, id_tramo, ip);
            dat2 = interfaceDesbloqueaId_ue.deletTrComplemento(id_ue);
            if (dat.get("fn_reinicia_punteo").equals("t") || dat2 == true) {
                msj.setMessages("Se Cancelo correctamente");
                respuesta.setValor("Se Cancelo correctamente");

            } else {
                msj.setMessages("Error al cancelar");
                respuesta.setValor("Se Cancelo correctamente");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            msj.setMessages("Error al cancelar");
            respuesta.setSuccess(false);
            respuesta.setDatos(dat);
        }
        return respuesta;

    }

}
