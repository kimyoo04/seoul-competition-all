package com.seoul_competition.senior_jobtraining.global.util.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public final class JwtUtil {


  private JwtUtil() {
  }

  public static Claims getClaims(String jwt, String secret_key) {
    Claims claims;
    claims = Jwts.parser()
        .setSigningKey(secret_key.getBytes())
        .parseClaimsJws(jwt)
        .getBody();
    return claims;
  }

  public static boolean verifyJwt(String jwt, String secretKey) {
    try {
      Jwts.parser()
          .setSigningKey(secretKey.getBytes())
          .parseClaimsJws(jwt);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public static boolean hasCookie(String jwt) {
    return jwt != null;
  }
}