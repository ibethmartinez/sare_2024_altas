/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesConfiguraProyecto;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingConfiguraProyecto")
public class BackingConfiguraProyecto {

    @Autowired
    @Qualifier("daoConfiguraProyecto")
    InterfacesConfiguraProyecto interfacesConfiguraProyecto;

    public Response getConfProyect(int id_proyecto) {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        ArrayList<LinkedHashMap> catBusquedaPG = interfacesConfiguraProyecto.getConfigura(id_proyecto);
        msj.setType("info, Se cargo la información");
        respuesta.setSuccess(true);
        respuesta.setList(catBusquedaPG);

        return respuesta;
    }

    public Response validaVar(String obj, String ip, String rutaShapes) {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();

        String validaVar = this.validaObjeto(obj, rutaShapes);
        msj.setType("info, Se cargo la información");
        respuesta.setSuccess(true);
        respuesta.setValor(validaVar);

        return respuesta;
    }

    public String validaObjeto(String obj, String rutaShapes)  {
        Mensaje respuesta = new Mensaje();
        Gson gson = new Gson();
        boolean res = true;

        //se inicia lo del archivo
        String fichero = "";

        try (BufferedReader br = new BufferedReader(new FileReader(rutaShapes))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                fichero += linea;
            }

        } catch (FileNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }

        //se lee el json
        JSONObject jsonDatos = new JSONObject(obj);
        Map<String, Object> toMap = jsonDatos.toMap();

        String valorValidar = "";

        String campoDetonador = "no_localizado";
        String no_localizado = toMap.get(campoDetonador).toString();
        //JSONObject data = new JSONObject(valida); 
        JSONObject data = new JSONObject(fichero);
        JSONArray jsonVar = data.getJSONArray(no_localizado);
        String salida = "correcto";

        for (int i = 0; i < jsonVar.length(); i++) {
            JSONObject jsonValida = jsonVar.getJSONObject(i);
            String campo = jsonValida.getString("campo");
            String validaVar = jsonValida.getString("valida");
            String error = jsonValida.getString("error");
            valorValidar = toMap.get(campo).toString();
            if (validaVar.equals("not false")) {
                if (valorValidar == null || valorValidar.equals("true") || valorValidar.equals("null")) {
                    res = false;
                    salida = error + ", " + campo + ",: " + valorValidar;
                    break;
                }
            }
            if (validaVar.equals("not null")) {
                if (valorValidar == null || valorValidar.equals("") || valorValidar.equals("null")) {
                    res = false;
                    salida = error + ", " + campo + ",: " + valorValidar;
                    break;
                }
            }
            if (validaVar.contains("longitud")) {
                String[] validacion = validaVar.split(":");
                int longitud = valorValidar.length();
                if (longitud > Integer.parseInt(validacion[1])) {
                    res = false;
                    salida = error + ", " + campo + ",: " + valorValidar;
                    break;
                }
            }
            if (validaVar.contains("valor")) {
                String[] validacion = validaVar.split(":");
                if (valorValidar.equals("0")) {
                    res = false;
                    salida = error + ", " + campo + ",: " + valorValidar;
                    break;
                }
            }
        }
        return salida;
    }
}
