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

    public List<UserResponseDTO> findAll() {
        List<User> allUsers = userRepository.findAll();

        return allUsers.stream().map(UserResponseDTO::new).toList();
    }

    public UserResponseDTO findById(Long id) {
        User userFound = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id: " + id + " not found"));

        return new UserResponseDTO(userFound);
    }

    public UserResponseDTO findByEmail(String email) {
        User userFound = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email: " + email + " not found"));

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
