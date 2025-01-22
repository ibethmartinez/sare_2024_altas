/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingAsentamiento;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingCancelar;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingConfiguraProyecto;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingDesbloqueaId_ue;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingGuardar;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingIdentifica;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingJson;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingListBloqueados;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingPiso;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingPunteo;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingReportes;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingValidaCp;
import mx.org.inegi.sare_2024_altas_services.Backing.BackingVialidad;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author IBETH.MARTINEZ
 */
@RestController
public class ServiceController {

    @Autowired
    @Qualifier("backingConfiguraProyecto")
    private BackingConfiguraProyecto backingConfiguraProyecto;

    //********************************Servicios de CONFIGURACION DINAMICA***************************/
    //obtiene la configuracion del proyecto dinamicamente
    @RequestMapping(value = "confProyecto.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response confProyecPost(@RequestParam(value = "id_proyecto") int id_proyecto) throws Exception {
        return backingConfiguraProyecto.getConfProyect(id_proyecto);
    }

    //obtiene la configuracion del proyecto dinamicamente
    @RequestMapping(value = "confProyecto.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response confProyecGet(@RequestParam(value = "id_proyecto") int id_proyecto) throws Exception {
        return backingConfiguraProyecto.getConfProyect(id_proyecto);
    }

    @RequestMapping(value = "validaVar.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response validaVarUE(@RequestParam(value = "obj") String obj, HttpServletRequest request) throws Exception {
        String ip = request.getRemoteAddr();
        String rutaShapes = request.getServletContext().getRealPath("/WEB-INF/valida/datos.json");
        return backingConfiguraProyecto.validaVar(obj, ip, rutaShapes);
    }

    @RequestMapping(value = "validaVar.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response validaVarGet(@RequestParam(value = "obj") String obj, HttpServletRequest request) throws Exception {
        String ip = request.getRemoteAddr();
        String rutaShapes = request.getServletContext().getRealPath("/WEB-INF/valida/datos.json");
        return backingConfiguraProyecto.validaVar(obj, ip, rutaShapes);
    }

//********************************Servicios de esquema de datos***********************************/
    @Autowired
    @Qualifier("backingJson")
    private BackingJson backingJson;

    @RequestMapping(value = "getCargaTrabajo.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response cargaDatos(@RequestParam(value = "ce") String ce, @RequestParam(value = "id_tramo") long id_tramo, @RequestParam(value = "pag") int pag) throws Exception {
        return backingJson.getCargaTrabajo(ce, id_tramo, pag);
    }

    @RequestMapping(value = "getfiltroCargaTrabajo.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response filtroCargaTrabajo(@RequestParam(value = "id_ue") long id_ue,
            @RequestParam(value = "id_tramo") String id_tramo, @RequestParam(value = "ce") String ce, @RequestParam(value = "isRatificado") boolean isRatificado, 
            @RequestParam(value = "usuario") String usuario) throws Exception {
        return backingJson.filtroCargaTrabajo(id_ue, id_tramo, ce, isRatificado, usuario);
    }

    //Servicio trae los CE que le corresponden a cada usuario
    @RequestMapping(value = "getEdos.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response cargaDatos(@RequestParam(value = "usuario") String usuario) throws Exception {
        return backingJson.getEdos(usuario);
    }

//    @RequestMapping(value = "getCatalogoEdos.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//    public Response cargaCatEdos(@RequestParam(value = "ce") String ce) throws Exception {
//        return backingJson.getCatalogoEdos(ce);
//    }
    @RequestMapping(value = "getCargaTrabajo.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response cargaDatosGet(@RequestParam(value = "ce") String ce, @RequestParam(value = "id_tramo") long id_tramo, @RequestParam(value = "pag") int pag) throws Exception {
        return backingJson.getCargaTrabajo(ce, id_tramo, pag);
    }

    @RequestMapping(value = "getfiltroCargaTrabajo.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response filtroCargaTrabajoGet(@RequestParam(value = "id_ue") long id_ue,
            @RequestParam(value = "id_tramo") String id_tramo, @RequestParam(value = "ce") String ce, @RequestParam(value = "isRatificado") boolean isRatificado,
            @RequestParam(value = "usuario") String usuario) throws Exception {
        return backingJson.filtroCargaTrabajo(id_ue, id_tramo, ce, isRatificado, usuario);
    }

    @RequestMapping(value = "getCantPag.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCantPagGet(@RequestParam(value = "ce") String ce, @RequestParam(value = "id_tramo") long id_tramo) throws Exception {
        return backingJson.getCuantasPaginas(ce, id_tramo);
    }

    @RequestMapping(value = "getCantPag.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCantPag(@RequestParam(value = "ce") String ce, @RequestParam(value = "id_tramo") long id_tramo) throws Exception {
        return backingJson.getCuantasPaginas(ce, id_tramo);
    }

    @RequestMapping(value = "getEdos.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response cargaDatosGET(@RequestParam(value = "usuario") String usuario) throws Exception {
        return backingJson.getEdos(usuario);
    }
    
