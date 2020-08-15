package eu.techwares;

import eu.techwares.task.Task;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.transaction.Transactional;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.core.IsNot.not;

@QuarkusTest
public class TaskResourceTest {
	Jsonb jsonb = JsonbBuilder.create();

	@Inject
	EntityManager em;

	@AfterEach
	@Transactional
	public void afterEach() {
		Query deleteProduced = em.createQuery("delete from Task where id > 2 ");
		deleteProduced.executeUpdate();
	}

	@Test
	public void testGetTasksEndpoint() {
		given()
				.when().get("/api/task")
				.then()
				.statusCode(200)
				.body(
						containsString("Read the book"),
						containsString("Make a dinner")
				);
	}

	@Test
	public void testPostTaskEndpoint() {
		Task task = new Task();
		task.done = false;
		task.name = "Third task";

		given()
				.when()
				.contentType("application/json")
				.body(jsonb.toJson(task))
				.post("/api/task")
				.then()
				.statusCode(201)
				.body(
						containsString("Third task")
				);
		// Now should have three tasks
		given()
				.when().get("/api/task")
				.then()
				.statusCode(200)
				.body(
						containsString("Read the book"),
						containsString("Make a dinner"),
						containsString("Third task")
				);
	}

	@Test
	public void testPostInvalidTask() {
		Task task = new Task();
		task.done = false;
		task.name = "";

		given()
				.when()
				.contentType("application/json")
				.body(jsonb.toJson(task))
				.post("/api/task")
				.then()
				.statusCode(400)
				.body(
						containsString("Title may not be blank")
				);
	}

	@Test
	public void testUpdateTaskEndpoint() {
		Task task = Task.findById(1L);
		task.name = "Read the paper";
		given()
				.when()
				.contentType("application/json")
				.body(jsonb.toJson(task))
				.put("/api/task/1")
				.then()
				.statusCode(200)
				.body(
						containsString("Read the paper")
				);
		given()
				.when().get("/api/task")
				.then()
				.statusCode(200)
				.body(
						not(containsString("Read the book")),
						containsString("Read the paper"),
						containsString("Make a dinner")
				);
	}

	@Test
	public void testDeteTask() {
		given()
				.when().get("/api/task/clear")
				.then()
				.statusCode(204);

		given()
				.when().get("/api/task")
				.then()
				.statusCode(200)
				.body(
						not(containsString("Read the book")),
						containsString("Make a dinner")
				);
	}
}
