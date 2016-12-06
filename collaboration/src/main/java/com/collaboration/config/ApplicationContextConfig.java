package com.collaboration.config;



import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@EnableWebMvc
@Configuration
@ComponentScan(basePackages={"com.collaboration"})
@EnableTransactionManagement
public class ApplicationContextConfig {
	
	
	@Bean(name = "viewResolver")
	public InternalResourceViewResolver getViewResolver() {
	    InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
	    viewResolver.setPrefix("/WEB-INF/views/");
	    viewResolver.setSuffix(".jsp");
	    return viewResolver;
	}
	
	@Bean(name = "datasource")
	public DataSource getOracleDatasource() {
		DriverManagerDataSource datasource = new DriverManagerDataSource();
		datasource.setDriverClassName("oracle.jdbc.driver.OracleDriver");
		datasource.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
		datasource.setUsername("COLB_DB");
		datasource.setPassword("root");
		
	
	
		
		return datasource;
	}
	
	@Bean
	public SessionFactory getSessionFactory(DataSource datasource) {
		LocalSessionFactoryBuilder sessionBuilder = new LocalSessionFactoryBuilder(datasource);
		/*sessionBuilder.addProperties(getHibernateProperties());*/
	
		
		;
		sessionBuilder.addAnnotatedClass(com.collaboration.model.User.class);
		sessionBuilder.addAnnotatedClass(com.collaboration.model.Comment.class);
		sessionBuilder.addAnnotatedClass(com.collaboration.model.Blog.class);
		sessionBuilder.addAnnotatedClass(com.collaboration.model.Friendship.class);
		
		sessionBuilder.setProperty("hibernate.hbm2ddl.auto","update");
		sessionBuilder.setProperty("hibernate.show_sql","false");
		sessionBuilder.setProperty("hibernate.dialect","org.hibernate.dialect.Oracle10gDialect");
		sessionBuilder.setProperty("hibernate.format_sql","false");
		sessionBuilder.setProperty("hibernate.jdbc.use_get_generated_keys","true");
		sessionBuilder.setProperty("hibernate.enable_lazy_load_no_trans", "true");
		
		
		
		return sessionBuilder.buildSessionFactory();
	}

	@Autowired
	@Bean(name = "transactionManager")
	public HibernateTransactionManager getTransctionManager(SessionFactory sessionFactory) {
		HibernateTransactionManager transactionManager = new HibernateTransactionManager(sessionFactory);
		return transactionManager;

	}

}
