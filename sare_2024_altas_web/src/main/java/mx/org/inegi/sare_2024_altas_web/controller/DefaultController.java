/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_web.controller;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import mx.org.inegi.sare_2024_altas_services.Backing.BakingUsuarioBitacora;
import mx.org.inegi.sare_2024_altas_web.config.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

@Controller
public class DefaultController {

    String KEY = "CE2024SARE2024";

    @Autowired
    @Qualifier("bakingUsuarioBitacora")
    private BakingUsuarioBitacora bakingUsuarioBitacora;
    
   
    @RequestMapping(value = "/index.html", method = RequestMethod.GET)
    public String index2() {
        String resul = "";
        Date fecha = new Date();

        resul = "index";

        return resul;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(
            @RequestParam(value = "ce", defaultValue = "") String ce,
            @RequestParam(value = "usuario", defaultValue = "") String usuario,
            @RequestParam(value = "token", defaultValue = "") String token,
            HttpServletRequest request
    ) {
        String regreso = "index";
        Const ambien = new Const();        
        HttpSession session = request.getSession(true);
        session.setAttribute("entonnoConexionBD", ambien.esquema);
        boolean matFound;
        boolean matCe;
        matFound = valida(usuario, 1);
        matCe = valida(ce, 2);

        if ((ce != null && !ce.equals("") && !ce.equals("null"))
                && (usuario != null && !usuario.equals("") && !usuario.equals("null")) && (matFound && matCe)) {
            String servicio = "DGSW";
            try {
                if (!token.equals("DSGW")) {
                    Jws<Claims> claims = Jwts.parser()
                            .setSigningKey(DatatypeConverter.parseBase64Binary(KEY))
                            .parseClaimsJws(token);
                    Claims body = claims.getBody();
                    servicio = (String) body.get("nombreServ");
                }
                String remoteAddr = request.getRemoteAddr();
                try {
                    bakingUsuarioBitacora.guardarBitacora(usuario, remoteAddr, ce);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            } catch (ExpiredJwtException e) {
                session.setAttribute("errorSesion", "error de token");
                return "error";
            } catch (SignatureException e) {
                session.setAttribute("errorSesion", "error de token");
                return "error";
            } catch (Exception e) {
                session.setAttribute("errorSesion", "error de token");
                return "error";
            }
        } else {
            if (ce == null || ce.equals("") || ce.equals("null")) {
                session.setAttribute("errorSesion", "falta la clave operativa");
            }
            if (usuario == null || usuario.equals("") || usuario.equals("null")) {
                session.setAttribute("errorSesion", "falta el id regional");
            }
            regreso = "error";
        }
        return regreso;
    }

    @RequestMapping(value = "/reinicio.html", method = RequestMethod.GET)
    public String reinicio(ModelMap map) {
        return "reinicio";
    }

    @RequestMapping(value = "/error.html", method = RequestMethod.GET)
    public String index2(ModelMap map) {
        return "error";
    }

    //valida parametros de sesion
    public boolean valida(String varValida, int tipo) {
        boolean resp = false;
        boolean matFound;
        int longitud;
        boolean validacion;
        if (tipo == 1) {//Viene de usuario
            validacion = varValida.contains(".");
            if (validacion) {
                longitud = varValida.length();
                if (longitud <= 2) {//es de longitud
                    resp = false;
                } else {//es de formato
                    Pattern pat = Pattern.compile("([a-z.a-z])({2,20})+$", Pattern.CASE_INSENSITIVE);
                    Matcher mat = pat.matcher(varValida);
                    matFound = mat.find();
                    resp = matFound;
                }

            } else {
                resp = false;
            }
        } else if (tipo == 2) {
            int valiInt = 0;
            longitud = varValida.length();
            if (longitud <= 0 || longitud >= 3) {//es de longitud
                resp = false;
            } else {
                valiInt = Integer.parseInt(varValida);
                if (varValida.equalsIgnoreCase("00") || valiInt <= 34) {
                    //es de formato
                    Pattern pat = Pattern.compile("([0-9]{2,2})+$", Pattern.CASE_INSENSITIVE);
                    Matcher mat = pat.matcher(varValida);
                    matFound = mat.find();
                    resp = matFound;

                } else {
                    resp = false;
                }

            }
        }

        return resp;
    }
}
