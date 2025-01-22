/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceIdentifica;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingIdentifica")
public class BackingIdentifica {

    @Autowired
    @Qualifier("daoIdentifica")
    private InterfaceIdentifica interfaceIdentifica;

    public Response getIdentifica(String x, String y, String buffer) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();
        ArrayList<LinkedHashMap> dat = null;
        ArrayList<LinkedHashMap> info = new ArrayList<LinkedHashMap>();
        ArrayList<LinkedHashMap> datEje = null;
        try {
            dat = interfaceIdentifica.getIdentifica(x, y, buffer);
            if (dat.size() > 0) {
                info = dat;
                datEje = interfaceIdentifica.getInfoVialidad(x, y, buffer);
                if (datEje.size() > 0) {
                    info.get(0).put("Eje vial", datEje);
                }
                respuesta.setDatos(info);
                msj.setMessages("Se identifico correctamente");

            } else {
                msj.setMessages("No hay información en este punto");
                respuesta.setMensaje(msj);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            msj.setMessages("No se puede encontrar información en el punto");
            respuesta.setSuccess(false);
            respuesta.setDatos(dat);
        }
        return respuesta;

    }

}
