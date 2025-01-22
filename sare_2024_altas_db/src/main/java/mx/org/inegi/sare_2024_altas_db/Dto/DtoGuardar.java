/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Dto;

import java.util.LinkedHashMap;

/**
 *
 * @author IBETH.MARTINEZ
 */
public class DtoGuardar {

    private String ce;
    private String id_ue;
    private String id_ue_padre;
    private String e08;
    private String e09;
    private String e23a;
    private String e03;
    private String e04;
    private String e05;
    private String e06;
    private String e07;
    private String tipo_e10;
    private String te10;
    private String e10;
    private String e11;
    private String e11a;
    private String e13;
    private String e13a;
    private String e12;
    private String tipo_e12p;
    private String te12p;
    private String tipo_e14;
    private String te14;
    private String e14;
    private String e14_a;
    private String tipo_e10a;
    private String te10a;
    private String e10a;
    private String tipo_e10b;
    private String te10b;
    private String e10b;
    private String tipo_e10c;
    private String te10c;
    private String e10c;
    private String e16;
    private String c145;
    private String tipo_e19;
    private String te19;
    private String e19;
    private String e20;
    private String x_val;
    private String y_val;
    private String c154;
    private String c154_v;
    private String id_tramo;
    private String observa;
    private String fecha_ac;
    private String fecha_carga;
    private String f_integra;
    private String the_geom_merc;
    private String st_sare;
    private String id;
    private String sare_st_time;
    private String es_ratificable;
    private String e03n;
    private String e04n;
    private String e05n;
    private String bounds;
    private String no_localizado;
    private String ip;
    private String cvegeo;

    public DtoGuardar(String ce, String id_ue, String id_ue_padre, String e08, String e09, String e23a, String e03, String e04, String e05, String e06, String e07, String tipo_e10, String te10, String e10, String e11, String e11a, String e13, String e13a, String e12, String tipo_e12p, String te12p, String tipo_e14, String te14, String e14, String e14_a, String tipo_e10a, String te10a, String e10a, String tipo_e10b, String te10b, String e10b, String tipo_e10c, String te10c, String e10c, String e16, String c145, String tipo_e19, String te19, String e19, String e20, String x_val, String y_val, String c154, String c154_v, String id_tramo, String observa, String fecha_ac, String fecha_carga, String f_integra, String the_geom_merc, String st_sare, String id, String sare_st_time, String es_ratificable, String e03n, String e04n, String e05n, String bounds, String no_localizado, String ip, String cvegeo) {
        this.ce = ce;
        this.id_ue = id_ue;
        this.id_ue_padre = id_ue_padre;
        this.e08 = e08;
        this.e09 = e09;
        this.e23a = e23a;
        this.e03 = e03;
        this.e04 = e04;
        this.e05 = e05;
        this.e06 = e06;
        this.e07 = e07;
        this.tipo_e10 = tipo_e10;
        this.te10 = te10;
        this.e10 = e10;
        this.e11 = e11;
        this.e11a = e11a;
        this.e13 = e13;
        this.e13a = e13a;
        this.e12 = e12;
        this.tipo_e12p = tipo_e12p;
        this.te12p = te12p;
        this.tipo_e14 = tipo_e14;
        this.te14 = te14;
        this.e14 = e14;
        this.e14_a = e14_a;
        this.tipo_e10a = tipo_e10a;
        this.te10a = te10a;
        this.e10a = e10a;
        this.tipo_e10b = tipo_e10b;
        this.te10b = te10b;
        this.e10b = e10b;
        this.tipo_e10c = tipo_e10c;
        this.te10c = te10c;
        this.e10c = e10c;
        this.e16 = e16;
        this.c145 = c145;
        this.tipo_e19 = tipo_e19;
        this.te19 = te19;
        this.e19 = e19;
        this.e20 = e20;
        this.x_val = x_val;
        this.y_val = y_val;
        this.c154 = c154;
        this.c154_v = c154_v;
        this.id_tramo = id_tramo;
        this.observa = observa;
        this.fecha_ac = fecha_ac;
        this.fecha_carga = fecha_carga;
        this.f_integra = f_integra;
        this.the_geom_merc = the_geom_merc;
        this.st_sare = st_sare;
        this.id = id;
        this.sare_st_time = sare_st_time;
        this.es_ratificable = es_ratificable;
        this.e03n = e03n;
        this.e04n = e04n;
        this.e05n = e05n;
        this.bounds = bounds;
        this.no_localizado = no_localizado;
        this.ip = ip;
        this.cvegeo = cvegeo;
    }

