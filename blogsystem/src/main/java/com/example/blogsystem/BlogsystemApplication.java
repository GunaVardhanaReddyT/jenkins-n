package com.example.blogsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BlogsystemApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(BlogsystemApplication.class, args);
	}

	// ✅ For WAR deployment (Tomcat/Servlet container)
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BlogsystemApplication.class);
	}
}
