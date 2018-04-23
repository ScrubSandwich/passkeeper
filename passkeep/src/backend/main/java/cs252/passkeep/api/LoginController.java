package cs252.passkeep.api;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginController extends ValidationUtility{

    static final long EXPIRATIONTIME = 3_600_000; //
    static final String SECRET = "HardyGustavoMontoyaG";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            String email = body.get("email");
            String password = body.get("password");
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            //Check if email exists
            Integer existingEmail = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE email='" + email + "'", Integer.class);
            if (existingEmail <= 0) {
                throw new RuntimeException("No user associated with this email address!");
            }

            //Check if password matches
            String dbPassword = jdbcTemplate.queryForObject("SELECT password FROM users WHERE email='" + email + "'", String.class);
            if (!passwordEncoder.matches(password, dbPassword)) {
                throw new RuntimeException("Incorrect password provided!");
            }

            String user_id = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email='" + email + "'", String.class);

            //Otherwise generate new JWT access token
            String JWT = Jwts.builder()
                    .setSubject(email)
                    .claim("userId", user_id)
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                    .signWith(SignatureAlgorithm.HS512, SECRET)
                    .compact();

            //Insert the token into the database
            jdbcTemplate.update("UPDATE users SET token='" + JWT + "'" + " WHERE email ='" + email + "'");

            response.put("userId", user_id);
            response.put("token", JWT);
            response.put("email", email);
            response.put("status",HttpStatus.OK);
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
        return response;
    }

    public Map<String, Object> logout(@RequestBody Map<String,Object> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            String userId = body.get("userId").toString();
            String token = body.get("token").toString();
            if (!isValidToken(token, userId) || isExpiredToken(token)) {
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
                return response;
            } else {
                jdbcTemplate.update("UPDATE users SET token = NULL WHERE user_id='" + userId + "'");
                response.put("status", HttpStatus.OK);
            }
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
        response.put("status",HttpStatus.OK);
        return response;
    }



}
