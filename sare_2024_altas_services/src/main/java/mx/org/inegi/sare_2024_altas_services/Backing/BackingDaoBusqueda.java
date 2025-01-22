/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.LinkedHashMap;
import java.util.List;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesDaoBusqueda;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingDaoBusqueda")
public class BackingDaoBusqueda {

    @Autowired
    @Qualifier("daoBusqueda")
    InterfacesDaoBusqueda interfacesDaoBusqueda;

    public Response getBusqueda(String ce) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        LinkedHashMap<String, String> catBusquedaPG = interfacesDaoBusqueda.getBusqueda(ce, ce, ce, Boolean.TRUE);

        respuesta.setList((List) catBusquedaPG);

        return respuesta;
    }
}
