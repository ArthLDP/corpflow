package com.kanban.corpflow.entities.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kanban.corpflow.entities.enums.TaskStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public class TaskRequestDTO {
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime deadLine;
    private Long userId;

    public TaskRequestDTO(){}

    public TaskRequestDTO(String title, String description, TaskStatus status, LocalDateTime deadLine, Long userId) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.deadLine = deadLine;
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getDeadLine() {
        return deadLine;
    }

    public void setDeadLine(LocalDateTime deadLine) {
        this.deadLine = deadLine;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
