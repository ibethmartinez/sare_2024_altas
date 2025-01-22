/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterdaceListBloqueados;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingListBloqueados")
public class BackingListBloqueados {

    @Autowired
    @Qualifier("daoListBloqueados")
    InterdaceListBloqueados interdaceListBloqueados;

    public Response obtieneLisBloqueado(String ce) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> lisBloqueados = null;
        lisBloqueados = interdaceListBloqueados.getListBloqueados(ce);
        if(lisBloqueados.size()==0){
            respuesta.setValor("No hay bloqueados");
        }else{
            respuesta.setList(lisBloqueados);
        }

        

        return respuesta;
    }
    
    public Response obtieneLisBloqueadoPag(String ce, int pag) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> lisBloqueados = null;
        lisBloqueados = interdaceListBloqueados.getListBloqueadosPag(ce, pag);
        if(lisBloqueados.size()==0){
            respuesta.setValor("No hay bloqueados");
        }else{
            respuesta.setList(lisBloqueados);
        }

        

        return respuesta;
    }
    
      public Response getBloqueadosTotPag(String ce) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catBusquedaPG = null;
        catBusquedaPG = interdaceListBloqueados.getListBloqueadCantPag(ce);

        respuesta.setList(catBusquedaPG);

        return respuesta;
    }

}
