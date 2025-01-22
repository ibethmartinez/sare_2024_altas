/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Interfaces;

import java.util.ArrayList;
import java.util.LinkedHashMap;

/**
 *
 * @author IBETH.MARTINEZ
 */
public interface InterfacesJson {

    public ArrayList<LinkedHashMap> cargaTrabajo(String ce, long id_tramo, int pag);

    public ArrayList<LinkedHashMap> filtroCargaTrabajo(long id_ue, String tramo, String ce, Boolean isRatificado);

    public ArrayList<LinkedHashMap> obtieneCuantasPaginas(String ce, long id_tramo);

    public LinkedHashMap setUeComplemento(long id_ue, String usuario, String ce);

    public LinkedHashMap getBloquea(long id_ue);

    public String getBuscaCE(long id_ue);
}
