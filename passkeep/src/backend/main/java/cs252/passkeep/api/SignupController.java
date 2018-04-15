package cs252.passkeep.api;
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

import java.util.*;

@Service
public class SignupController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public Map<String, Object> signUp(@RequestBody Map<String, Object> body){
        Map<String, Object> response = new HashMap<String,Object>();

        try{
            String new_id = UUID.randomUUID().toString();
            String email = body.get("email").toString();
            String password = body.get("password").toString();

            List<Map<String, Object>> existingEmails = jdbcTemplate.queryForList("SELECT * FROM users WHERE email='" + email + "'");
            if (existingEmails.size() != 0) {
                throw new RuntimeException("[BadRequest] - User with this email already exists!");
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(password);

            //Insert a new user into database;
            jdbcTemplate.update("INSERT INTO users (user_id, password, email) VALUES (?, ?, ?)",
                    new_id, hashedPassword, email);
            response.put("status", HttpStatus.OK);
            return response;

        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");

        }



    }

}
