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
public interface InterfaceEntidad {

    public ArrayList<LinkedHashMap> getEdos(String usuario);

    public LinkedHashMap getCatalogoEdos(String ce);

    public ArrayList<LinkedHashMap> getTcCoestatales();

}
