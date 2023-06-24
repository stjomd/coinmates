package at.stjomd.coinmatesserver.service.jwt;

import at.stjomd.coinmatesserver.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtServiceImpl implements JwtService {

    private final Key signingKey = Keys.hmacShaKeyFor(
        Decoders.BASE64.decode("f44c4813174c460fcd5fb96898a21abd507eea42789d98628846e26b4bbcd959")
    );
    private final JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(signingKey).build();

    private final long expiration = 3600000; // 1 hour

    @Override
    public String constructToken(Map<String, Object> claims, User user) {
        Map<String, Object> finalClaims = (claims != null) ? claims : new HashMap<>();
        long time = System.currentTimeMillis();
        return Jwts.builder()
            .addClaims(finalClaims)
            .setSubject(user.getEmail())
            .setIssuedAt(new Date(time))
            .setExpiration(new Date(time + expiration))
            .signWith(signingKey, SignatureAlgorithm.HS256)
            .compact();
    }

    @Override
    public String getUsername(String jwt) {
        return getClaims(jwt).getSubject();
    }

    @Override
    public boolean isValid(String jwt, User user) {
        boolean userMatches = getUsername(jwt).equals(user.getEmail());
        boolean expired = getClaims(jwt).getExpiration().after(new Date());
        return userMatches && !expired;
    }

    private Claims getClaims(String jwt) {
        return jwtParser.parseClaimsJws(jwt).getBody();
    }

}
