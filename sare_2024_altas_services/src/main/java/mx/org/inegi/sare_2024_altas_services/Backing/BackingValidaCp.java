/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesValidaCp;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingValidaCp")
public class BackingValidaCp {

    @Autowired
    @Qualifier("daoValidaCp")
    InterfacesValidaCp interfacesValidaCp;

    public Response getCatalogoCP(String cve_ent) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catalogoCP = interfacesValidaCp.getCatalogoCP(cve_ent);

        respuesta.setList(catalogoCP);

        return respuesta;
    }

    public Response getValidaCP(String cp, String cve_ent) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> validaCP = interfacesValidaCp.getValidaCP(cp, cve_ent);
        respuesta.setList(validaCP);

        return respuesta;
    }
    
     public Response getTipE23a() throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> tipUnidadEcono = interfacesValidaCp.getCatTipUniEco();
        respuesta.setList(tipUnidadEcono);

        return respuesta;
    }
}
