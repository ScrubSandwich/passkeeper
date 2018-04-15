package cs252.passkeep;

import cs252.passkeep.api.LoginController;
import cs252.passkeep.api.SignupController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


@RestController
@SpringBootApplication
public class PasskeepApplication {

	@Autowired
	private SignupController signupController;

	@Autowired
    private LoginController loginController;


	@CrossOrigin
	@RequestMapping(value = "/sign-up", method = RequestMethod.POST)
	@ResponseBody
	//TODO implement meaningful exception handling for badly formatted requests
	public Map<String, Object> signUp(@Valid @RequestBody Map<String, Object> body) {
		return signupController.signUp(body);
	}

    @CrossOrigin
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> login(@Valid @RequestBody Map<String, String> body) {
        return loginController.login(body);

    }

	public static void main(String[] args) {
		SpringApplication.run(PasskeepApplication.class, args);
	}
}
