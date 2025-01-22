/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_web.config;

import java.io.IOException;
import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author LIDIA.VAZQUEZ
 */
@WebFilter(filterName = "CORS",urlPatterns = "*",dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.FORWARD})
public class CORS implements Filter{
    
    private static final String CONTENT_TYPE = "application/json; charset=UTF-8";
    
    @Override
    public void init(FilterConfig fc) throws ServletException {
        
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse responses = (HttpServletResponse)response;
        HttpServletRequest requests = (HttpServletRequest)request;
        String clientOrigin = requests.getHeader("origin");
        responses.setHeader("Access-Control-Allow-Origin", "*");
        responses.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE,PUT");
        responses.setHeader("Access-Control-Allow-Credentials", "true");
        responses.setHeader("Access-Control-Max-Age", "3600");
        responses.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        responses.setContentType(CONTENT_TYPE);
        filterChain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        
    }
    
}
