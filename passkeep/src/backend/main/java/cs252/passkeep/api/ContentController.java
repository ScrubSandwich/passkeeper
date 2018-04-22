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
import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;


import java.util.*;
@Service
public class ContentController extends ValidationUtility implements Serializable {

    private static final Logger log = LoggerFactory.getLogger(Application.class);
    //TODO code documentation

    private static final String KEY_1 = "ssdkF$HUy2AC5ftB";
    private static final String KEY_2 = "weJiSEvR5yA#D%kd";
    private IvParameterSpec ivParameterSpec;
    private SecretKeySpec secretKeySpec;
    private Cipher cipher;

    public ContentController() throws UnsupportedEncodingException, NoSuchPaddingException, NoSuchAlgorithmException {
        ivParameterSpec = new IvParameterSpec(KEY_1.getBytes("UTF-8"));
        secretKeySpec = new SecretKeySpec(KEY_2.getBytes("UTF-8"), "AES");
        cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
    }

    public String encrypt(String toBeEncrypt) throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
        byte[] encrypted = cipher.doFinal(toBeEncrypt.getBytes());
        return Base64.encodeBase64String(encrypted);
    }

    public String decrypt(String encrypted) throws InvalidAlgorithmParameterException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException {

        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);
        byte[] decryptedBytes = cipher.doFinal(Base64.decodeBase64(encrypted));
        return new String(decryptedBytes);

    }


    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> addRecord(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        String recordId;
        String userId = body.get("userId").toString();
        String token = body.get("token").toString();
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {

            try {
                String email = body.get("email").toString();
                String password = body.get("password").toString();
                String title = body.get("title").toString();
                String newRecordId = UUID.randomUUID().toString();
                recordId = newRecordId;
                try {
                    password = encrypt(password);
                } catch (Exception e) {
                    throw new RuntimeException("[InternalServerError] - FATAL ERROR 1.");
                }

                jdbcTemplate.update("INSERT INTO storage (user_id, record_id, title, password, email) VALUES (?, ?, ?, ?, ?)", userId, newRecordId, title, password, email);
                if (body.containsKey("username")) {
                    String username = body.get("username").toString();
                    jdbcTemplate.update("UPDATE storage SET username='" + username + "' WHERE record_id='" + newRecordId + "'");

                }
                if (body.containsKey("notes")) {
                    String notes = body.get("notes").toString();
                    jdbcTemplate.update("UPDATE storage SET notes='" + notes + "' WHERE record_id='" + newRecordId + "'");

                }
//

                //


            } catch (DataAccessException ex) {
                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
            response.put("status", HttpStatus.OK);
            response.put("userId", userId);
            response.put("token", token);
            response.put("recordId", recordId);
            return response;
        }

    }

    public Map<String, Object> getRecord(@RequestParam String userId, @RequestParam String token, @RequestParam String query) {
        String id = userId;
        String recordId = query;
        Map<String, Object> response = new HashMap<String, Object>();
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {
                response.put("userId", userId);
                response.put("token", token);
                response.put("recordId", query);
                Integer existingRecord = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM storage WHERE record_id='" + recordId + "'", Integer.class);
                if (existingRecord <= 0) {
                    throw new RuntimeException("[BadRequest] - No record existing for this id!");
                }

                List<Map<String, Object>> record = jdbcTemplate.queryForList("SELECT storage.user_id, record_id, title, password, email, username, birthdate, notes FROM storage WHERE record_id = '" + recordId + "'");
                String title = record.get(0).get("title").toString();
                String password = record.get(0).get("password").toString();
                try {
                    password = decrypt(password);
                } catch (Exception e) {
                    throw new RuntimeException("[InternalServerError] - FATAL ERROR 2.");
                }
                String email = record.get(0).get("email").toString();
                String username = null, birthdate = null, notes = null;
                if (record.get(0).get("username") != null) {
                    username = record.get(0).get("username").toString();
                }
                if (record.get(0).get("birthdate") != null) {
                    birthdate = record.get(0).get("birthdate").toString();
                }
                if (record.get(0).get("notes") != null) {
                    notes = record.get(0).get("notes").toString();
                }
                response.put("title", title);
                response.put("password", password);
                response.put("email", email);
                if (username != null) {
                    response.put("username", username);
                }
                if (birthdate != null) {
                    response.put("birthdate", birthdate);
                }
                if (notes != null) {
                    response.put("notes", notes);
                }
            } catch (DataAccessException ex) {

                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
            return response;
        }

    }

    public Map<String, Object> getList(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        String userId = body.get("userId").toString();
        String token = body.get("token").toString();
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            response.put("userID", userId);
            response.put("token", token);
            try {
                Integer listSize = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM storage WHERE user_id='" + userId + "'", Integer.class);
                if (listSize == 0) {
                    response.put("list", "You have not added any entries yet.");
                    return response;
                }
                List<Map<String, Object>> list = jdbcTemplate.queryForList("SELECT record_id FROM storage WHERE user_id = '" + userId + "'");
                response.put("list", list);
                return response;


            } catch (DataAccessException ex) {

                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }

        }
    }
}
