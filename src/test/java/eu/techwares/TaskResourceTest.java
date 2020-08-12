package eu.techwares;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.containsString;

@QuarkusTest
public class TaskResourceTest {
	@Test
	public void testTasksEndpoint() {
		given()
				.when().get("/api/task")
				.then()
				.statusCode(200)
				.body(
          containsString("Read the book"),
          containsString("Make a dinner")
        );
	}

}
