/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesPiso;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingPiso")
//Se obtiene catalogos tipo piso y tipo centro comercial, para el formulario
public class BackingPiso {
    @Autowired
    @Qualifier("daoPiso")
    InterfacesPiso interfacesPiso;
    
     public Response getCatPiso() throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catPiso = null;

        catPiso = interfacesPiso.getCatPiso();

        respuesta.setList(catPiso);

        return respuesta;
    }
     
         public Response getCatTipComercio() throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catPiso = null;

        catPiso = interfacesPiso.getCatTipComercio();

        respuesta.setList(catPiso);

        return respuesta;
    }

    
}
