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
public interface InterfacesVialidad {

    public ArrayList<LinkedHashMap> getCatVialidad();

    public LinkedHashMap getFiltroCatVialidad(String tipo_e10);

    public ArrayList<LinkedHashMap> getEntreVialidad(String ce, String cvegeo, long cveft);

    public ArrayList<LinkedHashMap> getEntreVialidadSinFrente(String x, String y);

}
