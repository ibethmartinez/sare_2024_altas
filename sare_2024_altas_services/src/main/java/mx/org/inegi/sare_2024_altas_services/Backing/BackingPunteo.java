/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import com.google.gson.Gson;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_services.utils.Mensaje;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesPunteo;
import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfacesVialidad;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Service("backingPunteo")
public class BackingPunteo {

    @Autowired
    @Qualifier("daoPunteo")
    InterfacesPunteo daoPunteo;

    @Autowired
    @Qualifier("daoVialidad")
    private InterfacesVialidad interfaceVialidad;

    public Response getPunteo(long id_ue, boolean ratificado, String point) {

        Response respuesta = new Response();
        Mensaje msj = new Mensaje();
        LinkedHashMap tipoVialNull = new LinkedHashMap();
        LinkedHashMap tipoVialNull2 = new LinkedHashMap();
        LinkedHashMap tipoVialNull3 = new LinkedHashMap();
        ArrayList<LinkedHashMap> entreVialidad = null;
        try {
            String punto = URLDecoder.decode(point, "UTF-8");
            LinkedHashMap<String, String> dat = daoPunteo.punteo(id_ue, ratificado, punto);
            //   dat.put("id_tramo", "99999");

            if (dat.get("error") == null) {
                String varCe = dat.get("ce");
                String varCvegeo = dat.get("cvegeo");

                if (dat.get("mod_cat").equalsIgnoreCase("1")) {//punteo normal
                    if (dat.get("tipo_punteo").equalsIgnoreCase("Amanzanado")) {
                        if (dat.get("e07") == null || dat.get("e07").equalsIgnoreCase("") || dat.get("e07").equalsIgnoreCase("null")) {
                            respuesta.setMensaje(new Mensaje("false", "El punteo debe ser en el frente de una manzana "));
                            respuesta.setDatos(dat);
                        }
                        if (dat.get("tipo_e10") != null && (!dat.get("tipo_e10").equals("") || !dat.get("tipo_e10").equals(null) || !dat.get("tipo_e10").equals("null"))) {
                            String varTipoViali = (String) dat.get("tipo_e10");
                            LinkedHashMap vialidad = interfaceVialidad.getFiltroCatVialidad(varTipoViali);
                            if (vialidad == null) {
                                dat.put("tipo_e10n", dat.get("tipo_e10"));
                                dat.put("tipo_e10", "99");//se pone 99 otro Especifique
                            } else {
                                dat.put("tipo_e10n", dat.get("tipo_e10"));
                                dat.put("tipo_e10", vialidad.get("cve_vialidad").toString());
                            }

                        } else {
                            dat.put("tipo_e10n", dat.get("tipo_e10"));
                            dat.put("tipo_e10", "null");
                        }
                    } else if (dat.get("tipo_punteo").equalsIgnoreCase("NoAmanzanado")) {
                        if (dat.get("e05").equalsIgnoreCase("") || dat.get("e05").equalsIgnoreCase(null) || dat.get("e05").equalsIgnoreCase("null")) {
                            dat.put("e05", "5000");
                        }
                        if (dat.get("e07").equalsIgnoreCase("")) {
                            dat.put("e07", "900");
                        }

                    }
//                    entreVialidad = interfaceVialidad.getEntreVialidadSinFrente(dat.get("x_val"), dat.get("y_val"));
//                    dat.put("tipo_e10", entreVialidad.get(1).get("tipo_e10").toString());
//                    dat.put("e10", entreVialidad.get(1).get("tipo_e10n").toString());

                } else if (dat.get("mod_cat").equalsIgnoreCase("2")) {//punteo rural
                    //punteo amanzanado dentro de localidad
                    if (dat.get("tipo_punteo").equalsIgnoreCase("Amanzanado")) {
                        if (dat.get("e07").equalsIgnoreCase("")) {
                            dat.put("e07", "900");
                        }
                    } else if (dat.get("tipo_punteo").equalsIgnoreCase("NoAmanzanado")) {
                        if (dat.get("e07").equalsIgnoreCase("") && dat.get("e05").equalsIgnoreCase("")) {
                            dat.put("e05", "5000");
                            dat.put("e07", "901");
                        } //else {
//                            //punteo rural dentro de localidad y fuera de la localidad
//                            if (dat.get("e07").equalsIgnoreCase("900") && dat.get("e05").equalsIgnoreCase("")) {
//                                dat.put("e05", "5000");
//                                dat.put("e07", "901");
//                            }
//                        }
                    }

                }//fin mod_cat=2
                //Si no trae frente rescata entre vialidades con punto o con base en el frente
                if (!(dat.get("cveft") == null || dat.get("cveft").equalsIgnoreCase("null") || dat.get("cveft").equalsIgnoreCase("")) && dat.get("tipo_punteo").equalsIgnoreCase("Amanzanado")) {
                    long varCveft = Integer.parseInt(dat.get("cveft"));
                    entreVialidad = interfaceVialidad.getEntreVialidad(varCe, varCvegeo, varCveft);

                } else {

                    entreVialidad = interfaceVialidad.getEntreVialidadSinFrente(dat.get("x_val"), dat.get("y_val"));
                    dat.put("tipo_e10", entreVialidad.get(1).get("tipo_e10").toString());
                    dat.put("e10", entreVialidad.get(1).get("tipo_e10n").toString());
                    entreVialidad.remove(1);
                }
                String jsonNinguno;
                String jsonVial;
                int caso = entreVialidad.size();
                String var = "";
                for (int a = 0; a < 3; a++) {
                    //entreVialidad.add(tipoVialNull);
                    switch (a) {
                        case 0:
                            var = "null";
                            tipoVialNull.put("tipovial", "Ninguno");
                            tipoVialNull.put("tipo_e10n", "Ninguno");
                            tipoVialNull.put("cvevial", var);
                            tipoVialNull.put("tipo_e10", "5");
                            tipoVialNull.put("orden",caso);
                            break;
                        case 1:
                            var = "FFF";
                            tipoVialNull2.put("tipovial", "Ninguno");
                            tipoVialNull2.put("tipo_e10n", "Ninguno");
                            tipoVialNull2.put("cvevial", var);
                            tipoVialNull2.put("tipo_e10", "5");
                            tipoVialNull2.put("orden",caso+ 1);
                            break;
                        case 2:
                            var = "999";
                            tipoVialNull3.put("tipovial", "Ninguno");
                            tipoVialNull3.put("tipo_e10n", "Ninguno");
                            tipoVialNull3.put("cvevial", var);
                            tipoVialNull3.put("tipo_e10", "5");
                            tipoVialNull3.put("orden",caso+2);
                            break;
                        default:
                            var = "nulo";
                            tipoVialNull.put("tipovial", "Ninguno");
                            tipoVialNull.put("tipo_e10n", "Ninguno");
                            tipoVialNull.put("cvevial", var);
                            tipoVialNull.put("tipo_e10", "5");
                            tipoVialNull.put("orden", caso+1);
                            break;

                    }

                }

                switch (caso) {
//                    case 0:
//                        entreVialidad.add(tipoVialNull);
//                        entreVialidad.add(tipoVialNull);
//                        entreVialidad.add(tipoVialNull);
//                        jsonVial = new Gson().toJson(entreVialidad);
//                        dat.put("te10a", jsonVial.toString());
//                        dat.put("te10b", jsonVial.toString());
//                        dat.put("te10c", jsonVial.toString());
//                        break;

                    case 1:
                        entreVialidad.add(tipoVialNull);
                        entreVialidad.add(tipoVialNull2);
                        entreVialidad.add(tipoVialNull3);
                        jsonVial = new Gson().toJson(entreVialidad);
                        dat.put("e10a", jsonVial.toString());
                        dat.put("e10b", jsonVial.toString());
                        dat.put("e10c", jsonVial.toString());
                        break;
                    case 2:
                        entreVialidad.add(tipoVialNull);
                        entreVialidad.add(tipoVialNull2);
                        jsonVial = new Gson().toJson(entreVialidad);
                        dat.put("e10a", jsonVial.toString());
                        dat.put("e10b", jsonVial.toString());
                        dat.put("e10c", jsonVial.toString());
                        break;
                    case 3:
                        entreVialidad.add(tipoVialNull);
                        jsonVial = new Gson().toJson(entreVialidad);
                        dat.put("e10a", jsonVial.toString());
                        dat.put("e10b", jsonVial.toString());
                        dat.put("e10c", jsonVial.toString());
                        break;
                    default:
                        tipoVialNull.put("orden", caso);
                        entreVialidad.add(tipoVialNull);
                        jsonVial = new Gson().toJson(entreVialidad);
                        dat.put("e10a", jsonVial.toString());
                        dat.put("e10b", jsonVial.toString());
                        dat.put("e10c", jsonVial.toString());
                        break;

//                }
                    }

                respuesta.setMensaje(new Mensaje("true", "Se realizo el punteo correctamente"));
                respuesta.setDatos(dat);

            } else {
                respuesta.setMensaje(new Mensaje("false", " " + dat.get("error")));
                respuesta.setDatos(dat);

            }

        } catch (Exception ex) {
            ex.printStackTrace();
            msj.setMessages("error");
            respuesta.setSuccess(false);
        }
        //respuesta.setMensaje(msj);
        return respuesta;
    }

}