    public LinkedHashMap datosAdd(DtoGuardar obj) {
        LinkedHashMap datos = new LinkedHashMap();
        datos.put("ce", obj.ce);
        datos.put("id_ue", obj.id_ue);
        datos.put("id_ue_padre", obj.id_ue_padre);
        datos.put("e08", obj.e08);
        datos.put("e09", obj.e09);
        datos.put("e23a", obj.e23a);
        datos.put("e03", obj.e03);
        datos.put("e04", obj.e04);
        datos.put("e05", obj.e05);
        datos.put("e06", obj.e06);
        datos.put("e07", obj.e07);
        datos.put("tipo_e10", obj.tipo_e10);
        datos.put("te10", obj.te10);
        datos.put("e10", obj.e10);
        datos.put("e11", obj.e11);
        datos.put("e11a", obj.e11a);
        datos.put("e13", obj.e13);
        datos.put("e13a", obj.e13a);
        datos.put("e12", obj.e12);
        datos.put("tipo_e12p", obj.tipo_e12p);
        datos.put("te12p", obj.te12p);
        datos.put("tipo_e14", obj.tipo_e14);
        datos.put("te14", obj.te14);
        datos.put("e14", obj.e14);
        datos.put("e14_a", obj.e14_a);
        datos.put("tipo_e10a", obj.tipo_e10a);
        datos.put("te10a", obj.te10a);
        datos.put("e10a", obj.e10a);
        datos.put("tipo_e10b", obj.tipo_e10b);
        datos.put("te10b", obj.te10b);
        datos.put("e10b", obj.e10b);
        datos.put("tipo_e10c", obj.tipo_e10c);
        datos.put("te10c", obj.te10c);
        datos.put("e10c", obj.e10c);
        datos.put("e16", obj.e16);
        datos.put("c145", obj.c145);
        datos.put("tipo_e19", obj.tipo_e19);
        datos.put("te19", obj.te19);
        datos.put("e19", obj.e19);
        datos.put("e20", obj.e20);
        datos.put("x_val", obj.x_val);
        datos.put("y_val", obj.y_val);
        datos.put("c154", obj.c154);
        datos.put("c154_v", obj.c154_v);
        datos.put("id_tramo", obj.id_tramo);
        datos.put("observa", obj.observa);
        datos.put("fecha_ac", obj.fecha_ac);
        datos.put("fecha_carga", obj.fecha_carga);
        datos.put("f_integra", obj.f_integra);
        datos.put("the_geom_merc", obj.the_geom_merc);
        datos.put("st_sare", obj.st_sare);
        datos.put("id", obj.id);
        datos.put("sare_st_time", obj.sare_st_time);
        datos.put("es_ratificable", obj.es_ratificable);
        datos.put("e03n", obj.e03n);
        datos.put("e04n", obj.e04n);
        datos.put("e05n", obj.e05n);
        datos.put("bounds", obj.bounds);
        datos.put("no_localizado", obj.no_localizado);
        datos.put("ip", obj.ip);
        datos.put("cvegeo", obj.cvegeo);

        return datos;
    }

    public DtoGuardar() {

    }

    public String getCvegeo() {
        return cvegeo;
    }

