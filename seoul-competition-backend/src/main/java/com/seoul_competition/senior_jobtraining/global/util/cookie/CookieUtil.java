package com.seoul_competition.senior_jobtraining.global.util.cookie;

import jakarta.servlet.http.Cookie;

public class CookieUtil {

  public static Cookie createExpiredCookie(String name) {
    Cookie cookie = new Cookie(name, "");
    cookie.setMaxAge(0);
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    cookie.setPath("/");
    return cookie;
  }
}
