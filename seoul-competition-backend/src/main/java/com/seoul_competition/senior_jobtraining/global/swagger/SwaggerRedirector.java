package com.seoul_competition.senior_jobtraining.global.swagger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/docs")
public class SwaggerRedirector {

  @GetMapping
  public String api() {
    return "redirect:/swagger-ui/index.html";
  }
}
