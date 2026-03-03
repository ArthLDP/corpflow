package com.kanban.corpflow.services;

import com.kanban.corpflow.entities.Task;
import com.kanban.corpflow.entities.User;
import com.kanban.corpflow.entities.dtos.TaskRequestDTO;
import com.kanban.corpflow.entities.dtos.TaskResponseDTO;
import com.kanban.corpflow.repositories.TaskRepository;
import com.kanban.corpflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public TaskResponseDTO create(TaskRequestDTO taskRequestDTO) {
        User taskUser = userRepository.findById(taskRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User with id: " + taskRequestDTO.getUserId() + " not found"));

        Task task = new Task();
        task.setTitle(taskRequestDTO.getTitle());
        task.setDescription(taskRequestDTO.getDescription());
        task.setStatus(taskRequestDTO.getStatus());
        task.setDeadLine(taskRequestDTO.getDeadLine());
        task.setCreatedAt(LocalDateTime.now());
        task.setUser(taskUser);
        Task createdTask = taskRepository.save(task);

        return new TaskResponseDTO(createdTask);
    }

    public List<TaskResponseDTO> findAll() {
        List<Task> allTasks = taskRepository.findAll();

        return allTasks.stream().map(TaskResponseDTO::new).toList();
    }

    public TaskResponseDTO findById(Long id) {
        Task taskFound = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with id: " + id + " not found"));

        return new TaskResponseDTO(taskFound);
    }

    public TaskResponseDTO update(Long id, TaskRequestDTO taskRequestDTO) {
        Task entity = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with id: " + id + " not found"));

        User taskUser = userRepository.findById(taskRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User with id: " + taskRequestDTO.getUserId() + " not found"));

        entity.setTitle(taskRequestDTO.getTitle());
        entity.setDescription(taskRequestDTO.getDescription());
        entity.setStatus(taskRequestDTO.getStatus());
        entity.setDeadLine(taskRequestDTO.getDeadLine());
        entity.setUser(taskUser);
        Task updatedTask = taskRepository.save(entity);

        return new TaskResponseDTO(updatedTask);
    }

    public void delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with id: " + id + " not found"));

        taskRepository.delete(task);
    }
}
