/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_db.config;

import javax.sql.DataSource;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author IBETH.MARTINEZ
 */
@Configuration
public class DBConfig {

    @Autowired
    public Environment env;

    @Bean(name = "dataSource")
    @Profile("dev")
    public DataSource dataSourceDev() {
        BasicDataSource dS = new BasicDataSource();
        dS.setDriverClassName(env.getProperty("db.test.driver"));
        dS.setUrl(env.getProperty("db.test.url"));
        dS.setUsername(env.getProperty("db.test.user"));
        dS.setPassword(env.getProperty("db.test.password"));
        dS.setMaxActive(50);
        dS.setMaxIdle(8);
        dS.setMinIdle(3);
        dS.setTestWhileIdle(true);
        dS.setValidationQuery("select version()");
        dS.setRemoveAbandonedTimeout(15);
        dS.setRemoveAbandoned(true);
        dS.setTimeBetweenEvictionRunsMillis(10000L);
        dS.setLogAbandoned(false);
        dS.setDefaultReadOnly(false);
        return dS;

    }

    @Bean(name = "jdbcTemplate")
    @Profile("dev")
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSourceDev());
    }

    @Bean(name = "dataSource")
    @Profile("prod")
    public DataSource dataSourceProd() {
        BasicDataSource dS = new BasicDataSource();
        dS.setDriverClassName(env.getProperty("db.prod.driver"));
        dS.setUrl(env.getProperty("db.prod.url"));
        dS.setUsername(env.getProperty("db.prod.user"));
        dS.setPassword(env.getProperty("db.prod.password"));
        dS.setMaxActive(50);
        dS.setMaxIdle(15);
        dS.setMinIdle(8);
        dS.setTestWhileIdle(true);
        dS.setValidationQuery("select version()");
        dS.setRemoveAbandonedTimeout(15);
        dS.setRemoveAbandoned(true);
        dS.setTimeBetweenEvictionRunsMillis(30000);
        dS.setLogAbandoned(false);
        dS.setDefaultReadOnly(false);
        return dS;
    }

    @Bean(name = "jdbcTemplate")
    @Profile("prod")
    public JdbcTemplate jdbcTemplateProd() {
        return new JdbcTemplate(dataSourceProd());
    }

    @Bean(name = "schemaSarePG")
    @Profile({"prod", "sarePGProd"})
    public String getSchemasarePGProd() {
        return env.getProperty("db.prod.schema");
    }

    @Bean(name = "schemaSarePG")
    @Profile({"dev", "sarePGProd"})
    public String getSchemasarePGDev() {
        return env.getProperty("db.test.schema");
    }
    
    @Bean(name = "schemaRenemPG")
    @Profile({"prod", "SareRenemPG"})
    public String getSareRenemPGProd() {
        return env.getProperty("db.prod.schema.renem");
    }

    @Bean(name = "schemaRenemPG")
    @Profile({"dev", "SareRenemPG"})
    public String getSareRenemPGDev() {
        return env.getProperty("db.test.schema.renem");
    }
    
    @Bean(name = "schemaCarto2022")
    @Profile({"prod", "carto2022"})
    public String getCarto2022Prod() {
        return env.getProperty("db.prod.schema.gpcarto");
    }

    @Bean(name = "schemaCarto2022")
    @Profile({"dev", "carto2022"})
    public String getCarto2022Dev() {
        return env.getProperty("db.test.schema.gpcarto");
    }

}
