
package mx.org.inegi.sare_2024_altas_services.config;

import mx.org.inegi.sare_2024_altas_db.config.DBRootConfig;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan({"mx.org.inegi"})
@Import({DBRootConfig.class, ServiceConfig.class})
@PropertySource(value = "classpath:/services.properties")
public class RootServiceConfig {

}