    @RequestMapping(value = "getTcCoestatales.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getTcCoestatalesGET() throws Exception {
        return backingJson.getTcCoestatales();
    }

    @RequestMapping(value = "getTcCoestatales.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getTcCoestatales() throws Exception {
        return backingJson.getTcCoestatales();
    }
    
    @Autowired
    @Qualifier("backingValidaCp")
    private BackingValidaCp backingValidaCp;

    @RequestMapping(value = "getCP.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCP(@RequestParam(value = "cve_ent") String cve_ent) throws Exception {
        return backingValidaCp.getCatalogoCP(cve_ent);
    }

    @RequestMapping(value = "getValidaCP.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCP(@RequestParam(value = "cp") String cp, @RequestParam(value = "cve_ent") String cve_ent) throws Exception {
        return backingValidaCp.getValidaCP(cp, cve_ent);
    }

    @RequestMapping(value = "getCP.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCPGet(@RequestParam(value = "cve_ent") String cve_ent) throws Exception {
        return backingValidaCp.getCatalogoCP(cve_ent);
    }

    @RequestMapping(value = "getValidaCP.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCPGet(@RequestParam(value = "cp") String cp, @RequestParam(value = "cve_ent") String cve_ent) throws Exception {
        return backingValidaCp.getValidaCP(cp, cve_ent);
    }

    @RequestMapping(value = "getE23a.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getE23aGet() throws Exception {
        return backingValidaCp.getTipE23a();
    }

    @RequestMapping(value = "getE23a.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getE23a() throws Exception {
        return backingValidaCp.getTipE23a();
    }

    @Autowired
    @Qualifier("backingAsentamiento")
    private BackingAsentamiento backingAsentamiento;

    @RequestMapping(value = "getCatAsentamiento.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatAsentamiento() throws Exception {
        return backingAsentamiento.getCatAsentamiento();
    }

    @RequestMapping(value = "getCatAsentamiento.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatAsentamientoGet() throws Exception {
        return backingAsentamiento.getCatAsentamiento();
    }

    @Autowired
    @Qualifier("backingPiso")
    private BackingPiso backingPiso;

    @RequestMapping(value = "getCatPiso.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatPisoGet() throws Exception {
        return backingPiso.getCatPiso();
    }

    @RequestMapping(value = "getCatPiso.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatPisoPost() throws Exception {
        return backingPiso.getCatPiso();
    }

    @RequestMapping(value = "getCatTipComercio.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatTipComercioGet() throws Exception {
        return backingPiso.getCatTipComercio();
    }

    @RequestMapping(value = "getCatTipComercio.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatTipComercio() throws Exception {
        return backingPiso.getCatTipComercio();
    }

    @Autowired
    @Qualifier("backingVialidad")
    private BackingVialidad backingVialidad;

    @RequestMapping(value = "getCatVialidad.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatVialidadGet() throws Exception {
        return backingVialidad.getCatVialidad();
    }

    @RequestMapping(value = "getCatVialidad.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getCatVialidad() throws Exception {
        return backingVialidad.getCatVialidad();
    }

    @RequestMapping(value = "getEntreVialidad.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getEntreVialidadGet() throws Exception {
        return backingVialidad.getCatVialidad();
    }

    @RequestMapping(value = "getEntreVialidad.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getEntreVialidad(@RequestParam(value = "ce") String ce, @RequestParam(value = "cvegeo") String cvegeo, @RequestParam(value = "cveft") long cveft) throws Exception {
        return backingVialidad.getEntreVialidad(ce, cvegeo, cveft);
    }

    @Autowired
    @Qualifier("backingPunteo")
    private BackingPunteo backingPunteo;

    //Inicia punteo  
    @RequestMapping(value = "punteo.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getPunteo(@RequestParam(value = "id_ue") long id_ue, @RequestParam(value = "ratificado") boolean ratificado, @RequestParam(value = "point") String point) throws Exception {
        return backingPunteo.getPunteo(id_ue, ratificado, point);
    }

    //Inicia punteo
    @RequestMapping(value = "punteo.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getPunteoGet(@RequestParam(value = "id_ue") long id_ue, @RequestParam(value = "ratificado") boolean ratificado, @RequestParam(value = "point") String point) throws Exception {
        return backingPunteo.getPunteo(id_ue, ratificado, point);
    }

    @Autowired
    @Qualifier("backingGuardar")
    private BackingGuardar backingGuardar;

    //Guarda el punteo
    @RequestMapping(value = "guardar.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getGuardarGet(@RequestParam(value = "proyecto") int proyecto, HttpServletRequest request, @RequestParam(value = "obj") String obj, @RequestParam(value = "usuario") String usuario) throws Exception {
        String ip = request.getRemoteAddr();
        return backingGuardar.guardaPunteo(proyecto, ip, obj, usuario);
    }

