package mx.org.inegi.sare_2024_altas_services.utils;

/**
 *
 * @author IBETH.MARTINEZ
 */
import java.util.List;
//import mx.org.inegi.sare_suc_db.Dto.cat_usuarios;

public class Response {

    private Mensaje mensaje;
    private List list;
    private String valor;
    private Boolean success;
    private Integer campo;
    private Integer status;
    private Object datos;
   // private cat_usuarios usuario;

//    public Response(Mensaje mensaje, List list, String valor, Boolean success, Integer campo, Integer status, Object datos, cat_usuarios usuario) {
//        this.mensaje = mensaje;
//        this.list = list;
//        this.valor = valor;
//        this.success = success;
//        this.campo = campo;
//        this.status = status;
//        this.datos = datos;
//        //this.usuario = usuario;
//    }

    public Response(Mensaje mensaje, List list, String valor, Boolean success, Integer campo, Integer status, Object datos) {
        this.mensaje = mensaje;
        this.list = list;
        this.valor = valor;
        this.success = success;
        this.campo = campo;
        this.status = status;
        this.datos = datos;
    }

    public Response() {
    }

    public Response(Mensaje mensaje, List list, String valor, Boolean success) {
        this.mensaje = mensaje;
        this.list = list;
        this.valor = valor;
        this.success = success;
    }

    public Response(Mensaje mensaje, List list, String valor, Boolean success, Integer campo) {
        this.mensaje = mensaje;
        this.list = list;
        this.valor = valor;
        this.success = success;
        this.campo = campo;
    }

//    public cat_usuarios getUsuario() {
//        return usuario;
//    }
//
//    public void setUsuario(cat_usuarios usuario) {
//        this.usuario = usuario;
//    }

    public Response(Integer status) {
        this.status = status;
    }

    /**
     * @return the mensaje
     */
    public Object getDatos() {
        return datos;
    }

    public void setDatos(Object datos) {
        this.datos = datos;
    }

    /**
     * @return the mensaje
     */
    public Mensaje getMensaje() {
        return mensaje;
    }

    /**
     * @param mensaje the mensaje to set
     */
    public void setMensaje(Mensaje mensaje) {
        this.mensaje = mensaje;
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
     * @return the valor
     */
    public String getValor() {
        return valor;
    }

    /**
     * @param valor the valor to set
     */
    public void setValor(String valor) {
        this.valor = valor;
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

    public Integer getCampo() {
        return campo;
    }

    public void setCampo(Integer campo) {
        this.campo = campo;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    

}
