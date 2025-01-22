
package mx.org.inegi.sare_2024_altas_services.utils;

import java.util.List;
import java.util.Map;

public class ResponseLocal {
   

    private Mensaje messages;
    private List list;
    private String html;
    private Boolean success;
    private Integer confirmadas;
    private Integer gabinete;
    private Integer campo;
    private Integer pendiente;
    private List<String> divPedientes;
    private List<String> divOK;
    private List<String> divNOT;
    private List<String> divNC;
    private Integer total;
    private Object datos;
    private String titulo;

    public ResponseLocal() {
    }

    public ResponseLocal(Mensaje messages, List list, String html, Boolean success) {
        this.messages = messages;
        this.list = list;
        this.html = html;
        this.success = success;
    }

    public ResponseLocal(Mensaje messages, List list, String html, Boolean success, Integer confirmadas, Integer gabinete, Integer campo) {
        this.messages = messages;
        this.list = list;
        this.html = html;
        this.success = success;
        this.confirmadas = confirmadas;
        this.gabinete = gabinete;
        this.campo = campo;
    }

    public ResponseLocal(Mensaje messages, List list, String html, Boolean success, Integer confirmadas, Integer gabinete, Integer campo, Integer pendiente, List<String> divPedientes, List<String> divOK, List<String> divNOT, List<String> divNC) {
        this.messages = messages;
        this.list = list;
        this.html = html;
        this.success = success;
        this.confirmadas = confirmadas;
        this.gabinete = gabinete;
        this.campo = campo;
        this.pendiente = pendiente;
        this.divPedientes = divPedientes;
        this.divOK = divOK;
        this.divNOT = divNOT;
        this.divNC = divNC;
    }

    public ResponseLocal(Mensaje messages, List list, String html, Boolean success, Integer confirmadas, Integer gabinete, Integer campo, Integer pendiente, List<String> divPedientes, List<String> divOK, List<String> divNOT, List<String> divNC, Integer total, Map datos) {
        this.messages = messages;
        this.list = list;
        this.html = html;
        this.success = success;
        this.confirmadas = confirmadas;
        this.gabinete = gabinete;
        this.campo = campo;
        this.pendiente = pendiente;
        this.divPedientes = divPedientes;
        this.divOK = divOK;
        this.divNOT = divNOT;
        this.divNC = divNC;
        this.total = total;
        this.datos = datos;
    }

    

    /**
     * @return the messages
     */
    public Mensaje getMessages() {
        return messages;
    }

    /**
     * @param messages the messages to set
     */
    public void setMessages(Mensaje messages) {
        this.messages = messages;
    }

    /**
     * @return the list
     */
    public List getList() {
        return list;
    }

    /**
     * @param list the list to set
     */
    public void setList(List list) {
        this.list = list;
    }

    /**
     * @return the html
     */
    public String getHtml() {
        return html;
    }

    /**
     * @param html the html to set
     */
    public void setHtml(String html) {
        this.html = html;
    }

    /**
     * @return the success
     */
    public Boolean getSuccess() {
        return success;
    }

    /**
     * @param success the success to set
     */
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    /**
     * @return the confirmadas
     */
    public Integer getConfirmadas() {
        return confirmadas;
    }

    /**
     * @param confirmadas the confirmadas to set
     */
    public void setConfirmadas(Integer confirmadas) {
        this.confirmadas = confirmadas;
    }

    /**
     * @return the gabinete
     */
    public Integer getGabinete() {
        return gabinete;
    }

    /**
     * @param gabinete the gabinete to set
     */
    public void setGabinete(Integer gabinete) {
        this.gabinete = gabinete;
    }

    /**
     * @return the campo
     */
    public Integer getCampo() {
        return campo;
    }

    /**
     * @param campo the campo to set
     */
    public void setCampo(Integer campo) {
        this.campo = campo;
    }

    /**
     * @return the divPedientes
     */
    public List<String> getDivPedientes() {
        return divPedientes;
    }

    /**
     * @param divPedientes the divPedientes to set
     */
    public void setDivPedientes(List<String> divPedientes) {
        this.divPedientes = divPedientes;
    }

    /**
     * @return the divOK
     */
    public List<String> getDivOK() {
        return divOK;
    }

    /**
     * @param divOK the divOK to set
     */
    public void setDivOK(List<String> divOK) {
        this.divOK = divOK;
    }

    /**
     * @return the divNOT
     */
    public List<String> getDivNOT() {
        return divNOT;
    }

    /**
     * @param divNOT the divNOT to set
     */
    public void setDivNOT(List<String> divNOT) {
        this.divNOT = divNOT;
    }

    /**
     * @return the divNC
     */
    public List<String> getDivNC() {
        return divNC;
    }

    /**
     * @param divNC the divNC to set
     */
    public void setDivNC(List<String> divNC) {
        this.divNC = divNC;
    }

    public Integer getPendiente() {
        return pendiente;
    }

    public void setPendiente(Integer pendiente) {
        this.pendiente = pendiente;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Object getDatos() {
        return datos;
    }

    public void setDatos(Object datos) {
        this.datos = datos;
    }

    /**
     * @return the titulo
     */
    public String getTitulo() {
        return titulo;
    }

    /**
     * @param titulo the titulo to set
     */
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
}
