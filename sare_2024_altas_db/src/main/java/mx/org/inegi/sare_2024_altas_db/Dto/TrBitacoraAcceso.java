/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.Dto;

/**
 *
 * @author FABIOLA.RUIZ
 */
public class TrBitacoraAcceso {
    
    private String ip;
    private String usuario;
    private String ce;

    public TrBitacoraAcceso() {
    }

    public TrBitacoraAcceso(String ip, String usuario, String ce) {
        this.ip = ip;
        this.usuario = usuario;
        this.ce = ce;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getCe() {
        return ce;
    }

    public void setCe(String ce) {
        this.ce = ce;
    }

        
}
