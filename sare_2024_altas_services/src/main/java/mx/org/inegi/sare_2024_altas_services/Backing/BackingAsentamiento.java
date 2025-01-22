/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesAsentamiento;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingAsentamiento")
public class BackingAsentamiento {

    @Autowired
    @Qualifier("daoAsentamiento")
    InterfacesAsentamiento interfacesAsentamiento;



    public Response getCatAsentamiento() throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catBusquedaPG = null;

        catBusquedaPG = interfacesAsentamiento.getCatAsentamiento();

        respuesta.setList(catBusquedaPG);

        return respuesta;
    }

}
