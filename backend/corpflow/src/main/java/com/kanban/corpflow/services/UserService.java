package com.kanban.corpflow.services;

import com.kanban.corpflow.entities.User;
import com.kanban.corpflow.entities.dtos.UserRequestDTO;
import com.kanban.corpflow.entities.dtos.UserResponseDTO;
import com.kanban.corpflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserResponseDTO create(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setName(userRequestDTO.getName());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(userRequestDTO.getPassword());
        User createdUser = userRepository.save(user);

        return new UserResponseDTO(createdUser);
    }

    public List<UserResponseDTO> findAll() {
        List<User> allUsers = userRepository.findAll();

        return allUsers.stream().map(UserResponseDTO::new).toList();
    }

    public UserResponseDTO findById(Long id) {
        User userFound = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));

        return new UserResponseDTO(userFound);
    }

    public UserResponseDTO update(Long id, UserRequestDTO user) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));

        entity.setName(user.getName());
        entity.setEmail(user.getEmail());
        entity.setPassword(user.getPassword());
        User updatedUser = userRepository.save(entity);

        return new UserResponseDTO(updatedUser);
    }

    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));

        userRepository.delete(user);
    }
}
