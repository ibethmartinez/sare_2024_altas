/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_web.config;

import mx.org.inegi.sare_2024_altas_web.controller.LogInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 *
 * @author LIDIA.VAZQUEZ
 */
@Configuration
@EnableWebMvc 
@ComponentScan({"mx.org.inegi.sare_2024_altas_web.controller","mx.org.inegi.sare_2024_altas_services","mx.org.inegi.sare_2024_altas_db"})
@PropertySource(value = "classpath:/web.properties")
public class WebConfig extends WebMvcConfigurerAdapter {
    
    @Autowired
    public Environment env;

    @Bean
    public InternalResourceViewResolver setupViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix(env.getProperty("web.prefix"));
        resolver.setSuffix(env.getProperty("web.suffix"));
        return resolver;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations(env.getProperty("web.resources"));
    }
     @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor());
    }
}
