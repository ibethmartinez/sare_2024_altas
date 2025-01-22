/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author FABIOLA.RUIZ
 */
@Component
@Configuration
public class LogInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
                    throws Exception {
        HttpSession session = request.getSession();
        String requestURI = request.getRequestURI();
        Object variableSesion = session.getAttribute("Sare_suc2023");
//        if (requestURI.equals("/Sare_suc2023/")) {
//            return true;
//        } else {
//            if (session != null && variableSesion != null) {
//                return true;
//            } else {
//              response.setContentType("text/html");
//                PrintWriter printWriter  = response.getWriter();
//                printWriter.println("<h1>No se encontro sesion activa</h1>");
//                return false;
//            }
//        }
return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
                    throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
                    throws Exception {
    }

}