    public void setCvegeo(String cvegeo) {
        this.cvegeo = cvegeo;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getCe() {
        return ce;
    }

    public void setCe(String ce) {
        this.ce = ce;
    }

    public String getId_ue() {
        return id_ue;
    }

    public void setId_ue(String id_ue) {
        this.id_ue = id_ue;
    }

    public String getId_ue_padre() {
        return id_ue_padre;
    }

    public void setId_ue_padre(String id_ue_padre) {
        this.id_ue_padre = id_ue_padre;
    }

    public String getE08() {
        return e08;
    }

    public void setE08(String e08) {
        this.e08 = e08;
    }

    public String getE09() {
        return e09;
    }

    public void setE09(String e09) {
        this.e09 = e09;
    }

    public String getE23a() {
        return e23a;
    }

    public void setE23a(String e23a) {
        this.e23a = e23a;
    }

    public String getE03() {
        return e03;
    }

    public void setE03(String e03) {
        this.e03 = e03;
    }

    public String getE04() {
        return e04;
    }

    public void setE04(String e04) {
        this.e04 = e04;
    }

    public String getE05() {
        return e05;
    }

    public void setE05(String e05) {
        this.e05 = e05;
    }

    public String getE06() {
        return e06;
    }

    public void setE06(String e06) {
        this.e06 = e06;
    }

    public String getE07() {
        return e07;
    }

    public void setE07(String e07) {
        this.e07 = e07;
    }

    public String getTipo_e10() {
        return tipo_e10;
    }

    public void setTipo_e10(String tipo_e10) {
        this.tipo_e10 = tipo_e10;
    }

    public String getTe10() {
        return te10;
    }

    public void setTe10(String te10) {
        this.te10 = te10;
    }

    public String getE10() {
        return e10;
    }

    public void setE10(String e10) {
        this.e10 = e10;
    }

    public String getE11() {
        return e11;
    }

    public void setE11(String e11) {
        this.e11 = e11;
    }

    public String getE11a() {
        return e11a;
    }

    public void setE11a(String e11a) {
        this.e11a = e11a;
    }

    public String getE13() {
        return e13;
    }

    public void setE13(String e13) {
        this.e13 = e13;
    }

    public String getE13a() {
        return e13a;
    }

    public void setE13a(String e13a) {
        this.e13a = e13a;
    }

    public String getE12() {
        return e12;
    }

    public void setE12(String e12) {
        this.e12 = e12;
    }

    public String getTipo_e12p() {
        return tipo_e12p;
    }

    public void setTipo_e12p(String tipo_e12p) {
        this.tipo_e12p = tipo_e12p;
    }

    public String getTe12p() {
        return te12p;
    }

    public void setTe12p(String te12p) {
        this.te12p = te12p;
    }

    public String getTipo_e14() {
        return tipo_e14;
    }

    public void setTipo_e14(String tipo_e14) {
        this.tipo_e14 = tipo_e14;
    }

    public String getTe14() {
        return te14;
    }

    public void setTe14(String te14) {
        this.te14 = te14;
    }

    public String getE14() {
        return e14;
    }

    public void setE14(String e14) {
        this.e14 = e14;
    }

    public String getE14_a() {
        return e14_a;
    }

    public void setE14_a(String e14_a) {
        this.e14_a = e14_a;
    }

    public String getTipo_e10a() {
        return tipo_e10a;
    }

    public void setTipo_e10a(String tipo_e10a) {
        this.tipo_e10a = tipo_e10a;
    }

    public String getTe10a() {
        return te10a;
    }

    public void setTe10a(String te10a) {
        this.te10a = te10a;
    }

    public String getE10a() {
        return e10a;
    }

    public void setE10a(String e10a) {
        this.e10a = e10a;
    }

    public String getTipo_e10b() {
        return tipo_e10b;
    }

    public void setTipo_e10b(String tipo_e10b) {
        this.tipo_e10b = tipo_e10b;
    }

    public String getTe10b() {
        return te10b;
    }

    public void setTe10b(String te10b) {
        this.te10b = te10b;
    }

    public String getE10b() {
        return e10b;
    }

    public void setE10b(String e10b) {
        this.e10b = e10b;
    }

    public String getTipo_e10c() {
        return tipo_e10c;
    }

    public void setTipo_e10c(String tipo_e10c) {
        this.tipo_e10c = tipo_e10c;
    }

    public String getTe10c() {
        return te10c;
    }

    public void setTe10c(String te10c) {
        this.te10c = te10c;
    }

    public String getE10c() {
        return e10c;
    }

    public void setE10c(String e10c) {
        this.e10c = e10c;
    }

    public String getE16() {
        return e16;
    }

    public void setE16(String e16) {
        this.e16 = e16;
    }

    public String getC145() {
        return c145;
    }

    public void setC145(String c145) {
        this.c145 = c145;
    }

    public String getTipo_e19() {
        return tipo_e19;
    }

    public void setTipo_e19(String tipo_e19) {
        this.tipo_e19 = tipo_e19;
    }

    public String getTe19() {
        return te19;
    }

    public void setTe19(String te19) {
        this.te19 = te19;
    }

    public String getE19() {
        return e19;
    }

    public void setE19(String e19) {
        this.e19 = e19;
    }

    public String getE20() {
        return e20;
    }

    public void setE20(String e20) {
        this.e20 = e20;
    }

    public String getX_val() {
        return x_val;
    }

    public void setX_val(String x_val) {
        this.x_val = x_val;
    }

    public String getY_val() {
        return y_val;
    }

    public void setY_val(String y_val) {
        this.y_val = y_val;
    }

    public String getC154() {
        return c154;
    }

    public void setC154(String c154) {
        this.c154 = c154;
    }

    public String getC154_v() {
        return c154_v;
    }

    public void setC154_v(String c154_v) {
        this.c154_v = c154_v;
    }

    public String getId_tramo() {
        return id_tramo;
    }

    public void setId_tramo(String id_tramo) {
        this.id_tramo = id_tramo;
    }

    public String getObserva() {
        return observa;
    }

    public void setObserva(String observa) {
        this.observa = observa;
    }

    public String getFecha_ac() {
        return fecha_ac;
    }

    public void setFecha_ac(String fecha_ac) {
        this.fecha_ac = fecha_ac;
    }

    public String getFecha_carga() {
        return fecha_carga;
    }

    public void setFecha_carga(String fecha_carga) {
        this.fecha_carga = fecha_carga;
    }

    public String getF_integra() {
        return f_integra;
    }

    public void setF_integra(String f_integra) {
        this.f_integra = f_integra;
    }

    public String getThe_geom_merc() {
        return the_geom_merc;
    }

    public void setThe_geom_merc(String the_geom_merc) {
        this.the_geom_merc = the_geom_merc;
    }

    public String getSt_sare() {
        return st_sare;
    }

    public void setSt_sare(String st_sare) {
        this.st_sare = st_sare;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSare_st_time() {
        return sare_st_time;
    }

    public void setSare_st_time(String sare_st_time) {
        this.sare_st_time = sare_st_time;
    }

    public String getEs_ratificable() {
        return es_ratificable;
    }

    public void setEs_ratificable(String es_ratificable) {
        this.es_ratificable = es_ratificable;
    }

    public String getE03n() {
        return e03n;
    }

    public void setE03n(String e03n) {
        this.e03n = e03n;
    }

    public String getE04n() {
        return e04n;
    }

    public void setE04n(String e04n) {
        this.e04n = e04n;
    }

    public String getE05n() {
        return e05n;
    }

    public void setE05n(String e05n) {
        this.e05n = e05n;
    }

    public String getBounds() {
        return bounds;
    }

    public void setBounds(String bounds) {
        this.bounds = bounds;
    }

    public String getNo_localizado() {
        return no_localizado;
    }

    public void setNo_localizado(String no_localizado) {
        this.no_localizado = no_localizado;
    }

}
