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
import org.springframework.web.bind.annotation.RequestParam;


import java.security.SecureRandom;
import java.sql.Timestamp;
import java.util.*;

@Service
public class FeaturesController extends ValidationUtility {


    @Autowired
    private JdbcTemplate jdbcTemplate;
    static SecureRandom rnd = new SecureRandom();
    static final String defaultCharacterRange = "01234567890BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@-_!?#%\")(+";
    static final String noSpecialCharacterRange = "01234567890BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public String generateRandomString(int len, String type) {
        String universe = defaultCharacterRange;
        if (type.equals("nospec")) {
            universe = noSpecialCharacterRange;
        }
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(universe.charAt(rnd.nextInt(universe.length())));
        }
        return sb.toString();
    }


    public Map<String, Object> generateRandom(@RequestParam String userId, @RequestParam String token, @RequestParam int len, @RequestParam String query) {
        String id = userId;

        Map<String, Object> response = new HashMap<String, Object>();
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            response.put("userId", userId);
            response.put("token", token);
            try {
                String gen = "";
                if (query.equals("default")) {
                    gen = generateRandomString(len, query);
                } else if (query.equals("nospec")) {
                    gen = generateRandomString(len, "nospec");
                } else {
                    throw new RuntimeException("Unrecognized parameter for query!");
                }
                response.put("generated", gen);
            } catch (DataAccessException ex) {


                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }

        }
        response.put("status", HttpStatus.OK);
        return response;
    }

    public Map<String, Object> bugReport(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        String userId = body.get("userId").toString();
        String token = body.get("token").toString();
        String report = body.get("report").toString();
        if (report == null){
            throw new RuntimeException("Cannot send an empty report.");
        }
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            response.put("userId", userId);
            response.put("token", token);
            List<Map<String, Object>> repCount = jdbcTemplate.queryForList("SELECT * FROM bugs WHERE user_id='" + userId + "'");
            if (repCount.size() >= 6) {
                throw new RuntimeException("You have made too many reports (thank you), please wait until some are resolved.");
            }
            Date d = new Date();
            Timestamp repDate = new Timestamp(d.getTime());
            jdbcTemplate.update("INSERT INTO bugs (user_id, report, date) VALUES (?, ?, ?)",
                    userId, report, repDate);


            try {
            } catch (DataAccessException ex) {


                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
        }
        response.put("status",HttpStatus.OK);
        return response;
    }
}

    public Map<String, Object> generateRandom(@RequestParam String userId, @RequestParam String token, @RequestParam int len, @RequestParam String query) {
        String id = userId;

        Map<String, Object> response = new HashMap<String, Object>();
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            response.put("userId", userId);
            response.put("token", token);
            try {
                String gen = "";
                if (query.equals("default")) {
                    gen = generateRandomString(len, query);
                } else if (query.equals("nospec")) {
                    gen = generateRandomString(len, "nospec");
                } else {
                    throw new RuntimeException("Unrecognized parameter for query!");
                }
                response.put("generated", gen);
            } catch (DataAccessException ex) {

                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }

        }
        response.put("status", HttpStatus.OK);
        return response;
    }

    public Map<String, Object> bugReport(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        String userId = body.get("userId").toString();
        String token = body.get("token").toString();
        String report = body.get("report").toString();
        if (report == null){
            throw new RuntimeException("Cannot send an empty report.");
        }
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            response.put("userId", userId);
            response.put("token", token);
            List<Map<String, Object>> repCount = jdbcTemplate.queryForList("SELECT * FROM bugs WHERE user_id='" + userId + "'");
            if (repCount.size() >= 6) {
                throw new RuntimeException("You have made too many reports (thank you), please wait until some are resolved.");
            }
            Date d = new Date();
            Timestamp repDate = new Timestamp(d.getTime());
            jdbcTemplate.update("INSERT INTO bugs (user_id, report, date) VALUES (?, ?, ?)",
                    userId, report, repDate);


            try {
            } catch (DataAccessException ex) {

                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
        }
        response.put("status",HttpStatus.OK);
        return response;
    }
}
