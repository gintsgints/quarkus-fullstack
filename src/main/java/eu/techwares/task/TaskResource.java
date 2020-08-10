package eu.techwares.task;

import org.eclipse.microprofile.openapi.annotations.Operation;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/api/task")
@ApplicationScoped
public class TaskResource {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Gets list of tasks filtered by name")
	public List<Task> listTasks(@QueryParam("name") String name) {
		return Task.findTasks(name);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Creates task")
	@Transactional
	public Response createTask(Task task) {
		Task.createTask(task);
		return Response.ok(task).status(201).build();
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Updates task")
	@Transactional
	public Response updateTask(@PathParam("id") Long id, Task task) {
		return Response.ok(Task.updateTask(id, task)).status(200).build();
	}

}
