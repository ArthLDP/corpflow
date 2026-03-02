package com.kanban.corpflow.repositories;

import com.kanban.corpflow.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {}
