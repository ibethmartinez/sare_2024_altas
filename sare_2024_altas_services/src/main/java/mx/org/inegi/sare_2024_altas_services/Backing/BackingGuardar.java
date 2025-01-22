/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Dto.DtoGuardar;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesConfiguraProyecto;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesGuadar;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingGuardar")
public class BackingGuardar {

    @Autowired
    @Qualifier("daoGuardar")
    private InterfacesGuadar interfaceGuarda;

    @Autowired
    @Qualifier("daoConfiguraProyecto")
    private InterfacesConfiguraProyecto interfacesConfiguraProyecto;

    public Response guardaPunteoPrueba(int proyecto, String ip, String obj, String usuario) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();
        String varObj = obj.concat("ip").concat(ip);
        Object varGuardar = varObj;
        Gson gson = new Gson();
        DtoGuardar guardaObj = (DtoGuardar) gson.fromJson(obj, DtoGuardar.class);
        String json;
        json = new Gson().toJson(guardaObj);
        LinkedHashMap dat = null;

        try {
            dat = interfaceGuarda.setGuadar(proyecto, obj, usuario);
            msj.setMessages("Ser guardo correctamente");
            respuesta.setDatos(dat);

        } catch (Exception ex) {
            ex.printStackTrace();
            msj.setMessages("error");
            respuesta.setSuccess(false);
            respuesta.setDatos(dat);
        }
        return respuesta;

    }

    public Response guardaPunteo(int proyecto, String ip, String obj, String usuario) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();
        Gson gson = new Gson();
        DtoGuardar guardaObj = (DtoGuardar) gson.fromJson(obj, DtoGuardar.class);
        guardaObj.setIp(ip);
        String json = new Gson().toJson(guardaObj);
        double dat = 0;
        String vaGuarda = "";
        String validacion = "";
        validacion = validaJson(guardaObj, 1);
        try {
            if (validacion.equalsIgnoreCase("correcto")) {
                dat = interfaceGuarda.setGuadar(proyecto, guardaObj, usuario);
                vaGuarda = String.valueOf(dat);
                switch (vaGuarda) {
                    case "1.0":
                        respuesta.setMensaje(new Mensaje("true", "Registro Guardado Correctamente"));
                        break;
                    case "-99.0":
                        respuesta.setMensaje(new Mensaje("false", "violación de registro único"));
                        break;
                    case "-98.0":
                        respuesta.setMensaje(new Mensaje("false", "violación de registro no nulo"));
                        break;
                    case "-97.0":
                        respuesta.setMensaje(new Mensaje("false", "violación de llave foránea"));
                        break;
                    case "-96.0":
                        respuesta.setMensaje(new Mensaje("false", "violación de integridad"));
                        break;
                    case "-95.0":
                        respuesta.setMensaje(new Mensaje("false", "violación de restricción"));
                        break;
                    case "-94.0":
                        respuesta.setMensaje(new Mensaje("false", "violación de check"));
                        break;
                    default:
                        respuesta.setMensaje(new Mensaje("false", "violación no codificada"));
                        break;

                }
            } else {
                msj.setMessages("error");
                respuesta.setSuccess(false);
                respuesta.setDatos(validacion);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            msj.setMessages("error");
            respuesta.setSuccess(false);
            respuesta.setDatos("Error en el guardado");
        }
        //respuesta.setMensaje(msj);
        return respuesta;
    }

    public String validaJson(DtoGuardar obj, int id_proyecto) {
        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> camposConfig = interfacesConfiguraProyecto.getConfValidaJson(id_proyecto);
        String error = "";
        String campoConfi = "";
        Object campoDatos = null;
        String valida = "";
        String validacion = "";
        String[] valorValid = null;
        String[] valorValida = null;
        int longituCampo = 0;
        String campoDato = "";
        // LinkedHashMap objValidar = new LinkedHashMap();
        DtoGuardar objDto = new DtoGuardar();
        LinkedHashMap datos = objDto.datosAdd(obj);

        //  for (int i = 0; i < camposConfig.size(); i++) {
        for (int j = 0; j < camposConfig.size(); j++) {
            campoConfi = camposConfig.get(j).get("campo").toString();
            campoDatos = datos.get(campoConfi);
            error = camposConfig.get(j).get("error").toString();
            longituCampo = Integer.parseInt(camposConfig.get(j).get("max_longitud_campo").toString());
            valida = camposConfig.get(j).get("validacion").toString();
            valorValid = valida.split(":");
            valorValida = valorValid[0].split(",");
            for (int v = 0; v < valorValid.length; v++) {
                int tamaño = 0;
                if (campoDatos == null) {
                    tamaño = 0;
                } else {
                    tamaño = campoDatos.toString().length();
                }
                if (valorValida[v].equalsIgnoreCase("not null")) {
                    if (campoDatos == null || campoDatos.equals("") || campoDatos.equals("null") || campoDatos.equals(null)) {
                        validacion = campoDatos + " : " + error;
                    } else {
                        validacion = "correcto";
                    }

                }
                if (valorValida[v].equalsIgnoreCase("not false")) {
                    if (campoDatos == null || campoDatos.equals("") || campoDatos.equals("null") || campoDatos.equals(null)) {
                        campoDato = "false";
                    } else {
                        campoDato = campoDatos.toString();
                    }
                    if (campoDato.equals("f") || campoDato.equals("F") || campoDato.equals("false")) {
                        validacion = campoDatos + " : " + error;
                    } else {
                        validacion = "correcto";
                    }

                }
                if (valorValida[v].equalsIgnoreCase("longitud")) {

                    if (tamaño > longituCampo) {

                        validacion = campoDatos + " : " + error;
                    } else {
                        validacion = "correcto";
                    }
                    campoDatos = "";
                    campoConfi = "";
                }
                break;
            }
        }

        return validacion;
    }
}
