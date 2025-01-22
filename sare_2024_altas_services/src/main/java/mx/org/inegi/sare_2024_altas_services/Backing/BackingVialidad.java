/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesVialidad;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingVialidad")
public class BackingVialidad {

    @Autowired
    @Qualifier("daoVialidad")
    InterfacesVialidad interfacesVialidad;

    public Response getCatVialidad() throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catVialidad = null;

        catVialidad = interfacesVialidad.getCatVialidad();

        respuesta.setList(catVialidad);

        return respuesta;
    }

    public Response getEntreVialidad(String ce, String cvegeo, long cveft) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catVialidad = null;
        LinkedHashMap catVialida = null;
        catVialidad = interfacesVialidad.getEntreVialidad(ce, cvegeo, cveft);
       
        if (!catVialidad.isEmpty()) {
            respuesta.setList(catVialidad);
        } else {//tipovial,nomvial as tipo_e10n,cvevial,tipo_e10
            catVialida.put("tipovial", "NINGUNO");
            catVialida.put("tipo_e10n", "NINGUNO");
            catVialida.put("cvevial", "NINGUNO");
            catVialida.put("tipo_e10", "5");
            respuesta.setList((List) catVialida);
        }

        

        return respuesta;
    }

}
