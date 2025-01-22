/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_web.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

/**
 *
 * @author IBETH.MARTINEZ
 */

public class WebInitializer implements WebApplicationInitializer {

    Const var = new Const();
    public Const esq;
    String param = var.esquema + ",jdbc,sare_2024_altas_web";

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        //Se crea un contexto con las configuraciones de spring
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        //Se agrega el Profile activo 
        //rootContext.getEnvironment().setActiveProfiles("sqlite");

        //Tambien se pueden agregar dos active profiles
        //servletContext.setInitParameter("spring.profiles.active", "dev,jdbc,seguimiento");
        //servletContext.setInitParameter("spring.profiles.active", "prod,jdbc,seguimiento");//
        servletContext.setInitParameter("spring.profiles.active", param);

        //se agrega archivo de configuracion
        //rootContext.register(RootServiceConfig.class); FALTA EXPLICART HASTA QUE HAYA BD
        //Se agrega el contexto de spring al ciclo general de la ejecucion de los servlets
        servletContext.addListener(new ContextLoaderListener(rootContext));
        //Se crea un contexto spring mvc con las configuraciones         
        AnnotationConfigWebApplicationContext webContext = new AnnotationConfigWebApplicationContext();
        webContext.register(WebConfig.class);
        // Se agrega el servlet general al contexto de spring mvc
        webContext.setServletContext(servletContext);
        //Se agrega el contexto de spring mvc para que sea el despachador principal del proyecto
        ServletRegistration.Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(webContext));
        servlet.addMapping("/");
        servlet.setLoadOnStartup(1);
    }

}
