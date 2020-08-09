package eu.techwares.task;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Task extends PanacheEntity {
	public String name;
	public LocalDate due;
	public Boolean done;

	public static List<Task> findTasks(String name) {
		if (name == null) {
			return findAll().list();
		}
		else {
			return find("name like ?1", "%" + name + "%").list();
		}
	}

	public static void createTask(Task task) {
		task.persist();
	}

	public static void clearDone() {
		delete("done", true);
	}
}
