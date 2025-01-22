/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Interfaces;

import java.util.LinkedHashMap;
import mx.org.inegi.sare_2024_altas_db.Dto.DtoGuardar;

/**
 *
 * @author IBETH.MARTINEZ
 */
public interface InterfacesGuadar {
     public double setGuadar(int proyecto, DtoGuardar obj, String usuario) ;
     public LinkedHashMap setGuadar(int proyecto, String obj, String usuario);
    
}
