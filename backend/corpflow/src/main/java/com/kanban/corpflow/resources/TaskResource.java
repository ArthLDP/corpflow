package com.kanban.corpflow.resources;

import com.kanban.corpflow.entities.dtos.TaskRequestDTO;
import com.kanban.corpflow.entities.dtos.TaskResponseDTO;
import com.kanban.corpflow.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/tasks")
public class TaskResource {
    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@RequestBody TaskRequestDTO taskRequestDTO) {
        TaskResponseDTO createdTaskResponseDTO = taskService.create(taskRequestDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(createdTaskResponseDTO.getId()).toUri();

        return ResponseEntity.created(uri).body(createdTaskResponseDTO);
    }

    @GetMapping()
    public ResponseEntity<List<TaskResponseDTO>> findAll() {
        return ResponseEntity.ok().body(taskService.findAll());
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<TaskResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(taskService.findById(id));
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<TaskResponseDTO> update(@PathVariable Long id, @RequestBody TaskRequestDTO taskRequestDTO) {
        return ResponseEntity.ok().body(taskService.update(id, taskRequestDTO));
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
