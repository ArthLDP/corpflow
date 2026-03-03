package com.kanban.corpflow.entities.dtos;
import com.kanban.corpflow.entities.User;

import java.util.List;

public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private List<TaskResponseDTO> tasks;

    public UserResponseDTO(){}

    public UserResponseDTO(User user) {
        id = user.getId();
        name = user.getName();
        email = user.getEmail();
        tasks = user.getTasks().stream().map(TaskResponseDTO::new).toList();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<TaskResponseDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskResponseDTO> tasks) {
        this.tasks = tasks;
    }
}
