/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mx.org.inegi.sare_2024_altas_web.servs;

/**
 *
 * @author DELIA.GALLEGOS
 */

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.OutputStream;
import java.net.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletOutputStream;

/**
 *
 * @author MIGUEL.MUNOZ
 */
@WebServlet(name = "omnivore", urlPatterns = {"/omnivore.do"})
public class omnivore extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, URISyntaxException {
        response.setContentType("text/html;charset=UTF-8");
        String reqUrl = request.getQueryString(); //OR: request.getParameter("url");
        String decoded = URLDecoder.decode(reqUrl, "UTF-8");
        reqUrl = decoded;
        String autorizacion = request.getHeader("Authorization");

        URL url = new URL(reqUrl);
        URI uri = new URI(url.getProtocol(), url.getUserInfo(), IDN.toASCII(url.getHost()), url.getPort(), url.getPath(), url.getQuery(), url.getRef());
        PrintWriter out = null;
        try{
            
            if (reqUrl.contains("http://gaia.inegi.org.mx") || reqUrl.contains("https://ca2022.inegi.org.mx") || reqUrl.contains("https://gaia.inegi.org.mx") || reqUrl.contains("://gaiamapas1.inegi.org.mx") || reqUrl.contains("://gaiamapas2.inegi.org.mx") ||  reqUrl.contains("://gaiamapas3.inegi.org.mx") || reqUrl.contains("http://10.210.100.125") || reqUrl.contains("http://10.210.100.126") ) {
            ServletOutputStream o =  response.getOutputStream();
            //out.clear(); // where out is a JspWriter
            //out = pageContext.pushBody();
            
            url= uri.toURL();
           
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setDoOutput(true);
            con.setRequestMethod(request.getMethod());
            int clength = request.getContentLength();
            if (clength > 0) {
                con.setDoInput(true);
                byte[] idata = new byte[clength];
                request.getInputStream().read(idata, 0, clength);
                con.getOutputStream().write(idata, 0, clength);
            }
            response.setContentType(con.getContentType());
            response.setDateHeader("Expires", System.currentTimeMillis() + 24 * 60 * 60 * 1000);
            //response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Origin",request.getServerName() + ":" + request.getServerPort());
            response.setHeader("X-Powered-By", "~xpain~");

            InputStream is = con.getInputStream();
            byte[] buf = new byte[32 * 1024]; // 32k buffer
            int nRead = 0;
            while ((nRead = is.read(buf)) != -1) {
               
                o.write(buf, 0, nRead);
            }
            o.flush();
            o.close();// *important* to ensure no more jsp output
            return;

          
        } else {
                out = response.getWriter();
             url = null;
            out.println("{'url':'invalida'}"+ autorizacion);
            }
            
        }catch(Exception e){
            out = response.getWriter();
            out.println("{'url':'invalida'}");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (URISyntaxException ex) {
            Logger.getLogger(omnivore.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (URISyntaxException ex) {
            Logger.getLogger(omnivore.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
