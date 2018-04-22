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
import java.util.*;

@Service
public class FeaturesController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);
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
                if(query.equals("default")){
                    gen = generateRandomString(len, query);
                } else if (query.equals("nospec")){
                    gen = generateRandomString(len, "nospec");
                } else {
                    throw new RuntimeException("[BadRequest] - Unrecognized parameter for query!");
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
}
