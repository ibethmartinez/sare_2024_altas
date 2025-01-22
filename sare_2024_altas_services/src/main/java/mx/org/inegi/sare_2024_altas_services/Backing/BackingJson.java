/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceEntidad;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesJson;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingJson")
public class BackingJson {

    @Autowired
    @Qualifier("daoJson")
    InterfacesJson interfacesJson;

    @Autowired
    @Qualifier("daoEntidad")
    InterfaceEntidad interfaceEntidad;

    public Response getCargaTrabajo(String ce, long id_tramo, int pag) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catBusquedaPG = null;
        catBusquedaPG = interfacesJson.cargaTrabajo(ce, id_tramo, pag);
        respuesta.setList(catBusquedaPG);

        return respuesta;
    }

    public Response filtroCargaTrabajo(long id_ue, String tramo, String ce, Boolean isRatificado, String usuario) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();
        ArrayList<LinkedHashMap> catBusquedaPG = null;
        LinkedHashMap setComplemento = null;
        LinkedHashMap setIdUeBloquea = null;
        String varCE = null;
        if (ce.equalsIgnoreCase("00")) {
            varCE = interfacesJson.getBuscaCE(id_ue);
        } else {
            varCE = ce;
        }
        if (varCE == null || varCE.equalsIgnoreCase("null")) {
            msj.setType("Error. Registro no existe, por favor, verifique la información");
            respuesta.setMensaje(msj);
        } else {
            catBusquedaPG = interfacesJson.filtroCargaTrabajo(id_ue, tramo, varCE, isRatificado);
            int tipoBusqueda = Integer.parseInt(catBusquedaPG.get(0).get("busqueda").toString());
            switch (tipoBusqueda) {
                case 0:
                    msj.setType("Error, Id_ue no existe");
                    respuesta.setMensaje(msj);
                    break;
                case 1:
//                    if (!catBusquedaPG.isEmpty()) {
//                        if (catBusquedaPG.get(0).get("bloqueado") == null || catBusquedaPG.get(0).get("bloqueado").equals("") || catBusquedaPG.get(0).get("bloqueado").equals("null")) {
//                            msj.setType("Error, Id_ue bloqueado");
//                            respuesta.setMensaje(msj);
//                        } else {

                            setComplemento = interfacesJson.setUeComplemento(id_ue, usuario, varCE);
                            if (setComplemento.get("fn_set_tr_complemento").equals("t")) {
                                respuesta.setList(catBusquedaPG);
                                msj.setType("Correcto");
                            } else {
                                msj.setType("Error, no se bloqueo correctamente");
                            }
//                        }

//                    } else {
//                        msj.setType("Error. Registro no existe, por favor, verifique la información");
//                        respuesta.setMensaje(msj);
//                    }
                    break;
                case 2:
                    msj.setType("Error, Id_ue ya está punteado");
                    respuesta.setMensaje(msj);
                    break;
                case 3:
                    msj.setType("Error, Id_ue bloqueado");
                    respuesta.setMensaje(msj);
                    break;
            }

        }
        return respuesta;
    }

    public Response getEdos(String usuario) throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catBusquedaPG = null;

        catBusquedaPG = interfaceEntidad.getEdos(usuario);

        respuesta.setList(catBusquedaPG);

        return respuesta;
    }

    public Response getTcCoestatales() throws Exception {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> getTcCoestatales = interfaceEntidad.getTcCoestatales();

        respuesta.setList(getTcCoestatales);

        return respuesta;
    }

    public Response getCuantasPaginas(String ce, long id_tramo) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catBusquedaPG = null;
        catBusquedaPG = interfacesJson.obtieneCuantasPaginas(ce, id_tramo);
        respuesta.setList(catBusquedaPG);

        return respuesta;
    }
}
