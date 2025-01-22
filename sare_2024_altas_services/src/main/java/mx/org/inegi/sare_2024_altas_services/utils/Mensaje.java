
package mx.org.inegi.sare_2024_altas_services.utils;


public class Mensaje {
    
     private String type;
    private String messages;

    public Mensaje() {
    }

    public Mensaje(String type, String messages) {
        this.type = type;
        this.messages = messages;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessages() {
        return messages;
    }

    public void setMessages(String messages) {
        this.messages = messages;
    }

   
    
    
}
