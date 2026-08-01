package com.auth.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "your-secret-key";
    private final long EXPIRATION_TIME = 86400000;

    public String generateToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .withIssuer("auth-api")
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    @SuppressWarnings("UseSpecificCatch")
    public String validateTokenAndGetUsername(String token) {
        try {
            DecodedJWT jwt = JWT.require(Algorithm.HMAC256(SECRET_KEY))
                .withIssuer("auth-api")
                .build()
                .verify(token);
            return jwt.getSubject();
        } catch(Exception e) {
            return null;
        }
    }

}