    //Guarda el punteo
    @RequestMapping(value = "guardar.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getGuardar(@RequestParam(value = "proyecto") int proyecto, HttpServletRequest request, @RequestParam(value = "obj") String obj, @RequestParam(value = "usuario") String usuario) throws Exception {
        String ip = request.getRemoteAddr();
        return backingGuardar.guardaPunteo(proyecto, ip, obj, usuario);
    }

    @Autowired
    @Qualifier("backingCancelar")
    private BackingCancelar backingCancelar;

    //Cancela punteo //cancela o desbloquea id_ue
    @RequestMapping(value = "cancelar.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getGuardar(@RequestParam(value = "id_ue") String id_ue, @RequestParam(value = "id_tramo") String id_tramo) throws Exception {
        String ip = "0:0:0:0:0:0:0";//request.getRemoteAddr();
       // return backingCancelar.getCancelar(id_ue, id_tramo, ip); //cancela o desbloquea id_ue
       return backingDesbloqueaIdUe.getDebloqueo(id_ue, id_tramo);
    }

    @RequestMapping(value = "cancelar.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getGuardarGet(@RequestParam(value = "id_ue") String id_ue, @RequestParam(value = "id_tramo") String id_tramo) throws Exception {
        String ip = "0:0:0:0:0:0:0";//request.getRemoteAddr();
        //return backingCancelar.getCancelar(id_ue, id_tramo, ip);//cancela o desbloquea id_ue
        return backingDesbloqueaIdUe.getDebloqueo(id_ue, id_tramo);
    }

    @Autowired
    @Qualifier("backingListBloqueados")
    private BackingListBloqueados backingListBloqueados;

    @RequestMapping(value = "getListBloqueados.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getListBloqueados(@RequestParam(value = "ce") String ce) throws Exception {
        return backingListBloqueados.obtieneLisBloqueado(ce);
    }

    @RequestMapping(value = "getListBloqueados.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getListBloqueadosGet(@RequestParam(value = "ce") String ce) throws Exception {
        return backingListBloqueados.obtieneLisBloqueado(ce);
    }

    @RequestMapping(value = "getListBloqueadosPag.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getListBloqueadoPag(@RequestParam(value = "ce") String ce, @RequestParam(value = "pag") int pag) throws Exception {
        return backingListBloqueados.obtieneLisBloqueadoPag(ce, pag);
    }

    @RequestMapping(value = "getListBloqueadosPag.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getListBloqueadoPagGet(@RequestParam(value = "ce") String ce, @RequestParam(value = "pag") int pag) throws Exception {
        return backingListBloqueados.obtieneLisBloqueadoPag(ce, pag);
    }

    @RequestMapping(value = "getListBloqueadoCantPag.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getListBloqueadoTotPag(@RequestParam(value = "ce") String ce) throws Exception {
        return backingListBloqueados.getBloqueadosTotPag(ce);
    }

    @RequestMapping(value = "getListBloqueadoCantPag.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getListBloqueadoTotPagGet(@RequestParam(value = "ce") String ce) throws Exception {
        return backingListBloqueados.getBloqueadosTotPag(ce);
    }

    @Autowired
    @Qualifier("backingDesbloqueaId_ue")
    private BackingDesbloqueaId_ue backingDesbloqueaIdUe;

    @RequestMapping(value = "getDesbloqueaIdUe.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getDesbloqueaIdUe(@RequestParam(value = "id_ue") String id_ue, @RequestParam(value = "id_tramo") String id_tramo) throws Exception {
        return backingDesbloqueaIdUe.getDebloqueo(id_ue, id_tramo);
    }

    @RequestMapping(value = "getDesbloqueaIdUe.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getDesbloqueaIdUeGet(@RequestParam(value = "id_ue") String id_ue, @RequestParam(value = "id_tramo") String id_tramo) throws Exception {
        return backingDesbloqueaIdUe.getDebloqueo(id_ue, id_tramo);
    }

    @Autowired
    @Qualifier("backingIdentifica")
    private BackingIdentifica backingIdentifica;

    @RequestMapping(value = "getIdentifica.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response getIdentifica(@RequestParam(value = "x") String x, @RequestParam(value = "y") String y, @RequestParam(value = "buffer") String buffer) throws Exception {
        return backingIdentifica.getIdentifica(x, y, buffer);
    }

    @RequestMapping(value = "getIdentifica.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)

    public Response getIdentificaGet(@RequestParam(value = "x") String x, @RequestParam(value = "y") String y,
            @RequestParam(value = "buffer") String buffer) throws Exception {
        return backingIdentifica.getIdentifica(x, y, buffer);
    }

    
    @Autowired
    @Qualifier("BackingReportes")
    private BackingReportes backingReportes;
    
      @RequestMapping(value = "Reportes.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response ReportesGet( @RequestParam(value = "tipo") String tipo, @RequestParam(value = "reporte") String reporte, @RequestParam(value = "ce") String ce, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return backingReportes.getReporte(tipo, reporte, request, response,ce);
    }
}
