package com.seoul_competition.senior_jobtraining.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000", "http://localhost:8000", "http://localhost:8888",
            "http://localhost:80", "http://localhost:443")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
        .allowCredentials(true);
  }

  @Bean
  public WebClient webClient() {
    return WebClient.create();
  }
}
