/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceDesbloqueaId_ue;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingDesbloqueaId_ue")

public class BackingDesbloqueaId_ue {

    @Autowired
    @Qualifier("daoDesbloqueaId_ue")
    private InterfaceDesbloqueaId_ue interfaceDesbloqueaId_ue;

    public Response getDebloqueo(String id_ue, String id_tramo) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();
        //boolean dat = false;
        LinkedHashMap dat = null;
        boolean dat2 = false;
        try {
            //dat = interfaceDesbloqueaId_ue.getDesBloqueaId_ue(id_ue, id_tramo);
            dat = interfaceDesbloqueaId_ue.desbloquea(id_ue);
            // dat2 = interfaceDesbloqueaId_ue.deletTrComplemento(id_ue);
            //if (dat == true||dat2 == true) {
//                 if (dat == true) {
//                msj.setMessages("true, Se debloqueo correctamente");
//                respuesta.setValor("true, Se debloqueo correctamente");
//
//            } else {
//                msj.setMessages("false, error al debloqueo");
//                respuesta.setValor("true, Se debloqueo correctamente");
//            }
            if (dat.get("fn_desbloquea_id_ue").equals("t")) {
                msj.setMessages("Se Cancelo correctamente");
                respuesta.setValor("Se Cancelo correctamente");

            } else {
                msj.setMessages("Error al cancelar");
                respuesta.setValor("Se Cancelo correctamente");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            msj.setMessages("error al debloqueo");
            respuesta.setSuccess(false);
            respuesta.setDatos(dat);
        }
        return respuesta;

    }
}
