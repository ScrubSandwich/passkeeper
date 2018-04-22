package cs252.passkeep;

import cs252.passkeep.api.ContentController;
import cs252.passkeep.api.FeaturesController;
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

	@Autowired
	private ContentController contentController;

	@Autowired
	private FeaturesController featuresController;


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
	@CrossOrigin
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> logout(@Valid @RequestBody Map<String, Object> body) {
		return loginController.logout(body);

	}

	@CrossOrigin
	@RequestMapping(value = "/record/add", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> addRecord(@Valid @RequestBody Map<String, Object> body) {
		return contentController.addRecord(body);

	}

	@CrossOrigin
	@RequestMapping(value = "/record/get", params = {"id"}, method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getProfile(@RequestParam String id,@RequestParam String token, @RequestParam String query){
		return contentController.getRecord(id,token,query);
	}

	@CrossOrigin
	@RequestMapping(value = "/record/list", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getList(@Valid @RequestBody Map<String, Object> body) {
		return contentController.getList(body);

	}

	@CrossOrigin
	@RequestMapping(value = "/generate", params = {"id"}, method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> generateRandom(@RequestParam String id,@RequestParam String token,@RequestParam int len, @RequestParam String query){
		return featuresController.generateRandom(id,token,len,query);
	}
	public static void main(String[] args) {
		SpringApplication.run(PasskeepApplication.class, args);
	}
}
