package eu.techwares.task;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.Entity;
import javax.ws.rs.WebApplicationException;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
public class Task extends PanacheEntity {
	public String name;
	@JsonbDateFormat(value = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
	public ZonedDateTime due;
	public Boolean done;

	public static List<Task> findTasks(String name) {
		if (name == null) {
			return findAll().list();
		}
		else {
			return find("name like ?1", "%" + name + "%").list();
		}
	}

	public static Task updateTask(Long id, Task task) {
		Task entity = Task.findById(id);

		if (entity == null) {
			throw new WebApplicationException("Task with id of " + task.id + " does not exist.", 404);
		}

		entity.name = task.name;
		entity.done = task.done;
		entity.persist();

		return entity;
	}

	public static void createTask(Task task) {
		task.persist();
	}

	public static void clearDone() {
		delete("done", true);
	}
}
